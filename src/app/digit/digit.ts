import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-digit',
  imports: [],
  templateUrl: './digit.html',
  styleUrl: './digit.css',
})
export class Digit {
  @Input({ required: true }) num!: number;
  @Input({ required: true }) unit!: string;
  @Input() isSquare: boolean = true;
  @Input({ required: true }) changed!: boolean;
}
