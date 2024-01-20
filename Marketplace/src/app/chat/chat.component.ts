import { Component,OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from '../shared/models/Conversation';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  sellerId:number=0;
  constructor(private webSocketService: WebSocketService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.sellerId = parseInt(params['id']);
      this.webSocketService.getConversation(this.sellerId).subscribe((res:Conversation)=>{
        console.log(res)
        this.router.navigate(["/message/"+res.id])
      })
    });
  }
}