# DevOps Projekt
Budget Tracker Angular & PHP - Eine App zum Tracken von Eingaben und Ausgaben

## Aufbau - Frontend
- Framework-Angular
- zwei Microservices (Budget-List (Anzeigen von allen Transaktionen) und Add-Transaction (Hinzufügen von einer Transaktion))
- werden durch "Module Federation" verwaltet (Budget-List dient als "Host", der Add-Transaction lädt)
- beide Microservices teilen sich die Lib "data-models"

## Build-Prozess (Befehle für den Workspace):
1. Compilieren der Lib: ``ng build data-models``
2. Starten von Add-Transaction: ``ng serve Add-Transaction``
3. Starten von Budget-List: ``ng serve Budget-List``
