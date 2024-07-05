import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  LowerCasePipe,
  NgClass,
  NgFor,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  input,
} from '@angular/core';
import { RoomList } from '../rooms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RoomsBookingComponent } from '../rooms-booking/rooms-booking.component';

@Component({
  selector: 'hinv-rooms-list',
  standalone: true,
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgFor,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    LowerCasePipe,
    UpperCasePipe,
    PercentPipe,
    SlicePipe,
    RouterLink,
    RouterLinkActive,
    RoomsBookingComponent,
  ],
})
export class RoomsListComponent implements OnChanges, OnDestroy {
  @Input() rooms: RoomList[] | null = [];

  @Input() title: string = '';

  // output are events
  @Output() roomSelected = new EventEmitter<RoomList>();

  selectRoom(room: RoomList) {
    this.roomSelected.emit(room);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnDestroy(): void {
    console.log('On destory is called');
  }
}
