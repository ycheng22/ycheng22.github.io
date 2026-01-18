import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  withHashLocation,
  withPreloading,
} from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation(), withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(MarkdownModule.forRoot()),
  ],
}).catch((err) => console.error(err));
