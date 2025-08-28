import { Inject, Injectable } from '@angular/core';
import { TimerModel } from './count-up-timer.model';

@Injectable({
  providedIn: 'root',
})
export class CountUpTimerService {
  calculateDifference(startDate: Date, endDate: Date): TimerModel {
    // Use UTC to avoid DST issues for total time calculations
    const startUTC = new Date(startDate.getTime());
    const endUTC = new Date(endDate.getTime());

    const diffMs = endUTC.getTime() - startUTC.getTime();

    // Calculate total units (these will be DST-aware)
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // For years, months, days - use a DST-aware approach
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    // Account for time portion in day calculation
    const startTimeMs =
      startDate.getHours() * 3600000 +
      startDate.getMinutes() * 60000 +
      startDate.getSeconds() * 1000;
    const endTimeMs =
      endDate.getHours() * 3600000 +
      endDate.getMinutes() * 60000 +
      endDate.getSeconds() * 1000;

    if (endTimeMs < startTimeMs) {
      days--;
    }

    // Adjust for negative days
    if (days < 0) {
      months--;
      const daysInPrevMonth = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0
      ).getDate();
      days += daysInPrevMonth;
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      years,
      months,
      days,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds,
    };
  }

  transform(timeElapsed: TimerModel): TimerModel {
    return {
      years: timeElapsed.years,
      months: timeElapsed.months,
      days: timeElapsed.days,
      hours: timeElapsed.hours % 24,
      minutes: timeElapsed.minutes % 60,
      seconds: timeElapsed.seconds % 60,
    };
  }

  checkForChanges(prev: TimerModel, cur: TimerModel): boolean[] {
    //changes[0] = years, ... changes[5] = seconds
    const changes: boolean[] = [];
    changes.push(prev.years !== cur.years);
    changes.push(prev.months !== cur.months);
    changes.push(prev.days !== cur.days);
    changes.push(prev.hours !== cur.hours);
    changes.push(prev.minutes !== cur.minutes);
    changes.push(prev.seconds !== cur.seconds);

    return changes;
  }
}
