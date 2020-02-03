import { Component, OnInit } from '@angular/core';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.component.html',
  styleUrls: ['./simulateur.component.css']
})
export class SimulateurComponent implements OnInit {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Clio'},
    {value: 'pizza-1', viewValue: 'Capture'},
    {value: 'tacos-2', viewValue: 'Talisman'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
