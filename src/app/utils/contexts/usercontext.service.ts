import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  userIdStoreField: string = "userId";

  constructor() { }

  clean() {
    window.sessionStorage.clear();
  }

  saveUserId(id: Number)
  {
    window.sessionStorage.setItem(this.userIdStoreField, id.toString());
  }

  getCurrentUserId()
  {
    const userId = window.sessionStorage.getItem(this.userIdStoreField);
    return userId === null ? null : Number(userId);
  }

  isLogged()
  {
    return this.getCurrentUserId() !== null;
  }
}
