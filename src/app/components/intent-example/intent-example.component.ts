import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intent-example',
  templateUrl: './intent-example.component.html',
  styleUrls: ['./intent-example.component.scss']
})
export class IntentExampleComponent implements OnInit {

  constructor( private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // this.name = params['name'];
    });
  }

}
