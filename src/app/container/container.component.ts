import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  ViewChild,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { requestInterceptor } from '../request.interceptor';

@Component({
  selector: 'hinv-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  //providers: [RoomsService],
})
export class ContainerComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'Rick';
  }
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor() {}
}
