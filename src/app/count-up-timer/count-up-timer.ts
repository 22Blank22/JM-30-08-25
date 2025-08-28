import { Component, inject, Input, OnInit } from '@angular/core';
import { CountUpTimerService } from './count-up-timer.service';
import { TimerModel } from './count-up-timer.model';
import { Digit } from '../digit/digit';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-count-up-timer',
  imports: [Digit],
  templateUrl: './count-up-timer.html',
  styleUrl: './count-up-timer.css',
})
export class CountUpTimer implements OnInit {
  private countUpTimerService: CountUpTimerService =
    inject(CountUpTimerService);

  @Input({ required: true }) startDate!: Date;
  currentDate: Date = new Date();

  timeElapsed!: TimerModel;

  digitsChanged: boolean[] = [false, false, false, false, false, false];

  getTimeElapsed() {
    return this.countUpTimerService.calculateDifference(
      this.startDate,
      this.currentDate
    );
  }

  getTotalDays() {
    return Math.floor(this.timeElapsed.hours / 24);
  }

  getStartDate() {
    return formatDate(this.startDate, 'dd.MM.yyyy hh:mm aa', 'en-US');
  }

  transformTimeElapsed() {
    return this.countUpTimerService.transform(this.timeElapsed);
  }

  update() {
    const prev = this.timeElapsed;
    //calculate new difference
    this.currentDate = new Date();
    this.timeElapsed = this.countUpTimerService.calculateDifference(
      this.startDate,
      this.currentDate
    );
    //check which time unit has changed
    this.digitsChanged = this.countUpTimerService.checkForChanges(
      prev,
      this.timeElapsed
    );

    // Reset the highlight after a short delay
    setTimeout(() => {
      this.digitsChanged = this.digitsChanged.map(() => false);
    }, 800); // Highlight for 800ms
  }

  ngOnInit() {
    //this.startDate = new Date(this.dateAsString);
    //const date = importantDates[this.index];
    //this.startDate = new Date(date);
    this.timeElapsed = this.countUpTimerService.calculateDifference(
      this.startDate,
      this.currentDate
    );
    setInterval(() => {
      this.update();
    }, 1000); // update every second
  }
}
