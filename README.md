# ShopSync - Unified Online Shopping Dashboard

A production-ready microservices-based dashboard to track online shopping orders, shipments, and spending across multiple platforms.
1
## Architecture

- **Microservices**: Auth, Order, Tracking, Analytics, Notification.
- **Frontend**: Next.js 13 + Tailwind CSS.
- **Database**: PostgreSQL + Redis.
- **Infrastructure**: Docker Compose (Local), Kubernetes (Production).

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (optional, for local run without docker)

### Running Locally (Docker Compose)
1. **Build and Start Services**:
   ```bash
   docker-compose up --build
   ```
2. **Access the Application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Auth Service: [http://localhost:3001](http://localhost:3001)
   - Order Service: [http://localhost:3002](http://localhost:3002)

### Features Implemented
- **Unified Dashboard**: View orders from Amazon (Mock) and others.
- **Microservices Setup**: Independent services for scalability.
- **Database**: Schemas for Users and Orders.
- **Mock Adapters**: Simulated Amazon integration.

## Kubernetes Deployment
Manifests are located in `infrastructure/k8s/`.
1. Apply database: `kubectl apply -f infrastructure/k8s/database.yaml`
2. Apply services: `kubectl apply -f infrastructure/k8s/auth-deployment.yaml` etc.

## Project Structure
- `/services`: Backend microservices.
- `/frontend`: Next.js web application.
- `/infrastructure`: Docker and K8s configs.
