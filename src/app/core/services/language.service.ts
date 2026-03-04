import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly STORAGE_KEY = 'lang';
  private readonly DEFAULT_LANG = 'pt-BR';
  private platformId = inject(PLATFORM_ID);

  constructor(private translate: TranslateService) {

    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;
      this.translate.use(saved);
    } else
      this.translate.use(this.DEFAULT_LANG);

  }

  setLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(this.STORAGE_KEY, lang);
    

    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANG;
  }
}