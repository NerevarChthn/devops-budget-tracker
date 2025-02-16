# DevOps Projekt
Budget Tracker Angular & PHP - Eine App zum Tracken von Eingaben und Ausgaben

## Aufbau - Frontend
- Framework-Angular
- zwei Microservices (Budget-List (Anzeigen von allen Transaktionen) und Add-Transaction (Hinzufügen von einer Transaktion))
- werden durch "Module Federation" verwaltet (Budget-List dient als "Host", der Add-Transaction lädt)

## Befehle für den Workspace:
- zum Starten von Add-Transaction: ``ng serve Add-Transaction``
- zum Starten von Budget-List: ``ng serve Budget-List``
