import { Component, OnInit } from '@angular/core';
import { columns } from 'src/app/models/columns';
import { APIService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  columns = columns;
  logedIn!: boolean;

  cards!: Card[];
  constructor(private api: APIService, private router: Router) {}

  ngOnInit(): void {
     this.getAllCardsFromAPI();

     this.api.cardsChanged.subscribe((card) => {
       this.getAllCardsFromAPI();
     });
  }

  getAllCardsFromAPI() {
    this.api.getAllCards().subscribe((cards) => {
      if (!cards) {
        return;
      } else {
        this.cards = cards;
      }
    });
  }
}
