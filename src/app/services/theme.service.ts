import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

// Light/dark theme. The inline script in index.html applies the saved or system theme
// before first paint; this service starts from that state and persists explicit choices.
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeSignal = signal<Theme>(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );
  readonly theme = this.themeSignal.asReadonly();

  toggle(): void {
    const next: Theme = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.themeSignal.set(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode / blocked): the choice lasts for this page view only
    }
  }
}
