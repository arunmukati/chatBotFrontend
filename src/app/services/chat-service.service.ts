import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
@Injectable({
    providedIn: 'root',
  })
export class ChatService {
    private url = 'https://chat-bot-backend-arun.herokuapp.com/';
    private socket;
    private userId='5ff8392940b8e10cb497f44e';

    constructor() {
        this.socket = io(this.url,{ transports: ["websocket"] });
        this.socket.emit('joinchannel','agent-'+this.userId)
    }

    public sendMessage(message) {
        this.socket.emit('response',{...message,userId: this.userId});
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('message', (message) => {
                console.log("dd",message)
                observer.next(message);
            });
        });
    }
    public sendAgentTakeOver(data) {
        this.socket.emit('agentTakeover',data);
    }
}