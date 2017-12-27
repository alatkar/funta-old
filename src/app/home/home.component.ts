import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feeds = [
    {type: 'post', message: 'Dog sleeping'},
    {type: 'product', message: 'Dog uses food'},
    {type: 'service', message: 'Dog uses grooming'},
    {type: 'service', message: 'Dog walker'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
