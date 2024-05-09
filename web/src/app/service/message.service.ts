// message.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private successMessageSubject: Subject<string> = new Subject<string>();

  constructor() { }

  // Method to send success message
  sendSuccessMessage(message: string): void {
    this.successMessageSubject.next(message);
  }

  // Method to listen for success messages
  getSuccessMessage(): Observable<string> {
    return this.successMessageSubject.asObservable();
  }
}
