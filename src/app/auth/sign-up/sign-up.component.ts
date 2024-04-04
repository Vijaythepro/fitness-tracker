import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  loader = false;
  loadingSubscription: Subscription;
  constructor(private authService: AuthService,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingChange.subscribe(loading => {
      this.loader = loading;
    });
  }

  onSubmitForm(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }

  ngOnDestroy() {
    if(this.loadingSubscription) {
        this.loadingSubscription.unsubscribe();
    }
  }
  
}
