import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, of, startWith } from 'rxjs';

interface RankedItem {
  rank: number;
  name: string;
  count: number;
}

@Component({
  selector: 'app-ranked-table',
  templateUrl: './ranked-table.component.html',
  styleUrls: ['./ranked-table.component.scss'],
  host: {
    class: 'flex-column',
  },
})
export class RankedTableComponent {
  @Input() public set items(items: RankedItem[]) {
    this.allItems.next(items);
  }
  @Input() public tableTitle: string = '';
  @Input() public countColumnLabel: string = 'Count';
  public displayedColumns = ['rank', 'name', 'count'];
  public filterText = new FormControl('');
  private allItems = new BehaviorSubject<RankedItem[]>([]);
  public filteredItems$ = combineLatest({
    items: this.allItems,
    filterText: of(this.filterText).pipe(startWith(new FormControl(''))),
  }).pipe(
    map(({ items, filterText: { value } }) => {
      if (!value) {
        return items;
      }
      return items.filter(({ name }) =>
        name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    })
  );
}
