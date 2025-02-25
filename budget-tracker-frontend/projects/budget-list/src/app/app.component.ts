import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Budget } from 'data-models';
import { BackendService } from './backend.service';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,
    ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Budget-List';
  // Array enthält alle Transaktionen 
  transactions: Budget[] = [];

  constructor(private backendService: BackendService) {
    //lausche auf Events von dem anderen Microservice
    window.addEventListener('refreshBudget', (() => {
       // hole die Transaktionsdatensätze aus der Datenbank
       this.getTransactions();
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
  getTransactions(): void {
    this.backendService.getTransactions().subscribe({
      next: (data: Budget[]) => {
        // weise die geholten Datensätze dem Array zu
        this.transactions = data;
        // berechne das Gesamtbudget
        this.getTotalBudget();
      },
      complete: () => { console.info('Holen der Daten war erfolgreich'); },
      error: (e) => { console.error(e.message) }
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

  // Funktion zum Berechnen des Gesamtbudgets
  getTotalBudget(): number{
     let budget:number = 0;
     this.transactions.forEach(transaction => {
       if(transaction.typ == "income"){
        budget += transaction.betrag;
       }
       else{
        budget -= transaction.betrag;
       }
     });
     return budget;
  }

  editMode: boolean = false;

toggleRowEdit(id: number, date: string, beschreibung: string, betrag: number, typ: string, event: Event): void {
  const button = event.currentTarget as HTMLElement;
  const row = button.closest('tr'); // Die Tabellenzeile ermitteln

  if (row) {
      // Hole alle relevanten Eingabefelder innerhalb der Zeile
      const inputs = row.querySelectorAll('input, select');

      // Explizite Typumwandlung auf HTMLInputElement oder HTMLSelectElement
      const formElements = Array.from(inputs) as (HTMLInputElement | HTMLSelectElement)[];

      // Prüfen, ob die erste Input-Zelle deaktiviert ist
      const isEditing = formElements[0] && !formElements[0].hasAttribute('disabled');

      if (isEditing) {
          // Speichern, wenn der Bearbeitungsmodus beendet wird
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

      // Inputs aktivieren oder deaktivieren
      formElements.forEach((element) => {
          if (isEditing) {
              element.setAttribute('disabled', 'true'); // Deaktivieren
          } else {
              element.removeAttribute('disabled'); // Aktivieren
          }
      });

      // Button-Icon wechseln
      const icon = button.querySelector('i');
      if (icon) {
          icon.classList.toggle('fa-pen', isEditing);
          icon.classList.toggle('fa-check', !isEditing);
          icon.classList.toggle('text-success', !isEditing);
          icon.classList.toggle('fa-lg', !isEditing);
      }
  }
}


}
