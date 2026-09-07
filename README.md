<div align="center">
  <img src="./public/images/Logo.png" alt="Club Forum Logo" width="120" height="120"/>

# Club Forum Website

Die offizielle Website des **Club Forum** – Events, Location & Community!

[![GitHub Repo](https://img.shields.io/badge/GitHub-ClubForumWebsite-181717?logo=github)](https://github.com/MichaelBergdolt/ClubForumWebsite)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?logo=react)](https://ui.shadcn.com/)
[![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php)](https://www.php.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📌 Projektübersicht

Die **Club Forum Website** dient als digitale Präsenz unserer Event-Community.
Hier finden Besucher **Informationen über unsere Location**, **aktuelle Events** und **Kontaktmöglichkeiten**.

**Ziele der Website:**

* Bewerben von Veranstaltungen
* Vorstellung der Location
* Bereitstellen von Kontaktmöglichkeiten
* Einfache, mobile-optimierte Navigation

---

## 🚀 Features

* 📜 **Eventübersicht** – Präsentation der kommenden Veranstaltungen
* 🏩️ **Location Showcase** – Galerie und Informationen
* 📩 **Kontaktformular** – Einfache Anfragen & Buchungen
* 📱 **Responsive Design** – Optimiert für alle Bildschirmgrößen
* ⚡ **Schnelle Ladezeiten** – Dank **Vite** und optimierter Bundles
* 🎨 **Modernes UI** – Mit **Tailwind CSS** und **shadcn/ui** gebaut

---

## 🛠️ Tech Stack

| Technologie          | Beschreibung                            | Link                                                  |
| -------------------- | --------------------------------------- | ----------------------------------------------------- |
| **Vite**             | Lightning-fast Build Tool & Dev Server  | [vitejs.dev](https://vitejs.dev/)                     |
| **React**            | UI-Library für modulare Komponenten     | [react.dev](https://react.dev/)                       |
| **TypeScript**       | Statische Typisierung für besseren Code | [typescriptlang.org](https://www.typescriptlang.org/) |
| **Tailwind CSS**     | Utility-First CSS Framework             | [tailwindcss.com](https://tailwindcss.com/)           |
| **shadcn/ui**        | UI-Komponentenbibliothek für React      | [ui.shadcn.com](https://ui.shadcn.com/)               |
| **PHP**               | Backend-API (Kalender, Kontaktformular) | [php.net](https://www.php.net/)                        |
| **Google Calendar API** | Verfügbarkeits- & Terminabgleich      | [developers.google.com](https://developers.google.com/calendar) |

---

## ⚙️ Installation & Setup

> **Voraussetzung**: [Node.js](https://nodejs.org/) **>=18**, npm sowie **PHP >=8.1** mit [Composer](https://getcomposer.org/) müssen installiert sein.

```bash
# Repository klonen
git clone https://github.com/MichaelBergdolt/ClubForumWebsite.git
cd ClubForumWebsite

# Abhängigkeiten installieren (Frontend + Root)
npm install

# Backend-Abhängigkeiten installieren
cd backend && composer install && cd ..

# .env-Dateien anlegen (siehe backend/.env.example)
cp backend/.env.example backend/.env

# Frontend + Backend gemeinsam im Dev-Modus starten
npm run dev
```

Die Website läuft nun unter **[http://localhost:8080](http://localhost:8080)**, das Backend unter **[http://localhost:8000](http://localhost:8000)**.

Für den Kalender-Abgleich wird zusätzlich ein Google Service Account benötigt (`backend/service-account.json`, siehe `backend/service-account.example.json`) sowie die zugehörigen Kalender-IDs in `CALENDAR_IDS` in der `.env`.

---

## 📂 Projektstruktur

```plaintext
.
├── frontend/             # React + Vite Frontend
│   ├── public/           # Statische Assets (Bilder, Icons, Fonts)
│   └── src/
│       ├── components/   # Wiederverwendbare UI-Komponenten
│       ├── pages/        # Hauptseiten der Website
│       ├── hooks/        # Custom Hooks
│       ├── lib/          # Hilfsfunktionen
│       ├── main.tsx      # Einstiegspunkt der App
│       └── App.tsx       # Hauptrender-Komponente
├── backend/              # PHP-API (Kalender, Kontaktformular)
│   ├── routes/           # Endpunkte (calendar, contact)
│   ├── src/Calendar/     # Google-Calendar-Integration
│   ├── config.php        # App-Konfiguration
│   └── bootstrap.php     # Env-/CORS-/Error-Setup
├── .github/workflows/    # CI/CD (GitHub Actions)
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Deployment

Deployment erfolgt automatisiert über **GitHub Actions**:

* Push auf `dev` → Build & Deploy auf die Preview-Umgebung
* Push auf `main` → Build & Deploy auf die Production-Umgebung

Frontend und Backend werden gebaut und per SSH auf den Server (Netcup) übertragen (siehe `.github/workflows/`).

---

## 📬 Kontakt

📧 **E-Mail:** [kontakt@club-forum-bb.de](mailto:kontakt@club-forum-bb.de)

---

## 📄 Lizenz

Der **Quellcode** dieses Projekts steht unter der [MIT-Lizenz](./LICENSE).

**Ausgenommen davon sind alle Bilder, Logos und sonstigen Markeninhalte** (u. a. in `frontend/public/images/`) sowie der Vereinsname "Club Forum". Diese sind urheberrechtlich geschützt und dürfen **nicht** ohne ausdrückliche Genehmigung verwendet werden.
