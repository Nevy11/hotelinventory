import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'process';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  config: any;

  constructor(private http: HttpClient) {}

  init() {
    // return this.http
    //   .get('src/assets/config.json')
    //   .pipe(tap((config) => (this.config = config)));
  }
}
