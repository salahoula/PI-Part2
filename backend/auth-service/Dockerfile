# Étape 1 : Utilisation d'une image Node.js officielle
FROM node:18-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install --omit=dev

# Copie du reste des fichiers
COPY . .

# Exposition du port utilisé par l'application
EXPOSE 5000

# Démarrage du service
CMD ["npm", "start"]
