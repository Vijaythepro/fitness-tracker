import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  loader = false;
  loadingSubscription: Subscription;
  constructor(private authService: AuthService,
              private uiService: UiService) { }

  ngOnInit(): void {
   this.loadingSubscription = this.uiService.loadingChange.subscribe(loading =>{
      this.loader = loading;
    });
  }

  onSubmitForm(f: NgForm) {
    this.authService.login({
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
