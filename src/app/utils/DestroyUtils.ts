import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

export class DestroyUtils implements OnDestroy {

  private _subscriptions:Subscription[]=[];

  constructor(){}

  set subscription(subscription:Subscription) {
    this._subscriptions.push(subscription);
  }

  ngOnDestroy() {
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

}
