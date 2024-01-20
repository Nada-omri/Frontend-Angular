import { Injectable } from '@angular/core';
import { RxStompService } from './rx-stomp.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private APIURL: string = "http://localhost:8082/api/v1/conversation"

  constructor(private rxStompService: RxStompService,private http:HttpClient) {}

  connect() {
    this.rxStompService.activate();
  }

  sendMessage(message: string) {
    this.rxStompService.publish({
      destination: '/app/message',
      body: message,
    });
  }

  subscribeToConversation(conversationId:number) {
    return this.rxStompService.watch('/conversation/'+conversationId);
  }
  getConversation(sellerId:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
      )
    };
    return this.http.post(this.APIURL,{seller:{id:sellerId}},httpOptions);
  }
  getConversationByUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
      )
    };
    return this.http.get(this.APIURL,httpOptions);
  }




}
