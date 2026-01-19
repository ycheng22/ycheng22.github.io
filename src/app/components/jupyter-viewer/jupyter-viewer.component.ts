import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Notebook } from 'notebook-viewer-ts';

// Import Prism for syntax highlighting
declare var Prism: any;

@Component({
  selector: 'app-jupyter-viewer',
  standalone: true,
  template: `
    <div #notebookContainer id="notebook"></div>
  `,
  // Use None to allow the library's internal CSS classes to work freely
  encapsulation: ViewEncapsulation.None, 
  styles: [`
    * {
      font-family: "Roboto", sans-serif;
      font-optical-sizing: auto;
      font-style: normal;
      font-variation-settings: "wdth" 100;
    }

    #notebook {
      line-height: 1.5;
      margin: auto;
      padding: 1rem;
      background: #fdfdfd;
      color: #272727;
      max-width: 1024px;
    }

    .cell-content {
      border-radius: 4px;
      display: flex;
      margin-bottom: 5px;
    }

    .input-code {
      overflow: auto;
      border-color: #999;
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      margin: 0;
    }

    code {
      font-family: "Fira Code", monospace;
      font-size: 0.95em;
      padding: 0;
    }

    .markdown h1 { font-size: 2em; margin-top: 1.5em; }

    .markdown h2 { font-size: 1.6em; margin-top: 1.2em; }

    .markdown p, .markdown ul { margin: 0.5em 0; }

    .out.code-row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .outputs {
      border-radius: 4px;
      max-height: 100vh;
      overflow: auto;
      width: 100%;
    }

    .output-stream, .output-result {
      padding: 0;
      margin: auto;
    }

    .output-error {
      color: #ff6b6b;
      font-weight: bold;
    }

    .code-row {
      width: 100%;
    }

    .prompt {
      width: 76px;
      font-family: monospace;
      color: #999;
      user-select: none;
      flex-shrink: 0;
      text-align: right;
      padding: 5px;
    }

    .cell.collapsed {
      border-radius: 4px;
      padding: 0.5rem;
      cursor: pointer;
      position: relative;
    }

    .collapsed-toggle {
      font-style: italic;
      color: #aaa;
      margin-bottom: 0.25rem;
      pointer-events: none;
    }

    .cell.collapsed .cell-content {
      display: none;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: #aaa;
      cursor: pointer;
      margin-bottom: 0.5rem;
      font-style: italic;
      font-size: 0.9rem;
    }

    .hidden {
      display: none !important;
    }

    /* Prism syntax highlighting for code blocks */
    #notebook pre[class*="language-"] {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 1em;
      margin: 0.5em 0;
      overflow: auto;
      border-radius: 4px;
    }

    #notebook code[class*="language-"] {
      color: #f8f8f2;
      background: none;
      text-shadow: 0 1px rgba(0, 0, 0, 0.3);
      font-family: "Fira Code", "Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", monospace;
      font-size: 0.95em;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      tab-size: 4;
      hyphens: none;
    }

    /* Ensure code blocks in input-code cells are styled */
    #notebook .input-code pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 1em;
      margin: 0;
      overflow: auto;
      border-radius: 4px;
    }

    #notebook .input-code code {
      font-family: "Fira Code", "Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", monospace;
    }
  `]
})
export class JupyterViewerComponent implements OnChanges, AfterViewChecked {
  @Input() notebookData: any; // Pass the JSON object from the .ipynb file
  @ViewChild('notebookContainer', { static: true }) container!: ElementRef;
  private shouldHighlight = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notebookData'] && this.notebookData) {
      this.renderNotebook();
      this.shouldHighlight = true;
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldHighlight) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        this.highlightCode();
        this.shouldHighlight = false;
      }, 0);
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

  private highlightCode(): void {
    if (typeof Prism === 'undefined') return;

    const container = this.container.nativeElement;
    if (!container) return;

    // Find all code blocks in the notebook - prioritize pre code blocks
    const preCodeBlocks = container.querySelectorAll('pre code');
    const inlineCodeBlocks = container.querySelectorAll('code:not(pre code)');
    
    // Process pre code blocks first
    preCodeBlocks.forEach((codeElement: HTMLElement) => {
      this.highlightCodeElement(codeElement, true);
    });

    // Process inline code blocks (skip highlighting for now, or apply minimal styling)
    // Inline code typically doesn't need syntax highlighting
  }

  private highlightCodeElement(codeElement: HTMLElement, isBlock: boolean = true): void {
    if (!codeElement) return;

    // Skip if already highlighted by Prism
    if (codeElement.parentElement?.classList.contains('language-') && 
        codeElement.parentElement?.classList.contains('prism-highlighted')) {
      return;
    }

    // Determine language - default to python for Jupyter notebooks
    let language = 'python';
    
    // Check if there's a language class already
    const classList = Array.from(codeElement.classList);
    const langClass = classList.find(cls => cls.startsWith('language-'));
    if (langClass) {
      language = langClass.replace('language-', '');
    }

    // For block code, ensure pre has language class
    if (isBlock && codeElement.parentElement?.tagName === 'PRE') {
      const pre = codeElement.parentElement;
      if (pre && !pre.classList.contains(`language-${language}`)) {
        pre.classList.add(`language-${language}`);
      }
      if (!codeElement.classList.contains(`language-${language}`)) {
        codeElement.classList.add(`language-${language}`);
      }
    } else if (isBlock) {
      // Wrap in pre if not already wrapped
      const pre = document.createElement('pre');
      pre.className = `language-${language}`;
      codeElement.parentNode?.insertBefore(pre, codeElement);
      pre.appendChild(codeElement);
      codeElement.classList.add(`language-${language}`);
    }

    // Highlight with Prism
    try {
      Prism.highlightElement(codeElement);
      // Mark as highlighted
      if (codeElement.parentElement?.tagName === 'PRE') {
        codeElement.parentElement.classList.add('prism-highlighted');
      }
    } catch (error) {
      console.warn('Error highlighting code:', error);
    }
  }
}
