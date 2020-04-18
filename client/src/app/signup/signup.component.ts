import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PageService } from '../service/page.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public endPoint;
  signup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private toastr: ToastrService,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.signup = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  myPostObserver = {
    next: (data) => {
      this.onSuccessToaster("Registered Successfully. Please Check Inbox");
      // Make Blank Fields after registration Using ngModel 1 way binding
    },
    error: (err) => {
      console.log("error", err);
      this.onErrorToaster(err['statusText']);
    }
  };

  // Submit
  onSubmit(value) {
    this.endPoint = "/user/register"; 
    this.pageService.post(value, this.endPoint).subscribe(this.myPostObserver);
  }

  // Success Toaster
  onSuccessToaster(message: any) {
    this.toastr.success(message);
  }

  // Error Toaster
  onErrorToaster(message: any) {
    this.toastr.error(message);
  }

  // Warning Toaster
  onWarningToaster(message: any) {
    this.toastr.warning(message);
  }


}
