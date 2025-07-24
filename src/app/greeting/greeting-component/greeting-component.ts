import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting-component',
  imports: [],
  templateUrl: './greeting-component.html',
  styleUrl: './greeting-component.scss'
})
export class GreetingComponent {
  @Input() name: string = '';
}
