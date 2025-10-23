---
title: "Building Real-Time Performance Dashboards with Angular and .NET"
description: "Learn how to create high-performance real-time dashboards using Angular frontend and .NET Web API with Redis caching."
date: "2024-01-01"
tags: ["angular", "dotnet", "redis", "real-time", "performance", "dashboard"]
pinned: false
author: "Cheng"
---

# Building Real-Time Performance Dashboards with Angular and .NET

In today's fast-paced business environment, real-time performance dashboards are crucial for making informed decisions. In this post, I'll walk you through building a high-performance dashboard using Angular, .NET Web API, and Redis for caching.

## Architecture Overview

Our dashboard will consist of:
- **Frontend**: Angular application with real-time data updates
- **Backend**: .NET Web API with SignalR for real-time communication
- **Caching**: Redis for high-performance data storage
- **Database**: SQL Server for persistent data storage

## Backend Implementation (.NET Web API)

### 1. Setting up SignalR

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR();
    services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = "localhost:6379";
    });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseRouting();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapHub<PerformanceHub>("/performanceHub");
        endpoints.MapControllers();
    });
}
```

### 2. Performance Hub

```csharp
public class PerformanceHub : Hub
{
    private readonly IPerformanceService _performanceService;
    private readonly IMemoryCache _cache;

    public PerformanceHub(IPerformanceService performanceService, IMemoryCache cache)
    {
        _performanceService = performanceService;
        _cache = cache;
    }

    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task LeaveGroup(string groupName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }
}
```

### 3. Performance Service with Redis Caching

```csharp
public class PerformanceService : IPerformanceService
{
    private readonly IDistributedCache _cache;
    private readonly IHubContext<PerformanceHub> _hubContext;
    private readonly ILogger<PerformanceService> _logger;

    public async Task<PerformanceMetrics> GetPerformanceMetricsAsync(string agentId)
    {
        var cacheKey = $"performance:{agentId}";
        var cachedData = await _cache.GetStringAsync(cacheKey);

        if (!string.IsNullOrEmpty(cachedData))
        {
            return JsonSerializer.Deserialize<PerformanceMetrics>(cachedData);
        }

        var metrics = await CalculatePerformanceMetrics(agentId);
        await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(metrics), 
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            });

        return metrics;
    }

    public async Task UpdatePerformanceMetricsAsync(string agentId)
    {
        var metrics = await GetPerformanceMetricsAsync(agentId);
        await _hubContext.Clients.Group($"agent_{agentId}").SendAsync("PerformanceUpdated", metrics);
    }
}
```

## Frontend Implementation (Angular)

### 1. SignalR Service

```typescript
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private performanceSubject = new BehaviorSubject<PerformanceMetrics>(null);

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/performanceHub')
      .build();
  }

  async startConnection(): Promise<void> {
    try {
      await this.hubConnection.start();
      console.log('SignalR connection started');
    } catch (err) {
      console.error('Error starting SignalR connection:', err);
    }
  }

  async joinAgentGroup(agentId: string): Promise<void> {
    await this.hubConnection.invoke('JoinGroup', `agent_${agentId}`);
  }

  listenToPerformanceUpdates(): Observable<PerformanceMetrics> {
    this.hubConnection.on('PerformanceUpdated', (data: PerformanceMetrics) => {
      this.performanceSubject.next(data);
    });
    return this.performanceSubject.asObservable();
  }
}
```

### 2. Performance Dashboard Component

```typescript
@Component({
  selector: 'app-performance-dashboard',
  template: `
    <div class="dashboard-container">
      <div class="metrics-grid">
        <div class="metric-card" *ngFor="let metric of metrics">
          <div class="metric-header">
            <h3>{{ metric.name }}</h3>
            <div class="metric-trend" [ngClass]="getTrendClass(metric.trend)">
              <svg class="w-4 h-4" [class]="getTrendIcon(metric.trend)">
                <path [attr.d]="getTrendPath(metric.trend)"></path>
              </svg>
              {{ metric.trend }}%
            </div>
          </div>
          <div class="metric-value">{{ metric.value }}</div>
          <div class="metric-chart">
            <canvas [id]="'chart-' + metric.id"></canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .metric-card {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .metric-card:hover {
      transform: translateY(-5px);
    }
    
    .metric-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .metric-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2d3748;
      margin-bottom: 1rem;
    }
    
    .metric-trend {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .trend-up { color: #48bb78; }
    .trend-down { color: #f56565; }
    .trend-neutral { color: #a0aec0; }
  `]
})
export class PerformanceDashboardComponent implements OnInit, OnDestroy {
  metrics: PerformanceMetric[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private signalRService: SignalRService,
    private performanceService: PerformanceService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.signalRService.startConnection();
    await this.signalRService.joinAgentGroup('current-agent');
    
    this.signalRService.listenToPerformanceUpdates()
      .pipe(takeUntil(this.destroy$))
      .subscribe(metrics => {
        this.updateMetrics(metrics);
      });

    // Load initial data
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadInitialData(): Promise<void> {
    try {
      const data = await this.performanceService.getPerformanceMetrics().toPromise();
      this.metrics = data;
    } catch (error) {
      console.error('Error loading performance data:', error);
    }
  }

  private updateMetrics(metrics: PerformanceMetrics): void {
    this.metrics = metrics.metrics;
    this.updateCharts();
  }

  getTrendClass(trend: number): string {
    if (trend > 0) return 'trend-up';
    if (trend < 0) return 'trend-down';
    return 'trend-neutral';
  }

  getTrendIcon(trend: number): string {
    if (trend > 0) return 'text-green-500';
    if (trend < 0) return 'text-red-500';
    return 'text-gray-500';
  }

  getTrendPath(trend: number): string {
    if (trend > 0) return 'M7 14l5-5 5 5';
    if (trend < 0) return 'M7 10l5 5 5-5';
    return 'M8 12h8';
  }
}
```

## Performance Optimizations

### 1. Redis Caching Strategy

```csharp
public class CacheStrategy
{
    public static DistributedCacheEntryOptions GetCacheOptions(TimeSpan expiration)
    {
        return new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = expiration,
            SlidingExpiration = TimeSpan.FromMinutes(1)
        };
    }
}
```

### 2. Angular OnPush Strategy

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceCardComponent {
  @Input() metric: PerformanceMetric;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateMetric(newMetric: PerformanceMetric): void {
    this.metric = newMetric;
    this.cdr.markForCheck();
  }
}
```

