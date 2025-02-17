import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Budget } from 'data-models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    // URL zum Backend
    baseUrl = 'http://localhost/api/';

    constructor(private http: HttpClient) {}

    // Funktion zum Speichern des erstellten Datensatzes in der Datenbank
    saveTransaction(transaction: Budget) {
      //return this.http.post(`${this.baseUrl}/save`, { data: transaction })
      const newId = 10;
      const newTransaction = { ...transaction, id: newId };
      return of(newTransaction);
    }
}