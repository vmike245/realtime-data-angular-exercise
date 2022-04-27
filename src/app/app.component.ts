import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface WikiEdit {
  country: string;
  link: string;
  user: string;
  item: string;
  event: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private contributors: BehaviorSubject<Record<string, number>> =
    new BehaviorSubject({});
  private editedItems: BehaviorSubject<Record<string, number>> =
    new BehaviorSubject({});
  private convertObjectToRankedList(
    objectToConvert: BehaviorSubject<Record<string, number>>
  ): Observable<{ name: string; rank: number; count: number }[]> {
    return objectToConvert.pipe(
      map((contributors) => {
        return Object.entries(contributors).sort((a, b) => {
          if (a[1] < b[1]) {
            return 1;
          }
          if (a[1] > b[1]) {
            return -1;
          }
          return 0;
        });
      }),
      map((sortedEntries) => {
        let rank = 1;
        return sortedEntries.map(([entryName, count], index) => {
          if (index === 0) {
            return { name: entryName, count, rank };
          }
          if (sortedEntries[index - 1][1] > count) {
            rank = rank + 1;
          }
          return { name: entryName, count, rank };
        });
      })
    );
  }

  public contributorList$ = this.convertObjectToRankedList(this.contributors);
  public editedItemsList$ = this.convertObjectToRankedList(this.editedItems);
  constructor(private PubNub: PubNubAngular) {
    // Tracking wikipedia edits
    PubNub.init({
      subscribe_key: 'sub-c-b0d14910-0601-11e4-b703-02ee2ddab7fe',
      uuid: '8241356d-55c2-4c1a-8b62-2435fcdce677',
    });
  }
  ngOnInit() {
    this.PubNub.addListener({
      message: ({ message: { user, item } }: { message: WikiEdit }) => {
        const contributors = this.contributors.value;
        this.contributors.next({
          ...contributors,
          [user]: contributors[user] ? contributors[user] + 1 : 1,
        });

        const editedItems = this.editedItems.value;
        this.editedItems.next({
          ...editedItems,
          [item]: editedItems[item] ? editedItems[item] + 1 : 1,
        });
      },
    });
    this.PubNub.subscribe({
      channels: ['pubnub-wikipedia'],
    });
  }
}
