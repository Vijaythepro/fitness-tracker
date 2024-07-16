import { User } from './user.model';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGaurd implements CanActivate {
    constructor(private AuthService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.AuthService.getUser()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

}