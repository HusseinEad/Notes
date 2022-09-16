import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  baseURL='https://routeegypt.herokuapp.com/';
  constructor(private _HttpClient:HttpClient ) { }
  currentUser=null;
  
  saveCurrentUser(){
    let token:any=localStorage.getItem('TOKEN')
    this.currentUser=jwtDecode(token) 
    console.log(this.currentUser);
    
  }



  signUp(data:any):Observable<any>{
  return  this._HttpClient.post(this.baseURL+'signup',data)
  }
  signIn(data:any):Observable<any>{
   return this._HttpClient.post(this.baseURL+'signin',data)
  }

  signOut(data:any):Observable<any>{
   return this._HttpClient.post(this.baseURL+'signOut',data)
  }
  isLoggedIn(){
   return !!localStorage.getItem('TOKEN');
  }
}

