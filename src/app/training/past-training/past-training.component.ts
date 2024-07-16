import { Subscription } from 'rxjs';
import { ExcerciseModel } from './../excercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'status'];
  dataSource = new MatTableDataSource<ExcerciseModel>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pastexcerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.getFinishedExcercise();
    this.pastexcerciseSubscription = this.trainingService.pastExcercise.subscribe(data=>{
      this.dataSource.data = data;
    })
   
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(){
    if(this.pastexcerciseSubscription) {
      this.pastexcerciseSubscription.unsubscribe();
    }  
  }

}
