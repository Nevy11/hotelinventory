import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class RoomGuard implements CanActivateChild {
  constructor(private loginService: LoginService) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.loginService.isAdmin;
  }
}
