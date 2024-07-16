import { TrainingService } from './../training.service';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  progressLevel: number;

  constructor(private dailog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.timer();
  }

  timer() {
    const step = this.trainingService.findExcercise.duration / 100 * 1000;
    this.progressLevel = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.compeletExcercise();
        clearInterval(this.progressLevel)
      }
    }, step)

  }

  onStop() {
    clearInterval(this.progressLevel);
    const dailogRef = this.dailog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dailogRef.afterClosed().subscribe(
      result => {
        if (result) {
         this.trainingService.cancelExcercise(this.progress);
        } else {
          this.timer();
        }
      }
    );

  }

}
