import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ChatService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: any = [];
  users: any = [];
  userIndex = null;
  previousDate = undefined;
  chatBody;
  activeUserChatId = undefined;
  constructor(private chatService: ChatService, private apiService: ApiService) {
  }


  sendMessage() {
    let msg = {
      timestamp: new Date().getTime(),
      userChatId: this.activeUserChatId,
      text: this.users[this.userIndex].input
    }
    this.messages.push(msg);
    this.chatService.sendMessage(msg);
    this.users[this.userIndex].input = '';
    // this.message = '';
  }
  ngAfterViewInit() {
  }

  ngOnInit() {
    this.getAllUsers();
    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        if (message.name) {
          this.addNewUser({ ...message.data, name: message.name });
          return;
        }
        let index = this.users.findIndex(el => el._id == message.userChatId);
        this.users[index].chats.push(message);

        if (index == this.userIndex) {
          // alert();
          this.setChatBodyAtBottom();
        }else{
          if (message.agentTakeover && message.fromUser) {
            if (this.users[index].newMsg) {
              this.users[index].newMsg += 1;
            }
            else {
              this.users[index].newMsg = 1;
            }
          }
        }
        console.clear();
       
        if (index != 0) {
          this.shiftUserToTop(index);
        }
      });
  }
  addNewUser(data) {
    data.newMsg = 1;
    this.users.unshift(data);
    if (this.userIndex != undefined) {
      ++this.userIndex;
    } else {
      if(this.users.length==1){
        this.users[0].agentTakeover = false;
      }
      this.setUserActive(data, 0)
    }

  }
  shiftUserToTop(index) {
    let user = this.users.splice(index, 1);
    this.users.unshift(user[0]);
    ++this.userIndex;

  }
  getAllUsers() {
    this.apiService.getAllUsers().subscribe(data => {
      // console.log(data)
      this.users = data['data'];
      if (this.users.length) {
        this.setUserActive(this.users[0], 0);
      }
    })
  }
  getFirstCharOfName(fullName) {
    if (!fullName) return 0;
    return fullName.split(' ').map(n => n[0]).join('');
  }
  setUserActive(item, i) {
    this.messages = item.chats;
    this.userIndex = i;
    this.setChatBodyAtBottom();
    this.activeUserChatId = item._id;
    this.users[i].newMsg = 0;
  }
  setChatBodyAtBottom() {
    setTimeout(() => {
      let chatBody = document.getElementById('chats');
      chatBody.scrollTop = chatBody.clientHeight + chatBody.scrollHeight;
    }, 1);
  }
  agentTakeOver() {
    let data = this.users[this.userIndex];
    this.chatService.sendAgentTakeOver({ agentTakeover: data.agentTakeover, id: data._id, userId: data.userId })
  }
}
