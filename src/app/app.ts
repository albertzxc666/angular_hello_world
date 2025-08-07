import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header-component';
import { GreetingComponent } from './components/greeting/greeting-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, GreetingComponent ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public readonly title = signal('hello-world');
}
