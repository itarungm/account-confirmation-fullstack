import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private router: Router, private _authenticationService: AuthenticationService) {
    console.log(this.router.url)
   }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.data['token']);
    this.verifyEmail();
  }

  verifyEmail(){
    this._authenticationService.verifyEmail(this.router.url?.split('/')[this.router.url?.split('/').length-1]).subscribe((res)=>{
      if(res.success){
        console.log(res);
        this.showConfirmationBox();
      }else{
        this.showErrorBox(res.message)
      }
    })
  }

  showConfirmationBox(){
    Swal.fire({
      title:"Voila! You are great.",
      icon:"success",
      text:'Email Verified. We are redirecting you to Login Page!',
      timer:6000,
      timerProgressBar: true,
      allowOutsideClick: false,
      confirmButtonText:"Lets Login"
    }).then(()=>{
      this.router.navigate(['']);
    })

  }

  showErrorBox(message){
    Swal.fire({
      title:message,
      icon:'error',
      timer:5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      confirmButtonText:"Okay, Close !"
    }).then(()=>{
      this.router.navigate(['']);
    })
  }

}
