import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService} from 'src/app/services/api-service.service';

@Component({
  selector: 'app-intents',
  templateUrl: './intents.component.html',
  styleUrls: ['./intents.component.scss']
})
export class IntentsComponent implements OnInit {
  intentsList:any;
  responseList:any;
  selectedResponseId:any;
  selectedIntentId: any;
  selectedIntentIndex: any;
  viewExampleIndex= undefined;
  addIntentValue :any= {
    name: '',
    responseId: null
  }
  addExampleValue :any= {
    name: '',
    intentId: null
  }
  editIntent=false;
  constructor(private apiService : ApiService, private router: Router  ) { }

  ngOnInit(): void {
    this.getIntentList();
    this.getResponseList();
  }
  getIntentList(){
   this.apiService.getIntents().subscribe(data=>{
    this.intentsList = data['data'];
    console.log(this.intentsList);
   })
  }
  getResponseList(){
    this.apiService.getResponses().subscribe(data=>{
      this.responseList = data['data'];
     })
  }
  setSelectedIntentId(intentId,index,responseId=false){
    this.selectedIntentId = intentId;
    this.selectedIntentIndex = index;
    if(responseId){
      this.selectedResponseId = responseId;
    }
  }
  addResponseToIntent(){
    if(!this.selectedResponseId) return;
    this.apiService.addResponseToIntent(this.selectedIntentId,this.selectedResponseId).subscribe(data=>{
      let res = this.responseList.findIndex(el=> el._id == this.selectedResponseId);
      this.intentsList[this.selectedIntentIndex].responseId = this.responseList[res]
      this.selectedResponseId= null;
      document.getElementById('closeAddResponse').click();
    })
  }
  addIntent(){
    this.apiService.addIntent(this.addIntentValue).subscribe(data=>{
      this.intentsList.push(data['data']);
      this.selectedResponseId= null;
      document.getElementById('closeAddIntent').click();
    })
  }
  deleteResponseToIntent(intentId,index){
    this.apiService.removeIntentResponse({intentId:intentId}).subscribe(data=>{
      this.intentsList[index].responseId = null;
    })
  }
  setEditIntentValue(intent){
    this.selectedIntentId = intent._id;
    this.editIntent = true;
    this.addIntentValue = {
      name : intent.name
    }
  }
  editIntentData(){
    this.apiService.updateIntent({intentId: this.selectedIntentId,name:this.addIntentValue.name}).subscribe(data=>{
      let index = this.intentsList.findIndex(d => d._id === this.selectedIntentId)
      this.intentsList[index].name = this.addIntentValue.name;
      // if(this.addIntentValue.responseId){
      //   let res = this.responseList.findIndex(el=> el._id == this.addIntentValue.responseId);
      //    this.intentsList[index].responseId = [
      //   this.responseList[res]
      // ]
      // }
      // this.selectedResponseId= null;
      document.getElementById('closeAddIntent').click();
    })
  }
  deleteIntent(intentId,i){
    this.apiService.deleteIntent(intentId).subscribe(data=>{
      this.intentsList.splice(i,1);
    })
  }
  resetEditIntentValue(){
    this.addIntentValue= {
      name: '',
      responseId: null
    }
  }
  viewIntentExample(i){
    this.viewExampleIndex == i ? this.viewExampleIndex = undefined : i
    // let a = document.getElementsByClassName('collapse show');
    // console.log(a);
    // console.log(intent);
    // this.router.navigate(['/heroes', { id: heroId }]);
  }
  addExample(){
    if(this.addExampleValue.name != ""){
      this.apiService.addExample(this.addExampleValue).subscribe(data=>{
        data = data['data'];
        let index = this.intentsList.findIndex(el=> el._id == data['_id']);
        let length = data['examples'].length ;
        let addedExample = data['examples'][length-1];
        this.intentsList[index].examples.push(addedExample);
        document.getElementById('closeAddExample').click();
      })
    }
  }
  deleteExample(intentId,exampleId,index){
    this.apiService.deleteExample({intentId: intentId, exampleId:exampleId}).subscribe(data=>{
      this.intentsList[index].examples.splice(index,1);
    })
  }
}
