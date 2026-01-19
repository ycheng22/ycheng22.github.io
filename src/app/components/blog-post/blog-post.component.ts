import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { BlogPost } from '../../models/blog-post.model';
import { ScrollNavigationComponent } from '../scroll-navigation/scroll-navigation.component';
import { JupyterViewerComponent } from '../jupyter-viewer/jupyter-viewer.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownModule, ScrollNavigationComponent, JupyterViewerComponent],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements AfterViewInit, OnInit {
  @Input() blogPost!: BlogPost;
  @ViewChild('markdownContent', { static: false }) markdownContent!: ElementRef;

  isLiked = false;
  showShareMessage = false;
  likesCount = 0;

  ngOnInit() {
    this.likesCount = this.blogPost?.numberOfLike || 0;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  ngAfterViewInit(): void {
    // Wait for markdown to render, then add copy buttons
    setTimeout(() => {
      this.addCopyButtonsToCodeBlocks();
      
      // Also observe for changes in case markdown renders later
      if (this.markdownContent?.nativeElement) {
        const observer = new MutationObserver(() => {
          this.addCopyButtonsToCodeBlocks();
        });
        observer.observe(this.markdownContent.nativeElement, {
          childList: true,
          subtree: true
        });
      }
    }, 200);
  }

  private addCopyButtonsToCodeBlocks(): void {
    if (!this.markdownContent?.nativeElement) return;

    const preElements = this.markdownContent.nativeElement.querySelectorAll('pre');
    
    preElements.forEach((pre: HTMLElement) => {
      // Skip if copy button already exists
      if (pre.querySelector('.copy-code-button')) return;

      const code = pre.querySelector('code');
      if (!code) return;

      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.innerHTML = `
        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="display: none;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      `;
      
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.title = 'Copy code';
      
      copyButton.addEventListener('click', () => {
        this.copyCodeToClipboard(code.textContent || '', copyButton);
      });

      pre.style.position = 'relative';
      pre.appendChild(copyButton);
    });
  }

  private async copyCodeToClipboard(text: string, button: HTMLElement): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      
      // Show check icon
      const copyIcon = button.querySelector('.copy-icon') as HTMLElement;
      const checkIcon = button.querySelector('.check-icon') as HTMLElement;
      
      if (copyIcon && checkIcon) {
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyIcon.style.display = 'block';
          checkIcon.style.display = 'none';
          button.classList.remove('copied');
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  async onShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.showShareMessage = true;
      setTimeout(() => {
        this.showShareMessage = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  }

  onLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.likesCount++;
    } else {
      this.likesCount--;
    }
    // Note: In a real app, you would call a service to persist this to a database
  }
}
