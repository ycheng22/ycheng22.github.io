import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-navigation.component.html',
  styleUrls: ['./scroll-navigation.component.scss'],
})
export class ScrollNavigationComponent implements OnInit, OnDestroy {
  @Input() targetElementId?: string; // Optional: target element to scroll to instead of document top/bottom

  showScrollButtons = false;
  private scrollListener: (() => void) | null = null;

  ngOnInit(): void {
    this.scrollListener = this.onScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private onScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (scrollTop / docHeight) * 100;

    // Show buttons when scrolled past 5% of the page
    this.showScrollButtons = scrolledPercentage > 5;
  }

  scrollToTop(): void {
    if (this.targetElementId) {
      const element = document.getElementById(this.targetElementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  scrollToBottom(): void {
    if (this.targetElementId) {
      const element = document.getElementById(this.targetElementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
}
