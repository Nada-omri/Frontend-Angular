import { Component, Input } from '@angular/core';
import { Account } from '../shared/models/Account';
import { Message } from '../shared/models/Message';
import { Conversation } from '../shared/models/Conversation';
import { API_URLS } from '../config/api.url.config';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent {
  @Input() message!:Message;
  @Input() type!:boolean;
  @Input() sender!:Account;
  Url:string =API_URLS.USER_IMAGE_URL;

  conversations!: Conversation[];

  getImage(){
    return this.Url+this.sender.image
  }
}
