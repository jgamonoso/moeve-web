import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';

export type ModalType = 'lang' | 'onboarding' | null;
export type ModalPayload = Record<string, unknown>;

interface ModalState {
  open: boolean;
  type: ModalType;
  // payload opcional si algún modal lo necesitara
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private state$ = new BehaviorSubject<ModalState>({ open: false, type: null });
  private closeSignal?: Subject<unknown>;

  get modalState$() {
    return this.state$.asObservable();
  }

  open(type: ModalType, _payload?: ModalPayload): Promise<unknown> {
    void _payload;
    this.closeSignal = new Subject<unknown>();
    this.state$.next({ open: true, type });
    return firstValueFrom(this.closeSignal.asObservable());
  }

  close(result?: unknown) {
    this.state$.next({ open: false, type: null });
    this.closeSignal?.next(result);
    this.closeSignal?.complete();
    this.closeSignal = undefined;
  }
}
