import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare var $:any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isClicked=false;
  responceMessage=""; 
  isError=false
  isErrorMessage=""
  constructor(private _AuthService:AuthService, private _Router:Router) {
    
   }
   

  loginForm =new FormGroup({
    email:new FormControl(null , [Validators.email ,Validators.required]),
    password:new FormControl(null, [ Validators.required] )

  });


  submitLoginForm(){
   
    this.isClicked=true;
        if(this.loginForm.valid){
            this._AuthService.signIn(this.loginForm.value).subscribe(response=>{
              if(response.message=='success')
              {
                this._Router.navigate(['/profile'])
                localStorage.setItem("TOKEN",response.token)
                this._AuthService.saveCurrentUser(); 
              }
              else{
                this.isErrorMessage=response.message;
                this.isError=true
    
              } 
              
            
              })
        }
    
      }
  ngOnInit() {
    $('#signIn').particleground();
  }

}
