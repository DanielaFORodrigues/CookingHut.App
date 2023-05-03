import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Constants } from '../pipes/constant';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {

  constructor(){}

  canActivate(): boolean {

    if(Constants.userSession != undefined && Constants.userSession != null)
      return true;

    return false;
  }
}
