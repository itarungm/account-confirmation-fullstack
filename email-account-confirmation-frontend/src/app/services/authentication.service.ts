import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login, Register, Responsev2 } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  register(credentials: Register){
    return this.http.post<Responsev2>(`api/user/register`,credentials)
  }

  login(credentials: Login){
    return this.http.post<Responsev2>(`api/user/login`,credentials)
  }

  verifyEmail(token: string){
    return this.http.post<Responsev2>(`api/user/verifyemail`,{token})
  }
}
