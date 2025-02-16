# Base image
FROM node:18 AS builder

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package.json und package-lock.json kopieren und Dependencies installieren
COPY package*.json ./
RUN npm install

# Restliche Projektdateien kopieren
COPY . .

# Angular App builden
RUN npm run build --prod

# Nginx als Webserver nutzen
FROM nginx:alpine

# Angular Build ins Nginx-Verzeichnis kopieren
COPY --from=builder /app/dist/budget-tracker-frontend/browser /usr/share/nginx/html

# Nginx-Ports freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]
