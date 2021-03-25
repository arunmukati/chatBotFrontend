import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent implements OnInit {

  intentsList:any;
  responseList:any;
  selectedResponseId:any;
  selectedIntentId: any;
  selectedIntentIndex: any;
  addResponseValue :any= {
    name: '',
    text:''
  }
  editResponse=false;
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.getResponseList();
  }
  getResponseList(){
    this.apiService.getResponses().subscribe(data=>{
      this.responseList = data['data'];
     })
  }
  setSelectedIntentId(intentId,index,responseId=false){
    // this.selectedIntentId = intentId;
    // this.selectedIntentIndex = index;
    // if(responseId){
    //   this.selectedResponseId = responseId;
    // }
  }
  addResponseToIntent(){
    // if(!this.selectedResponseId) return;
    // this.apiService.addResponseToIntent(this.selectedIntentId,this.selectedResponseId).subscribe(data=>{
    //   let res = this.responseList.findIndex(el=> el._id == this.selectedResponseId);
    //   this.intentsList[this.selectedIntentIndex].responseId = [
    //     this.responseList[res]
    //   ]
    //   this.selectedResponseId= null;
    //   document.getElementById('closeAddResponse').click();
    // })
  }
  addResponse(){
    this.apiService.addResponse(this.addResponseValue).subscribe(data=>{
      this.responseList.push(data['data']);
      document.getElementById('closeAddResponse').click();
    })
  }
  deleteResponse(responseId,index){
    this.apiService.deleteResponse(responseId).subscribe(data=>{
      this.responseList.splice(index,1);
    })
  }
  setEditResponseValue(response){
    this.selectedResponseId = response._id;
    this.editResponse = true;
    this.addResponseValue = {
      name : response.name,
      text: response.text
    }
  }
  editResponseData(){
    this.apiService.updateResponse({responseId: this.selectedResponseId, ...this.addResponseValue}).subscribe(data=>{
      let index = this.responseList.findIndex(d => d._id === this.selectedResponseId)
      this.responseList[index].name = this.addResponseValue.name;
      this.responseList[index].text = this.addResponseValue.text;
      this.selectedResponseId = null;
      document.getElementById('closeAddResponse').click();
    })
  }
  deleteIntent(intentId,i){
    // this.apiService.deleteIntent(intentId).subscribe(data=>{
    //   this.intentsList.splice(i,1);
    // })
  }
  resetEditResponseValue(){
  this.addResponseValue={
    name:'',
    text:''
  }
  }
}
