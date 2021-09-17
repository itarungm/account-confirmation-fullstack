import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  tokenKeyName: string = 'token'
  userNameKey: string = 'name'
  constructor() { }

  setToken(token){
    localStorage.setItem(this.tokenKeyName,token)
  }
  getToken(){
    return localStorage.getItem(this.tokenKeyName);
  }

  setUserName(userName){
    localStorage.setItem(this.userNameKey,userName);
  }
  getUserName(){
    return localStorage.getItem(this.userNameKey);
  }

  isLoggedIn(){
      return !jwtHelper.isTokenExpired(this.getToken())
  }
}
