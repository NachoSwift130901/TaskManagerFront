import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // Necesitamos Subject para emitir eventos

@Injectable({
  providedIn: 'root' // Lo hace un singleton disponible en toda la aplicación
})
export class ModalService {
  private openModalSubject = new Subject<void>();


  openModal$ = this.openModalSubject.asObservable();

  constructor() { }


  openModal(): void {
    this.openModalSubject.next();
  }
}