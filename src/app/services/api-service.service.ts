import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOjc3NDU5NTk3OTgsImlkIjoiNWZmODM5Mjk0MGI4ZTEwY2I0OTdmNDRlIiwiaWF0IjoxNjE1NDcxNjE2fQ.ANhMQ1MIEZAM95VWFw55LCxwV3hd4hD_lMtm5P2Lg-Q';
  url = 'https://chat-bot-backend-arun.herokuapp.com/api'
  constructor(private http: HttpClient) { }
  getIntents() {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.get(this.url + '/intents',{headers: reqHeader}).pipe();
  }
  getResponses() {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.get(this.url + '/response',{headers: reqHeader}).pipe();
  }
  addResponseToIntent(intentId,responseId){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/updateIntent',{intentId: intentId,responseId:responseId},{headers: reqHeader}).pipe();
  }
  addIntent(data){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/addIntent',data,{headers: reqHeader}).pipe();

  }
  removeIntentResponse(data){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/removeIntentResponse',data,{headers: reqHeader}).pipe();
  }
  updateIntent(data){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/updateIntent',data,{headers: reqHeader}).pipe();
  }
  deleteIntent(intentId){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.delete(this.url + `/intent/${intentId}`,{headers: reqHeader}).pipe();
  }
  addResponse(data){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/addResponse',data,{headers: reqHeader}).pipe();
  }
  deleteResponse(responseId){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.delete(this.url + `/response/${responseId}`,{headers: reqHeader}).pipe();
  }
  updateResponse(data){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/updateResponse',data,{headers: reqHeader}).pipe();
  }
  trainBot(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.get(this.url + '/train',{headers: reqHeader}).pipe();
  }
  getAllUsers() {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.get(this.url + '/allUser',{headers: reqHeader}).pipe();
  }
  getMessages() {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.get(this.url + '/messages/:id',{headers: reqHeader}).pipe();
  }
  addExample(data){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/intent/example',data,{headers: reqHeader}).pipe();
  }
  deleteExample(data){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': this.api
   });
    return this.http.post(this.url + '/intent/deleteExample',data,{headers: reqHeader}).pipe();
  }
}
