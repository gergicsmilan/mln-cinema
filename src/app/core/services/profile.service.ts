import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  fetchOrders() {
    return this.httpClient
      .get<Order[]>(
        'https://mln-cinema-default-rtdb.firebaseio.com/tickets.json'
      )
      .pipe(
        map((orders) => {
          const ordersArray: Order[] = [];
          for (let key in orders) {
            ordersArray.push({ ...orders[key], id: key });
          }
          return ordersArray;
        })
      );
  }

  deleteOrder(orderId: string) {
    return this.httpClient.delete(
      'https://mln-cinema-default-rtdb.firebaseio.com/tickets/' +
        orderId +
        '.json'
    );
  }
}
