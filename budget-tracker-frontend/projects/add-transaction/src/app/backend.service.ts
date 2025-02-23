import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { Budget } from 'data-models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  // Funktion zum Speichern des erstellten Datensatzes in der Datenbank
  saveTransaction(transaction: Budget) {
    /*
    return this.http.post('http://localhost/insert.php', { data: transaction }).pipe(
      map((res: any) => {
        if (res['state'] == 'error') {
           res.error(res['data']);
        }
      }));
      */
    const newId = 10;
    const newTransaction = { ...transaction, id: newId };
    return of(newTransaction);
  }
}