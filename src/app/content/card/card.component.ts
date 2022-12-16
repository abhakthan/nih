import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  public user: any;

  @Output()
  public remove = new EventEmitter();

  /**
   * Delete item from the list
   * @param user selected item
   */
  public delete(item: any) {
    this.remove.emit(item);
  }
}
