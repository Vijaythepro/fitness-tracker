import { UiService } from './../shared/ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnDestroy } from '@angular/core';
import { ExcerciseModel } from './excercise.model';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanged = new Subject<ExcerciseModel>();
  updateExcercise = new Subject<ExcerciseModel[]>();
  //pastExcercise: ExcerciseModel[] = [];
  pastExcercise = new Subject<ExcerciseModel[]>();
  findExcercise: ExcerciseModel;
  dbSubscription = [];
 // availableExcercise: ExcerciseModel[] = [];
  availableExcercise = [{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }]


  constructor(private db: AngularFirestore, private uiService: UiService) { }

  fetchAvailableExcercie() {
    this.uiService.loadingChange.next(true);
    this.dbSubscription.push(this.db
      .collection('availableExcercise')
      .snapshotChanges()
      .pipe(
      map(docArray => {
        return docArray.map(doc => {
          const data: any = doc.payload.doc.data();
          return {
            id: doc.payload.doc.id,
            name: data.name,
            calories: data['calories '],
            duration: data['duration ']
          }
        })
      })
      ).subscribe(excercises => {
        this.availableExcercise = excercises;
        this.updateExcercise.next(excercises);
        this.uiService.loadingChange.next(false);
      }));
  }

  getSelectedExcercise(selectedId: string) {
    this.findExcercise = this.availableExcercise.find(data => data.id == selectedId);
    this.excerciseChanged.next({ ...this.findExcercise });
  }

  cancelExcercise(progress) {
    this.addDataToDatabase(
      {
        ...this.findExcercise,
        status: 'cancelled',
        date: new Date(),
        duration: this.findExcercise.duration * (progress / 100),
        calories: this.findExcercise.calories * (progress / 100)
      })
    this.excerciseChanged.next(null);
    this.findExcercise = null
  }

  compeletExcercise() {
    this.addDataToDatabase(
      {
        ...this.findExcercise,
        status: 'completed',
        date: new Date()
      })
    this.excerciseChanged.next(null);
    this.findExcercise = null
  }

  private addDataToDatabase(excercise: ExcerciseModel) {
    const temp = {
      ...excercise,
      date: excercise.date.toISOString(),
    };
    this.db.collection('finishedExcercises').add(temp);
  }

  getFinishedExcercise() {
    this.dbSubscription.push(this.db.collection('finishedExcercises').valueChanges()
      .subscribe((res: ExcerciseModel[]) => {
        this.pastExcercise.next(res);
      }));
  }

  cancelSubscription(){
    this.dbSubscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
