# Micro Frontend Containers — Kurz Panel + IoT + Finance

This project demonstrates a **micro-frontend architecture** using **Module Federation with Vite**, composed of a host application (**Kurz Panel**) and two remotes (**IoT** and **Finance**), plus a mock **Auth API**.

![Architecture Diagram](./architecture.png)

## Overview

- **Host (kurz-panel)**: Admin panel, routing, authentication, RBAC
- **IoT (remote)**: Loggers (table + charts) and Map (Leaflet)
- **Finance (remote)**: Summary (KPIs) and Transactions (table)
- **Auth API**: Mock authentication via `json-server`

Each frontend is an **independent project**, using:
- Vite + React + TypeScript
- Module Federation (`@originjs/vite-plugin-federation`)
- pnpm workspaces (internal packages)
- TanStack Query + static JSON mocks

---

## Architecture

Browser → kurz-panel (host :5173) → iot (:5174), finance (:5175) → auth-api (:4000)

- Host loads remotes dynamically via `remoteEntry.js`
- Auth state is shared via federation (`authStore`)
- RBAC enforced at host + remote level

---

## Features

### Authentication & RBAC
- Login via `/login` (Auth API)
- Roles:
  - `admin` → full access
  - `iot-viewer` → `/iot/*`
  - `finance-viewer` → `/finance/*`
- Auth persisted in `localStorage`
- Shared Zustand store across apps

### IoT Remote
- Loggers table (TanStack Table)
- Charts (Recharts)
- Map (React Leaflet + OpenStreetMap)
- Mock data from `/public/mocks`

### Finance Remote
- KPI dashboard
- Transactions table with filters/sorting
- Lightweight (no charts)

---

## Project Structure

micro-fe-containers/
├── docker-compose.yml
├── auth-api/
├── kurz-panel/
├── iot/
└── finance/

Each frontend:

<project>/
├── src/
├── packages/
│   ├── core/
│   ├── ui/
│   └── modules/
├── vite.config.ts
├── package.json
└── pnpm-workspace.yaml

---

## Ports

| Service      | Port | URL |
|-------------|------|-----|
| kurz-panel  | 5173 | http://localhost:5173 |
| iot         | 5174 | http://localhost:5174 |
| finance     | 5175 | http://localhost:5175 |
| auth-api    | 4000 | http://localhost:4000 |

---

## Running the Project

### Build and start all services

docker compose up --build

### Open the app

http://localhost:5173

## Federation Setup

### Host (kurz-panel)
- Exposes:
  - `./authStore`
- Consumes:
  - `iot`
  - `finance`

### Remotes
- IoT exposes:
  - `LoggersPage`
  - `MapPage`
- Finance exposes:
  - `SummaryPage`
  - `TransactionsPage`
- Both consume:
  - `host/authStore`

## Tech Stack

- Vite + React 18 + TypeScript
- Module Federation
- TanStack Query + Table
- Zustand
- Recharts (IoT only)
- React Leaflet (IoT only)
- Docker + Docker Compose
