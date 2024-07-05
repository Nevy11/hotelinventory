import { Component, Optional, Self, SkipSelf } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { requestInterceptor } from '../request.interceptor';

@Component({
  selector: 'hinv-employee',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  // providers: [RoomsService],
  providers: [],
})
export class EmployeeComponent {
  empName: string = 'John';
  // constructor(@Optional() private roomsService: RoomsService) {}
}
