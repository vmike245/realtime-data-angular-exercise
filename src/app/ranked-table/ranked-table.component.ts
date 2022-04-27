import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranked-table',
  templateUrl: './ranked-table.component.html',
  styleUrls: ['./ranked-table.component.scss'],
})
export class RankedTableComponent {
  @Input() public contributors: {
    rank: number;
    name: string;
    count: number;
  }[] = [];
  @Input() public tableTitle: string = '';
  @Input() public countColumnLabel: string = 'Count';
  public displayedColumns = ['rank', 'name', 'count'];
}
