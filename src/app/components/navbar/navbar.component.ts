import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="container-custom">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 4h8v2H8V4zm0 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Cheng</span>
            </a>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a routerLink="/" 
                 routerLinkActive="text-primary-600" 
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a routerLink="/blog" 
                 routerLinkActive="text-primary-600"
                 class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Blog
              </a>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button type="button" 
                    (click)="toggleMobileMenu()"
                    class="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <span class="sr-only">Open main menu</span>
              <svg class="h-6 w-6" 
                   [class.hidden]="mobileMenuOpen" 
                   [class.block]="!mobileMenuOpen" 
                   xmlns="http://www.w3.org/2000/svg" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg class="h-6 w-6" 
                   [class.hidden]="!mobileMenuOpen" 
                   [class.block]="mobileMenuOpen" 
                   xmlns="http://www.w3.org/2000/svg" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile menu -->
        <div class="md:hidden" [class.hidden]="!mobileMenuOpen">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <a routerLink="/" 
               routerLinkActive="text-primary-600" 
               [routerLinkActiveOptions]="{exact: true}"
               (click)="closeMobileMenu()"
               class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors">
              Home
            </a>
            <a routerLink="/blog" 
               routerLinkActive="text-primary-600"
               (click)="closeMobileMenu()"
               class="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors">
              Blog
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}

