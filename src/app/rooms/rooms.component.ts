import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Self,
  ViewChild,
  ViewChildren,
  viewChild,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpEventType,
} from '@angular/common/http';
import { requestInterceptor } from '../request.interceptor';
import { RouterLink, RouterModule } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { RouteConfigToken } from '../services/routeConfig.service';

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  imports: [
    NgIf,
    NgFor,
    SlicePipe,
    NgClass,
    NgStyle,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    LowerCasePipe,
    UpperCasePipe,
    SlicePipe,
    DecimalPipe,
    RoomsListComponent,
    JsonPipe,
    HeaderComponent,
    HttpClientModule,
    AsyncPipe,
    RouterModule,
    RouterLink,
  ],
  providers: [
    RoomsService,
    { provide: RouteConfigToken, useValue: { title: 'title' } },
  ],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName = 'Paradise';

  numOfRooms = 10;
  hideRooms = true;
  totalBytes = 0;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 0,
    bookedRooms: 5,
  };

  title = 'Room List';

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  constructor(
    @Optional() private roomsService: RoomsService,
    private configService: ConfigService
  ) {}
  /*
  in pull architecture
  getdata() -> addData -> getData
*/
  ngOnInit(): void {
    // we use rxjs' push architecture
    // getdata => stream of data => addData

    /*this.roomsService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
    });*/

    // console.log(this.headerComponent)

    this.stream.subscribe((data) => {
      console.log(data);
    });

    // this.stream.subscribe((data) => console.log(data));
    // this.stream.subscribe((data) => console.log(data));

    console.log('Values of subscribe keyword');
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed'),
      error: (err) => console.log(err),
    });
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Successfully');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });
  }

  roomList: RoomList[] = [];

  selectRoom(room: RoomList) {
    // console.log(room);
    // this.selectedRoom = room;
    // this.roomList.push(room);
  }

  selectedRoom!: RoomList;

  addRoom() {
    const room: RoomList = {
      roomNumber: '5',
      roomType: 'Notts',
      amenities: 'Lighter',
      price: 5000,
      photos: '/media/nevy11/samma_rs/vid/entertainment',
      checkintime: new Date('11-Nov-2003'),
      checkouttime: new Date('12-Nov-2003'),
      rating: 2.7,
    };
    // we are making the room list to be mutable here
    // this.roomList.push(room)
    // won't work even in state management technique
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
    // this.roomList = [...this.roomList, room]; // taking the existing data and extending it
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  @ViewChild(HeaderComponent, { static: true })
  headerComponent!: HeaderComponent;

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
    this.headerChildrenComponent.last.title = 'Last Header';
    // this.headerChildrenComponent.get(0)?.title
  }

  ngAfterViewChecked(): void {}

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  // Dependancy injection: class based dependancy
  // roomService = new RoomsService() // instance

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete(); // end of the stream of data
  });

  // this.roomService.addRoom(room).subscribe(data => {})

  editRoom() {
    const room: RoomList = {
      // roomNumber: '3',
      roomType: 'Notts',
      amenities: 'Lighter',
      price: 5000,
      photos: '/media/nevy11/samma_rs/vid/entertainment',
      checkintime: new Date('11-Nov-2003'),
      checkouttime: new Date('12-Nov-2003'),
      rating: 2.7,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }
  error: string = '';

  subscription!: Subscription;

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  room$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));
}
