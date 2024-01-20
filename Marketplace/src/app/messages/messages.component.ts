import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { Message } from '../shared/models/Message';
import { Conversation } from '../shared/models/Conversation';
import { API_URLS } from '../config/api.url.config';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  conversations!: Conversation[];
  filteredConversations!: Conversation[];
  search:string="";
  subscriptionMap: Map<number, Subscription> = new Map<number, Subscription>();

  conversationId: number = 0;
  activeConversation: Conversation = { messages: [] };
  activeConversationRole!: string;
  message: string = "";
  username = localStorage.getItem("username");
  Url: string = API_URLS.USER_IMAGE_URL;

  messageContainer!: HTMLElement | null;


  constructor(private webSocketService: WebSocketService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.messageContainer = document.getElementById('message-container');
    setTimeout(() => {
      this.scrollDown();
    }, 100);
    this.route.params.subscribe(params => {
      this.conversationId = parseInt(params['id']);
    });
    this.getConversations()
  }

  private scrollDown() {
    // Scroll to the bottom of the message container after every new message
    if (this.messageContainer) {
      this.messageContainer.scrollTo(0, this.messageContainer.scrollHeight)
    }
  }
  getConversations() {
    this.webSocketService.getConversationByUser().subscribe({
      next: (res: any) => {
        this.conversations = res;
        this.filteredConversations=res;
        res.map((conversation: Conversation, i: number) => {
          if (conversation.id == this.conversationId) {
            this.activeConversation = conversation;
            if (conversation.buyer?.username == this.username) {
              this.activeConversationRole = "BUYER"
            } else {
              this.activeConversationRole = "SELLER"
            }
            let subs=this.webSocketService.subscribeToConversation(this.conversationId).subscribe((res) =>
            this.subscribeToActiveConversation(res)
          )
            this.subscriptionMap.set(this.conversationId, subs)
          } else {
            this.subscriptionMap.set(conversation.id!, this.webSocketService.subscribeToConversation(conversation.id!).subscribe((res) =>
              this.subscribeToConversation(conversation, res)
            ))
          }
        })

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  subscribeToConversation(conversation: Conversation, res: any) {
    const message = JSON.parse(res.body)
    conversation.messages!.push(message)
    conversation.lastModified = new Date()
    this.sortByLastModified()
  }
  subscribeToActiveConversation(res: any) {
    const message = JSON.parse(res.body)
    this.activeConversation.messages!.push(message);
    if (this.messageContainer?.scrollHeight! - this.messageContainer!.scrollTop < 700) {
      setTimeout(() => {
        this.scrollDown();
      }, 1);
    }
    this.activeConversation.lastModified = new Date()
    this.sortByLastModified()
  }
  getImage(conversation: Conversation) {
    var role = conversation.buyer?.username == this.username ? "BUYER" : "SELLER"
    return role == "BUYER" ? this.Url + conversation.seller?.image : this.Url + conversation.buyer?.image
  }
  getUserImage() {
    return this.activeConversationRole == "BUYER" ? this.Url + this.activeConversation.buyer?.image : this.Url + this.activeConversation.seller?.image
  }
  getUsername(conversation: Conversation) {
    var role = conversation.buyer?.username == this.username ? "BUYER" : "SELLER"
    return role == "BUYER" ? conversation.seller?.username : conversation.buyer?.username
  }
  onSendMessage() {
    if (this.message == "") {
      return
    }
    const message =
    {
      body: this.message,
      conversation: { id: this.conversationId },
      sender: this.activeConversationRole,
      date: new Date()
    };
    this.webSocketService.sendMessage(JSON.stringify(message));
    this.message = ""
  }
  getSender(message: Message) {
    return message.sender === "BUYER" ? this.activeConversation.buyer! : this.activeConversation.seller!
  }
  getLastMessageBody(conversation: Conversation) {
    if (conversation.messages?.length! > 0) {
      const lastMessage = conversation.messages![conversation.messages!.length - 1].body?.trim()
      if (lastMessage!.length < 35) {
        return lastMessage
      } else {
        return lastMessage?.substring(0, 32) + "..."
      }
    } else {
      return ""
    }

  }

  sortByLastModified() {
    this.conversations.sort((a, b) => new Date(b.lastModified!).getTime() - new Date(a.lastModified!).getTime());
  }

  getMessageDateDescription(conversation: Conversation): string {
    if (conversation.messages?.length! > 0) {
      const messageDate: Date = new Date(conversation.messages![conversation.messages!.length - 1].date!)
      const now = new Date();
      const timeDifferenceInSeconds = Math.floor((now.getTime() - messageDate.getTime()) / 1000);

      if (timeDifferenceInSeconds < 60) {
        return "just now";
      } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
    } else {
      return ""
    }
  }
  changeConversation(conversation: Conversation) {
    this.subscriptionMap.get(this.conversationId)!.unsubscribe()
    this.subscriptionMap.get(conversation.id!)!.unsubscribe()
    this.subscriptionMap.set(this.conversationId,this.webSocketService.subscribeToConversation(this.conversationId).subscribe((res) => 
    this.subscribeToConversation(conversation,res)
  ))
    this.subscriptionMap.set(conversation.id!,this.webSocketService.subscribeToConversation(conversation.id!).subscribe((res) => {
      this.subscribeToActiveConversation(res)
    }))
    this.router.navigate(["/message/"+conversation.id])
    this.activeConversation=conversation;
    this.conversationId=conversation.id!
    if(conversation.buyer?.username==this.username){
      this.activeConversationRole="BUYER"
    }else{
      this.activeConversationRole="SELLER"
    }
    setTimeout(() => {
      this.scrollDown();
    }, 1);    
  }
  filterConversations():void{
    this.filteredConversations=this.conversations.filter((conversation)=>{
      if(this.activeConversationRole="BUYER"){
        return conversation.seller?.username?.startsWith(this.search)
      }else{
        return conversation.buyer?.username?.startsWith(this.search)

      }
    })
  }



}
