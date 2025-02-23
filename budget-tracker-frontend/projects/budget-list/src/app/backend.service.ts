import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, of } from 'rxjs';
import { Budget } from 'data-models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // URL zum Backend 
  baseUrl = 'http://localhost';

  // nur Test-Daten; ersetzen später
  testData = [
    { id: 0, datum: '2025-02-10', beschreibung: 'Hallo', betrag: 30, typ: 'income' },
    { id: 1, datum: '2025-10-09', beschreibung: 'Hier', betrag: 100, typ: 'expense' }
  ];

  constructor(private http: HttpClient) { }

  // Funktion zum Holen der Datensätze aus der Datenbank
  getTransactions() {
    /*
    return this.http.get(`${this.baseUrl}/get-all.php`).pipe(
      map((res: any) => {
        if (res['state'] == 'success') {
          return res['data'];
        }
        else {
          res.error(res['data']);
        }
      }));
      */
    return of(this.testData);
  }

  // Funktion zum Ändern des Datensatzes aus der Datenbank
  updateTransaction(transaction: Budget) {
    /*
    return this.http.put(`${this.baseUrl}/`, { data: transaction }).pipe(
      map((res: any) => {
        if (res['state'] == 'error') {
          res.error(res['data']);
        }
      }));
      */
    const index = this.testData.findIndex(t => t.id === transaction.id);
    this.testData[index] = transaction;
    return of(transaction);
  }

  // Funktion zum Löschen des Datensatzes aus der Datenbank
  deleteTransaction(id: number) {
    /*
    return this.http.delete(`${this.baseUrl}/delete`, { data: id }).pipe(
      map((res: any) => {
        if (res['state'] == 'error') {
          res.error(res['data']);
        }
      }));
      */
    this.testData = this.testData.filter(t => t.id !== id);
    return of(this.testData.length);
  }
}
