import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserContextService } from '../contexts/usercontext.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {

  constructor(private userContext: UserContextService){}

  canActivate(): boolean {

    if(this.userContext.isLogged()){
      return true;
    }

    return false;
  }
}
