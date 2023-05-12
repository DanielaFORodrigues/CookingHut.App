import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  userIdStoreField: string = "userId";

  constructor() { }

  clean() {
    window.localStorage.clear();
  }

  saveUserId(id: Number)
  {
    window.localStorage.setItem(this.userIdStoreField, id.toString());
  }

  getCurrentUserId()
  {
    const userId = window.localStorage.getItem(this.userIdStoreField);
    return userId === null ? null : Number(userId);
  }

  isLogged()
  {
    return this.getCurrentUserId() !== null;
  }
}
