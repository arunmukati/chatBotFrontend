import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isTraining:boolean = false;
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    let decoDiv = document.getElementById('navDecoration');
    let a = document.getElementById(window.location.pathname);
    if(a){
        decoDiv.style.top = a.offsetTop + 'px'
    }
  }
  changePlace(event) {
    let a = event.target;
    console.log(event)
    let decoDiv = document.getElementById('navDecoration');
    while (a.className != 'links' || a.className == 'nav') {
        a = a.parentElement;
    }
    if (a.className == 'links') {
        decoDiv.style.width = 5 + 'px';
        setTimeout(() => {
            decoDiv.style.top = a.offsetTop + 'px';
        }, 100);
        setTimeout(() => {
            decoDiv.style.width = '65px';
        }, 200);
    }
}
trainBot(){
  this.isTraining = true;
  this.apiService.trainBot().subscribe(data=>{
    this.isTraining = false;
  })
}

}
