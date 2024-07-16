import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingTraining = false;
  onGoingTrainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.onGoingTrainingSubscription = this.trainingService.excerciseChanged.subscribe(
      data =>{
        if(data){
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      }
    )
  }

  ngOnDestroy() {
    if(this.onGoingTrainingSubscription) {
      this.onGoingTrainingSubscription.unsubscribe();
    }
  }
  
}
