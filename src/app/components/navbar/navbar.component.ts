import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isLogin:boolean=false
  constructor(private _Router:Router ,private _AuthService:AuthService) {
    if(_AuthService.currentUser!=null)
    {
      this.isLogin=true
    }
    else
    {
      this.isLogin=false;
    }
    
   }
   isLoggedIn(){
    return !!localStorage.getItem('TOKEN');
   }

   logout(){
    localStorage.clear();
    this._Router.navigate(['/signin'])
   }

  ngOnInit(): void {
  }

}
