import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountUpTimer } from './count-up-timer/count-up-timer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CountUpTimer, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('timer');

  importantDates = [
    //new Date(2000, 1, 2, 5, 59), // birthday 02.02.2000 05:59
    new Date(2025, 3, 30, 11, 30), // standesamt 30.04.2025 11:30
    new Date(2025, 7, 30, 14, 0), // kirchlich 30.08.2025 14:00
  ];

  dateOneActive = false;
  dateTwoActive = true;

  toggleDateOne() {
    this.dateOneActive = true;
    this.dateTwoActive = false;
  }

  toggleDateTwo() {
    this.dateTwoActive = true;
    this.dateOneActive = false;
  }
}
