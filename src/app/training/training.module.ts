import { TrainingRoutingModule } from './training-routing.module';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { MaterialModule } from './../material/material.module';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        PastTrainingComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        TrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TrainingRoutingModule
    ],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule{ }