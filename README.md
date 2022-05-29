# PIIQUANTE
Projet n°6 du parcours développeur web chez OpenClassrooms

## Contexte
Développement d'une application web nommée "Piquante" dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres utilisateurs.  
Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni.

## Objectifs et compétences évaluées
Développement Backend en Javascript

- Serveur **Node.js**
- Framework **Express**
- Base de données **MongoDB**
    - Hébergement sur MongoDB Atlas
    - Opérations relatives à la BDD réalisées avec mongoose
- **API REST**
- Sécurité **OWASP** et **RGPD**

## Mesures de sécurité mises en place

- Hashage du mot de passe utilisateur avec **bcrypt**
- Cryptage des emails utilisateurs dans la base de données avec **crypto-js**
- Manupulation sécurisée de la base de donnée avec **mongoose**
- Vérification que l'email utilisateur soit unique dans la base de données avec **mongoose-unique-validator**
- Utilisation de variables d'environnement pour les données sensibles avec **dotenv**
- Authentification de l'utilisateur par token avec **jsonwebtoken**
- Protection des headers avec **helmet**

## Pour tester l'application

1. **Cloner le projet dans un dossier "backend" :**

git clone https://github.com/Alexandre-Meurot/AlexandreMeurot_6_03052022.git backend

2. **Cloner le projet dans un dossier "frontend" :**

git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git frontend

3. Ajouter un fichier de configuration nommé **".env"** à la racine du backend. A l'intérieur, plusieurs variables d'environnement "secrètes" seront définies:
   
   - MONGODB_PIIQUANTE = 'lien_vers_la_base_de_données_mongoDB'
   - TOKEN_KEY = 'clé_secrète_pour_crypter_les_tokens'
   - CRYPTOJS_KEY = 'clé_secrète_pour_crypter_les_emails'
   
4. **Lancer le frontend :**
   
   - npm install
   - npm run start

5. Lancer le backend :

   - Installer toutes les dépendances : **npm install**
   - **nodemon server**
