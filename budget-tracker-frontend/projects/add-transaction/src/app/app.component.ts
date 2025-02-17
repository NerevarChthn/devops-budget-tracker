import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Budget } from 'data-models';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Add-Transaction';

  profileForm = new FormGroup({
    id: new FormControl(0),
    datum: new FormControl(''),
    beschreibung: new FormControl(''),
    betrag: new FormControl(0),
    typ: new FormControl(''),
  });

  transaction: Budget = { id: 0, datum: '', beschreibung: '', betrag: 0, typ: ''};

  constructor(private backendService: BackendService) {}

  addTransaction() {
    this.backendService.saveTransaction(this.transaction).subscribe({
      next: (res: any) => {
        //durch ein Event ersetzen, wenn Server und Datenbank stehen
        const sendTransaction = new CustomEvent('sendTransaction', {
          detail: {data: res}});
        //löse das Event aus
        window.dispatchEvent(sendTransaction);
        //setze das Formular für eine neue Eingabe zurück
        this.profileForm.reset();
      },
      complete: () => {console.info('Erstellen war erfolgreich');},
      error: (e) => (console.error(e.message))
   });
  }
}
