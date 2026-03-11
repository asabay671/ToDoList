import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'card-media-size-example',
  standalone: true,
  templateUrl: 'card-media-size.component.html',
  imports: [CommonModule, MatCardModule, CardListComponent],
})
export class CardMediaSizeExample {}
