import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';

@Injectable()
export class WebsocketService {

  private socket;
  private saveSocketClientInfo: string = 'saveSocketClientInfo';

  constructor() { }

  public connect(path:any): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:889');
    let observable = new Observable(observer => {
        this.socket.on(path, (data) => {
          observer.next(data);
        })
    });

    let observer = {
        next: (data: Object) => {
            this.socket.emit(this.saveSocketClientInfo, data);
        },
    };
    return Rx.Subject.create(observer, observable);
  }

}