import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() menuClick = new EventEmitter();
  isAuth = false;
  isAuthSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.authChange.subscribe(res => {
      this.isAuth = res;
    })
  }

  onToggleClick() {
    this.menuClick.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
