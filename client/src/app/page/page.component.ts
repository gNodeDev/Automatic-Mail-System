import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PageService } from '../service/page.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public token;
  public endPoint;
  public userId;
  public firstName;
  public lastName;
  public email;
  public address;

  updateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("token");
    this.endPoint = "/user/update?token=" + this.token;
    this.pageService.get(this.endPoint).subscribe(this.myGetObserver);
    this.updateForm = this.fb.group({
      first_name:[this.firstName, [Validators.required]],
      last_name: [this.lastName, [Validators.required]],
      email: [this.email, [Validators.required]],
      address: [this.address, [Validators.required]],
    });
  }

  myPostObserver = {
    next: (data) => {
      this.onSuccessToaster("Profile Successfully Updated.");
      this.onWarningToaster("Now You Won't Receive Emails");
      setTimeout(() => {
        this.router.navigate(['/user/thanks']);
      }, 3000);
    },
    error: (err) => {
      console.log("error", err);
      this.onErrorToaster(err['statusText']);
    }
  };

  myGetObserver = {
    next: (data) => {
      this.userId = data.data._id;
      this.firstName = data.data.first_name;
      this.lastName = data.data.last_name;
      this.email = data.data.email;
      this.address = data.data.address;
    },
    error: (err) => {
      console.log("error", err);
    }
  };

  // Submit
  onSubmit(value) {
    this.endPoint = "/user/update_details";
    console.log(this.endPoint);
    value._id = this.userId;
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
