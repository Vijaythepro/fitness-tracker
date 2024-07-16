import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  @Output() sideNavClick = new EventEmitter();
  isAuth = false; 
  isAuthSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.authChange.subscribe(res=> {
      this.isAuth = res
    })
  }

  onToggleClick() {
    this.sideNavClick.emit();
  }

  onLogout() {
    this.onToggleClick();
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }

}
