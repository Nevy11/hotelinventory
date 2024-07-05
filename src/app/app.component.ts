import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import {
  AsyncPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { RoomsService } from './rooms/services/rooms.service';
import { Subscription, catchError, filter, map, shareReplay } from 'rxjs';
import { InitService } from './init.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { ConfigService } from './services/config.service';
import { RouteConfigToken } from './services/routeConfig.service';

@Component({
  selector: 'hinv-root',
  standalone: true,
  imports: [
    AppNavComponent,
    HttpClientModule,
    DatePipe,
    AsyncPipe,
    JsonPipe,
    LowerCasePipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    LoggerService,
    // { provide: RouteConfigToken, useValue: { title: 'Home' } },
  ],
})
export class AppComponent implements OnInit /*AfterViewInit*/ {
  title = 'hotelinventoryapp';
  role = 'admin';
  stream$ = this.roomService.getPhotos().pipe(shareReplay(1));
  subscription!: Subscription;
  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Optional() private roomService: RoomsService,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  ngOnInit(): void {
    // this.router.events.subscribe((event) => console.log(event));
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => console.log('Navigation started'));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => console.log('Navigation Ended'));

    this.loggerService?.Log('App component is initialized');
    this.stream$.pipe(
      catchError((err) => {
        console.log('Error: ', err);
        return [];
      })
    );
    this.stream$.subscribe((x) => console.log(x));

    setTimeout(() => {
      // this.name.nativeElement.innerHTML = 'Hilton hotel';
      this.localStorage.setItem('name', 'Hilton Hotels');
      this.localStorage.setItem('location', 'Nyahururu');
    }, 0);
  }

  // Uncomment and implement if needed
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);

  //   // instance method is used to modify the components of the children
  //   componentRef.instance.numOfRooms = 50;
  // }
  // // view container ref helps us to dynamically render a template
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
}
