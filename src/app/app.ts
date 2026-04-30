import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegistryService } from './shared/icons/icon.registry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  
  protected readonly title = signal('Estudi-io');
  
  constructor(private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons();
  }
}