import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconRegistryService } from './shared/icons/icon.registry';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  protected readonly title = signal('Estudi-io');
  
 constructor(private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons();
  }
}
