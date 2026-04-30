import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss'
})
export class ErrorMessage {

  @Input() message: string | null = null;

}