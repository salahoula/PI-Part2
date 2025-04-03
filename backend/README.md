# Application de Gestion de Produits - Architecture Microservices

Cette application est composée de trois microservices indépendants :

1. **Service d'Authentification** (Node.js/Express + MongoDB)
   - Gestion des utilisateurs
   - Authentification JWT
   - Autorisation basée sur les rôles

2. **Service de Catalogue** (Go/Fiber + PostgreSQL)
   - Gestion des produits
   - Recherche et affichage

3. **Service de Commandes** (Node.js/Express + MongoDB)
   - Gestion des commandes
   - Gestion du panier

## Prérequis

- Docker et Docker Compose
- Node.js (v18 ou supérieur)
- Go (v1.21 ou supérieur)

## Installation

1. Cloner le repository
2. Exécuter `docker-compose up --build`

## Services et Ports

- Service d'Authentification: http://localhost:3001
- Service de Catalogue: http://localhost:3002
- Service de Commandes: http://localhost:3003

## Documentation API

Chaque service dispose d'une documentation Swagger accessible via :
- Auth Service: http://localhost:3001/api-docs
- Catalog Service: http://localhost:3002/swagger
- Order Service: http://localhost:3003/api-docs

## Tests

Pour exécuter les tests de chaque service :

```bash
# Service d'Authentification
cd auth-service
npm test

# Service de Catalogue
cd catalog-service
go test ./...

# Service de Commandes
cd order-service
npm test
```
