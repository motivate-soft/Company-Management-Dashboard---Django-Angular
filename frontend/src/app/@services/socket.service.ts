import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {HandleSocketService} from "./handle-socket.service";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: SocketIOClient.Socket;
  private namespace = '/test';
  private base_url = 'http://localhost:8000';

  constructor(
    private handleSocket: HandleSocketService
  ) {
    this.socket = io.connect(this.base_url + this.namespace);
  }

  getSocket() {
    return this.socket;
  }

  listenSocket() {
    this.socket.on('create_product', (resp) => {
      console.log("receive 1");
      this.handleSocket.updateProducts(resp);
    });
  }
}
