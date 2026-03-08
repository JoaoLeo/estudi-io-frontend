import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  registerIcons() {

    this.iconRegistry.addSvgIcon(
      'flag-br',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/flags/pt-BR.svg')
    );
    this.iconRegistry.addSvgIcon(
      'flag-us',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/flags/en.svg')
    );

  }
}