import { Component, OnInit } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BingoBoardAssignment';
  randomNumbers: number[] = [];
  timerSubscription = new Subscription;
  random = 0;
  matrix: any[] = [];
  randomNumber = 0;
  check = 0;

  ngOnInit() {
    this.makeMatrix();
  }

  generateNumber() {
    this.random = this.random_int(1, 75);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  startGame() {
    this.check = 0;
    this.timerSubscription = timer(0, 50).pipe(
      map(() => {
        this.generateNumber();
        const data = document.getElementById(this.random.toString());
        if (data && !data.classList.contains('checked')) {
          data.classList.add('checked');
          this.check++;
          console.log(this.check)
          if (this.check === 25) {
            this.refreshGame();
            this.timerSubscription.unsubscribe();
            this.random = 0;
          }
        }
      })
    ).subscribe();
  }

  refreshGame() {
    this.check = 0;
    this.matrix = [];
    this.makeMatrix();
    this.timerSubscription.unsubscribe();
    this.random = 0;
  }

  random_int(Min: number, Max: number) {
    return Math.floor((Math.random() * (Max - Min)) + Min);
  }

  makeMatrix() {
    let column: any[] = [];
    let previousNumber: any[] = [];
    for (let j = 1; j < 6; j++) {
      for (let i = 1; i < 6; i++) {
        this.preventRedundantNumber(j, previousNumber);
        column.push(this.randomNumber);
      }
      this.matrix.push(column)
      column = [];
    }
  }

  preventRedundantNumber(j: number, previousNumber: any[]) {
    this.randomNumber = this.random_int(((j * 15) - (15 - 1)), (j * 15));
    const find = previousNumber.find(x => x === this.randomNumber);
    if (!find) {
      previousNumber.push(this.randomNumber);
    } else {
      this.preventRedundantNumber(j, previousNumber);
    }
  }
}
