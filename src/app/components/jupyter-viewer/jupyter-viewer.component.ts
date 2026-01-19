import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Notebook } from 'notebook-viewer-ts';

@Component({
  selector: 'app-jupyter-viewer',
  standalone: true,
  template: `
    <div #notebookContainer class="notebook-viewer-style"></div>
  `,
  // Use None to allow the library's internal CSS classes to work freely
  encapsulation: ViewEncapsulation.None, 
  styles: [`
    /* Optional: Add basic override styles if needed */
    .notebook-viewer-style pre { background: #f5f5f5; padding: 10px; }
  `]
})
export class JupyterViewerComponent implements OnChanges {
  @Input() notebookData: any; // Pass the JSON object from the .ipynb file
  @ViewChild('notebookContainer', { static: true }) container!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notebookData'] && this.notebookData) {
      this.renderNotebook();
    }
  }

  private renderNotebook(): void {
    if (!this.notebookData) return;

    // 1. Create instance with the JSON data
    const notebook = new Notebook(this.notebookData);
    
    // 2. Render to HTML (targets: 'tailwind' | 'bootstrap' | undefined)
    // Using undefined gives you raw HTML you can style yourself
    const html = notebook.render();

    // 3. Inject into DOM
    this.container.nativeElement.innerHTML = html;
  }
}
