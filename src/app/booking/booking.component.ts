import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'hinv-booking',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  constructor(private configService: ConfigService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.fb.group({
      roomId: [''],
      guestEmail: [''],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: [''],
      guestAddress: [''],
      guestCity: [''],
      guestCountry: [''],
      guestZipCode: [''],
      guestCount: [''],
      guestList: [''],
    });
  }
}
