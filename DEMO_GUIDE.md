# Final Year Project Demo Guide

Follow these steps to set up and demonstrate the Accountill application on a new computer.

## Prerequisites

1.  **Install Docker Desktop**: Ensure Docker is installed and running on the demo machine.
    *   [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

2.  **Git**: Ensure Git is installed to clone the repository (or copy the project folder manually).

## Step-by-Step Demo Setup

### 1. Open Terminal
Open your terminal (Command Prompt, PowerShell, or Terminal on macOS).

### 2. Clone/Navigate to Project
Navigate to the project folder.
```bash
cd accountill
```

### 3. Start the Application
Run the following command to build and start the production environment. This sets up the Server, Client (React), and Database (MongoDB).

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```
*Note: If `docker-compose` command is not found, try `docker compose` instead.*

### 4. Wait for Initialization
Wait about 30-60 seconds for the containers to initialize and the server to start. You can check the status with:
```bash
docker ps
```
You should see 3 containers: `client`, `server`, and `MONGODB`.

### 5. Seed the Production Database
To populate the app with demo data (users, invoices, clients), run the seed script directly inside the running server container:

```bash
docker exec -it server npm run db:reseed
```

This will reset the database and create the following demo accounts:
*   **User 1**: `demo@accountill.test` / `Password123!`
*   **User 2**: `owner@acme.test` / `Password123!`

### 6. Open the Application
Open your web browser and navigate to:
[http://localhost](http://localhost)

Log in using the credentials above to show the dashboard and features.

## Cleanup (After Demo)
To stop the application and remove the containers:

```bash
docker-compose -f docker-compose.prod.yml down
```
