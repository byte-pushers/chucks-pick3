import { Component, OnInit } from '@angular/core';
import {Pick3DrawTimeCard} from '../../models/pick3-draw-time-card';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {CardContextService} from '../../services/card-context.service';
import {DrawTimeService} from '../../services/draw-time.service';

@Component({
  selector: 'app-view-picks-card',
  templateUrl: './view-picks-card.component.html',
  styleUrls: ['./view-picks-card.component.scss'],
})
export class ViewPicksCardComponent implements OnInit {
  public drawTimes: Array<Pick3DrawTimeCard> = [];
  public pick3StateLottery: Pick3StateLottery;
  private componentState;
  public generatedNumbers: any;
  generatedPicksArray: any[];
  private savedArray: any[];


  constructor(private cardContextService: CardContextService,
              private drawTimeService: DrawTimeService) {
  }

  ngOnInit() {
    this.retrieveNumbers();
    this.componentState = 'initializing';
    this.componentState = 'initialized';
  }


  public selectDrawingTimeCard(pick3DrawTimeCard: Pick3DrawTimeCard): void {
    this.drawTimes.forEach(drawTime => {
      if (drawTime.getDrawTime() !== pick3DrawTimeCard.getDrawTime()) {
        drawTime.setSelected(false);
      } else if (drawTime.getDrawTime() === pick3DrawTimeCard.getDrawTime()) {
        drawTime.setSelected(true);
        this.drawTimeService.setCurrentDrawTimeCard(drawTime);
      }
    });
  }

  private retrieveNumbers() {
    const generatedArray = this.drawTimeService.getCurrentDrawTimeCard().getPick3DrawTimeArray();
    const copiedArray = Object.assign([], generatedArray);
    const ArrayToBeSetToTable: any = [];
    for ( let i = 0; i < 12; i++){
      ArrayToBeSetToTable.push(copiedArray.splice(Math.floor(Math.random() * copiedArray.length), 1));
    }
    this.savedArray = Object.assign([], copiedArray);
    this.createTable(ArrayToBeSetToTable);
  }
  private createTable(ArrayToBeSetToTable) {
    const newArray = Object.assign([], ArrayToBeSetToTable);
    const myTableDiv = document.getElementById('myDynamicTable');
    const table = document.createElement('TABLE');
    const tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (let i = 0; i < 4; i++) {
      const tr = document.createElement('ion-row');
      tableBody.appendChild(tr);

      for (let j = 0; j < 3; j++) {
        const generatedNumber = newArray.slice(0, 1);
        const td = document.createElement('ion-col');
        td.appendChild(document.createTextNode(generatedNumber));
        tr.appendChild(td);
        newArray.splice(0, 1);
      }
    }
    myTableDiv.appendChild(table);
  }


}
