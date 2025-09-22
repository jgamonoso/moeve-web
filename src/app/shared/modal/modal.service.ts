// src/app/shared/modal/modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';

export type ModalType = 'lang' | 'onboarding' | null;

interface ModalState {
  open: boolean;
  type: ModalType;
  // payload opcional si algún modal lo necesitara
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private state$ = new BehaviorSubject<ModalState>({ open: false, type: null });
  private closeSignal?: Subject<any>;

  get modalState$() {
    return this.state$.asObservable();
  }

  open(type: ModalType, payload?: any): Promise<any> {
    this.closeSignal = new Subject<any>();
    this.state$.next({ open: true, type });
    return firstValueFrom(this.closeSignal.asObservable());
  }

  close(result?: any) {
    this.state$.next({ open: false, type: null });
    this.closeSignal?.next(result);
    this.closeSignal?.complete();
    this.closeSignal = undefined;
  }
}