### 3. Virtual Scrolling for Large Datasets

```typescript
@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let item of items" class="item">
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class VirtualScrollComponent {
  items = Array.from({length: 10000}, (_, i) => ({name: `Item ${i}`}));
}
```

## Monitoring and Alerting

### 1. Performance Monitoring

```csharp
public class PerformanceMonitor
{
    private readonly ILogger<PerformanceMonitor> _logger;
    private readonly IMetricsCollector _metricsCollector;

    public async Task MonitorPerformance()
    {
        var metrics = await _metricsCollector.CollectMetrics();
        
        if (metrics.ResponseTime > 1000) // 1 second threshold
        {
            _logger.LogWarning("High response time detected: {ResponseTime}ms", metrics.ResponseTime);
            await SendAlert($"High response time: {metrics.ResponseTime}ms");
        }
    }
}
```

### 2. Angular Error Handling

```typescript
@Injectable()
export class ErrorHandlerService {
  handleError(error: any): void {
    console.error('Dashboard error:', error);
    // Send to monitoring service
    this.monitoringService.logError(error);
  }
}
```

## Deployment Considerations

### 1. Docker Configuration

```dockerfile
# Dockerfile for .NET API
FROM mcr.microsoft.com/dotnet/aspnet:6.0
COPY . /app
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["dotnet", "PerformanceDashboard.API.dll"]
```

### 2. Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: performance-dashboard-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: performance-dashboard-api
  template:
    metadata:
      labels:
        app: performance-dashboard-api
    spec:
      containers:
      - name: api
        image: performance-dashboard-api:latest
        ports:
        - containerPort: 80
        env:
        - name: Redis__ConnectionString
          value: "redis-service:6379"
```

## Conclusion

Building real-time performance dashboards requires careful consideration of architecture, performance, and user experience. By combining Angular's reactive capabilities with .NET's robust backend services and Redis caching, we can create highly performant, real-time applications that provide valuable insights to users.

The key to success is:
- Proper caching strategies
- Efficient real-time communication
- Performance monitoring
- Scalable architecture
- User-friendly interfaces

This approach has proven successful in production environments, handling thousands of concurrent users while maintaining sub-second response times.
