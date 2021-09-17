import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Register } from 'src/app/models/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-sign-in.component.html',
  styleUrls: ['./sign-up-sign-in.component.scss']
})
export class SignUpComponent implements OnInit {
  activeSignUpForm: boolean = false;
  signUpform: FormGroup;
  loginForm: FormGroup;
  loader: boolean;
  constructor(private _commonService: CommonService,private fb: FormBuilder,private router: Router , private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    
    this.signUpform = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['',[Validators.required, Validators.pattern('^(?=.{10}).*$')]],
      dob: [''],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })

    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    })
  }

  onToggleView(){
    this.activeSignUpForm = !this.activeSignUpForm;
  }

  onSignUp(){
    //TODO: Need Password Encryption
    console.log(this.signUpform.controls);
    this.signUpform.markAllAsTouched();
    if(this.signUpform.invalid) return;
    let currentUrl = document.location.href;
    let redirectUrlAfterEmailVerification = 'http://'+currentUrl.split('/')[2] +'/verify-email/'
    const signUpDetails: Register = this.signUpform.value;
    signUpDetails.url = redirectUrlAfterEmailVerification;
    this.loader = true;
    this._authenticationService.register(this.signUpform.value as Register).subscribe((res)=>{
      this.loader = false;
      if(res.success){
        this.showConfirmationBox();
      }else{
        this.showErrorBox(res.message);
      }
    })
  }

  onLogin(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return;

    this.loader = true;
    this._authenticationService.login(this.loginForm.value as Login).subscribe((res)=>{
      this.loader = false;
      if(res.success){
        this._commonService.setToken(res.token)
        this._commonService.setUserName(res.response)
        this.router.navigate(['/dashboard'])
      }else{
        this.showErrorBox(res.message);
      }
    })
  }

  showConfirmationBox(){
    Swal.fire({
      title:"Alert",
      icon:"success",
      text:`Verification Mail Sent to ${this.signUpform.value.email}`,
      timer:4000,
      timerProgressBar: true,
      allowOutsideClick: false,
      confirmButtonText:"Lets Login"
    }).then(()=>{
      this.signUpform.reset();
      this.activeSignUpForm =false;
    })

  }

  showErrorBox(message){
    Swal.fire({
      title:message,
      icon:'error',
      timer:3000,
      timerProgressBar: true,
      allowOutsideClick: true,
      confirmButtonText:"Lets Try Again"
    }).then(()=>{

    })
  }

}
