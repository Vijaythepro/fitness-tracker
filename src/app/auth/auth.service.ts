import { UiService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { AngularFireAuthModule } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private user: boolean;
    authChange = new Subject<boolean>();

    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private trainingServce: TrainingService,
        private snackBar: MatSnackBar,
        private uiService: UiService) { }

    registerUser(authData: AuthData) {
        this.uiService.loadingChange.next(true);
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.authChange.next(true);
                 this.user = true;
                this.router.navigate(['/training']);
                this.uiService.loadingChange.next(false);
            })
            .catch(error => {
                this.authChange.next(false);
                this.router.navigate(['/signup']);
                this.uiService.loadingChange.next(false);
                this.snackBar.open(error.message, null, { duration: 3000});
            })

    }

    login(authdata: AuthData) {
        this.uiService.loadingChange.next(true);
        this.afAuth.signInWithEmailAndPassword(authdata.email, authdata.password)
            .then(result => {
                this.authChange.next(true);
                this.user = true;
                this.router.navigate(['/training']);
                this.uiService.loadingChange.next(false);
            })
            .catch(error => {
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.uiService.loadingChange.next(false);
                this.snackBar.open(error.message, null, { duration: 3000});
            })

    }

    logOut() {
        this.afAuth.signOut();
        this.trainingServce.cancelSubscription()
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return this.user;
    }

    isAuth() {
        this.afAuth.authState.subscribe(userData =>{
           if(userData){
               return this.user = true;
           } else {
               return this.user = false;
           }
        })
    }
}