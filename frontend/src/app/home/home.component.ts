import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  counter: number;
  incomingCurrent: number;
  incomingNext: number;
  showPopup = false;
  
  constructor(
    private counterService: CounterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.counterService.getCurrentCounter()
      .subscribe((response: any) => {
        this.counter = response.counter;
      });
  }

  getCounter(): void {
    this.counterService.getCounter()
      .subscribe(
        (response: any) => {
          this.incomingCurrent = response.counter;
          this.incomingNext = response.nextCounter;
          this.showPopup = true;
        },
        (error: any) => {
          if (error.status === 401) {
            this.router.navigate(['login']);
          }
        }
      );
  }

  cancel(): void {
    this.counterService.cancelCounter(this.incomingCurrent)
      .subscribe(
        (response: any) => {
          this.showPopup = false;
          this.counter = response.counter;
        },
        (error: any) => {
          if (error.status === 401) {
            this.router.navigate(['login']);
          }
        }
      );
  }

  confirm(): void {
    this.counterService.confirmCounter(this.incomingNext)
      .subscribe(
        (response: any) => {
          this.showPopup = false;
          this.counter = response.counter;
        },
        (error: any) => {
          if (error.status === 401) {
            this.router.navigate(['login']);
          }
        }
      );
  }
}
