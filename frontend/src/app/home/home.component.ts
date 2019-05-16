import { Component, OnInit } from '@angular/core';

import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  counter: number;
  
  constructor(
    private counterService: CounterService
  ) { }

  ngOnInit() {
    this.counterService.getCurrentCounter()
      .subscribe((response: any) => {
        console.log(response);
        this.counter = response.counter;
      });
  }

  getCounter(): void {
    this.counterService.getCounter()
      .subscribe((response: any) => {

      });
  }
}
