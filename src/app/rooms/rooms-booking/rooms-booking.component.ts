import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.scss',
})
export class RoomsBookingComponent {
  constructor(private router: ActivatedRoute) {
    // this.id = this.router.snapshot.params['roomid'];
    this.id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));
    // this.router.paramMap.subscribe(params => {params.get('roomid')})
    //   this.id = params['roomid'];
    // });
  }
  id!: number;
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));
}
