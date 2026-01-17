# Zephyr Chat Application

**Real-time Chat Application | React 19 + TSX Backend | Dockerized**

---

## Overview

WindTalk is a modern chat application built for real-time communication. It features:

- **Frontend:** React 19 with TypeScript
- **Backend:** Node.js with TypeScript (TSX)
- **Architecture:** Multi-container Docker setup
- **Purpose:** Showcase full-stack development skills and containerized deployment

This project is structured as a **monorepo**, making it easy to manage both frontend and backend in a single repository.

---

## Repo Structure

WindTalk/
├─ frontend/ # React 19 frontend
│ ├─ src/
│ ├─ package.json
│ └─ Dockerfile
├─ backend/ # TSX backend (Node.js + TypeScript)
│ ├─ src/
│ ├─ package.json
│ └─ Dockerfile
├─ docker-compose.yml # Multi-container orchestration
└─ README.md


---

## Features

- Real-time messaging between users
- User authentication and profile management
- Dockerized environment for easy setup
- Type-safe backend using TSX
- Modern React 19 frontend with hooks and context API

---

## Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Node.js (for local development, optional if using Docker)

---

### Running Locally with Docker

1. Clone the repo:
```bash
git clone https://github.com/<your-username>/WindTalk.git
cd WindTalk
