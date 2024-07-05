import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { LoginComponent } from './login/login.component';
import path from 'path';
import { BookingComponent } from './booking/booking.component';
import { LoginGuard } from './guards/login.guard';
import { RoomGuard } from './rooms/guards/room.guard';
// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'employee', component: EmployeeComponent },

//   {
//     path: 'rooms',
//     component: RoomsComponent,
//     children: [
//       { path: 'add', component: RoomsAddComponent },
//       { path: ':roomid', component: RoomsBookingComponent },
//     ],
//   },

//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: '**', component: NotfoundComponent },
// ];

// export const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'add',
//         component: RoomsAddComponent,
//       },
//       {
//         path: ':roomid',
//         component: RoomsBookingComponent,
//       },
//     ],
//   },
// ];

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'employee',
    component: EmployeeComponent /*canActivate: [LoginGuard] */,
  },

  {
    path: 'rooms',
    component: RoomsComponent,
    loadChildren: () => [
      { path: 'add', component: RoomsAddComponent },
      { path: ':roomid', component: RoomsBookingComponent },
    ],
    // canActivate: [LoginGuard],
    // canActivateChild: [RoomGuard],
  },
  {
    path: 'booking',
    component: BookingComponent,
    // canActivate: [LoginGuard],
  },

  { path: '**', component: NotfoundComponent },
];
