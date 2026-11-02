import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Height of the sticky navbar plus a little breathing room, used for #fragment scrolling
const NAVBAR_OFFSET = 80;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-personal-website';

  constructor() {
    inject(ViewportScroller).setOffset([0, NAVBAR_OFFSET]);
  }
}
