import { UiService } from './../../shared/ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { ExcerciseModel } from './../excercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

   trainingAvailable: ExcerciseModel[] = [];
   trainingSubscription: Subscription;
   loadingSubscription: Subscription;
   loader = false;
   //trainingAvailable: Observable<ExcerciseModel[]>;
  @ViewChild('currentTraining') currentExcercise;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.loadingSubscription =this.uiService.loadingChange.subscribe(isLoading => {
      this.loader = isLoading;
    })
    //this.trainingService.fetchAvailableExcercie();
   // this.trainingSubscription = this.trainingService.updateExcercise.subscribe(data => {

      //fix firestore , now im doing with mockup
      //this.trainingAvailable = data;
      
   // });
    //this line is mockup data
    this.trainingAvailable = this.trainingService.availableExcercise;
  }

  onStart() {
    this.trainingService.getSelectedExcercise(this.currentExcercise.value);
  }

  ngOnDestroy() {
    if(this.trainingSubscription) {
      this.trainingSubscription.unsubscribe();
    }
    if(this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }    
  }
  
}
