import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { AuthService } from 'src/app/Services/auth.service';

declare var $:any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  isClicked=false;
  responceMessage=""; 
  isError=false
  isErrorMessage=""
  isSuccess=false;
  constructor(private _AuthService:AuthService) { }


  registerForm =new FormGroup({
    first_name:new FormControl(null , [Validators.minLength(3), Validators.maxLength(10) , Validators.required]),
    last_name:new FormControl(null , [Validators.minLength(3), Validators.maxLength(10) , Validators.required ]),
    age:new FormControl(null , [Validators.required ,Validators.min(16) , Validators.max(70)]),
    email:new FormControl(null , [Validators.email ,Validators.required ,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
    password:new FormControl(null, [ Validators.required ,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')] )
  });


  submitRegisterForm(){
   
this.isClicked=true;
    if(this.registerForm.valid){
        this._AuthService.signUp(this.registerForm.value).subscribe(response=>{
          if(response.message=='success')
          {
            this.isClicked=false;
            this.responceMessage=response.message;
            this.isSuccess=true
            this.isError=false
            this.registerForm.reset();
          }
          else{
            this.isErrorMessage=response.errors.email.message;
            this.isError=true
            this.isSuccess=false
            this.registerForm.reset();

          } 
          
        
          console.log(response)})
    }

  }


  ngOnInit(): void {
    $('#signUp').particleground();

  }

}
