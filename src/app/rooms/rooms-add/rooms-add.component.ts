import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RoomList } from '../rooms';
import { JsonPipe, NgIf } from '@angular/common';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  standalone: true,
  imports: [FormsModule, JsonPipe, NgIf],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss',
})
export class RoomsAddComponent {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkintime: new Date(),
    checkouttime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  successMessage: string = '';
  addRoom(roomsForm: NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room Added successfully';
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        checkintime: new Date(),
        checkouttime: new Date(),
        photos: '',
        price: 3,
        rating: 3,
      });
    });
  }

  constructor(private roomsService: RoomsService) {}
}
