import { AuthGaurd } from './../auth/auth-guard';
import { TrainingComponent } from './training.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'training', component: TrainingComponent, canActivate: [AuthGaurd] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [AuthGaurd]
})

export class TrainingRoutingModule {}