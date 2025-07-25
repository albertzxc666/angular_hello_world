import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header-component/header-component';
import { GreetingComponent } from './greeting/greeting-component/greeting-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, GreetingComponent ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hello-world');
}
