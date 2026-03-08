import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../../../core/services/language.service';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './language-select.html'
})
export class LanguageSelectComponent {

  constructor(public languageService: LanguageService) {}

    languages = [
    {
      code: 'pt-BR',
      label: 'Português',
      icon: 'flag-br'
    },
    {
      code: 'en',
      label: 'English',
      icon: 'flag-us'
    }
  ];

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  get selectedLanguage() {
  return this.languages.find(
    l => l.code === this.languageService.getCurrentLanguage()
  );
}

}