import { Component, OnInit } from '@angular/core';

import { MessageService } from '../services/business/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor( public messageservice: MessageService) { }

  ngOnInit() {
  }

}
