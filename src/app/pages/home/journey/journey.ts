import { Component } from '@angular/core';
import { WorkExpComponent } from './work-exp/work-exp';

@Component({
  selector: 'app-journey',
  imports: [WorkExpComponent],
  templateUrl: './journey.html',
  styleUrl: './journey.scss',
})
export class Journey {}
