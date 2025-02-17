import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { map, of } from 'rxjs';
import { Budget } from 'data-models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    // URL zum Backend 
    baseUrl = 'http://localhost/api/';
    
    // nur Test-Daten; ersetzen später
    testData = [
      { id: 0, datum: '2025-02-10', beschreibung: 'Hallo', betrag: 30, typ: 'income' },
      { id: 1, datum: '2025-10-09', beschreibung: 'Hier', betrag: 100, typ: 'expense' }
    ];

    constructor(private http: HttpClient) {}
    
    // Funktion zum Holen der Datensätze aus der Datenbank
    getTransactions(){
      //return this.http.get(`${this.baseUrl}/list`).pipe(
      //  map((res: any) => {
      //    return res['data'];
      //  })
      //);
      return of(this.testData);
    }
  
    // Funktion zum Ändern des Datensatzes aus der Datenbank
    updateTransaction(transaction: Budget) {
      //return this.http.put(`${this.baseUrl}/update`, { data: transaction });
      const index = this.testData.findIndex(t => t.id === transaction.id);
      this.testData[index] = transaction;
      return of(transaction);
    }
    
    // Funktion zum Löschen des Datensatzes aus der Datenbank
    deleteTransaction(id: number) {
      //const params = new HttpParams().set('id', id.toString());
      //return this.http.delete(`${this.baseUrl}/delete`, { params: params });
      this.testData = this.testData.filter(t => t.id !== id);
      return of(this.testData.length);
    }
}
