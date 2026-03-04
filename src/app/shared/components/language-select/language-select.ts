import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './language-select.html'
})
export class LanguageSelectComponent {

  constructor(public languageService: LanguageService) {}

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}