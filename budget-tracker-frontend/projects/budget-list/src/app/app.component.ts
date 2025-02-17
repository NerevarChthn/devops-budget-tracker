import { Component , OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Budget } from 'data-models';
import { BackendService } from './backend.service';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,
ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Budget-List';
  
  // Array enthält alle Transaktionen 
  transactions: Budget[] = [];

  constructor(private backendService: BackendService) {
    //eventuell ersetzen
     window.addEventListener('sendTransaction',((res: CustomEvent) => {
        this.transactions.push(res.detail.data)
     }) as EventListener);
  }
  
  // steuert die Intialisierung
  ngOnInit(): void {
    // hole die Transaktionsdatensätze aus der Datenbank
    this.getTransactions();
    // lade den Microservice
    this.loadRemote();
  }
   
  // suche nach dem Element placeHolder und gib den verknüpften Container zurück
  @ViewChild('placeHolder', { read: ViewContainerRef })
  // weise der Referenz eine Container-Instanz zu
  viewContainer!: ViewContainerRef;
   
  // Funktion zum dynamischen Laden des Microservice
  async loadRemote(): Promise<void> {
    const microservice = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4300/remoteEntry.js',
      exposedModule: './Component'
    });
    // initialisiere in dem Container die Komponente des Microservice
    this.viewContainer.createComponent(microservice.AppComponent);
  }
  
  // Funktion zum Holen der Transaktionsdatensätze
  getTransactions(): void{
    this.backendService.getTransactions().subscribe({
      next: (data: Budget[]) => {
        // eventuell verbessern // weise die geholten Datensätze dem Array zu
        this.transactions = data;
      },
      complete: () => {console.info('Holen der Daten war erfolgreich');},
      error: (e) => {console.error(e.message)}
  });
  }
  
  // Funktion zum Updaten des Transaktionsdatensatzes
  updateTransaction(id: number, date: string, beschreibung: string, betrag: number, typ: string): void {
    this.backendService
      .updateTransaction({ id: id, datum: date, beschreibung: beschreibung, betrag: betrag, typ: typ })
      .subscribe({
        complete: () => {
          console.info('Update war erfolgreich');
          // aktualisiere die Budget-Liste
          this.getTransactions(); 
        },
        error: (e) => (console.error(e.message))
      });
  }

  // Funktion zum Löschen des Transaktionsdatensatzes
  deleteTransaction(id: number): void {
    this.backendService.deleteTransaction(id).subscribe({
      complete: () => {
        console.info('Löschen war erfolgreich');
        // aktualisiere die Budget-Liste
        this.getTransactions(); 
      },
      error: (e) => (console.error(e.message))
    });
  }
}
