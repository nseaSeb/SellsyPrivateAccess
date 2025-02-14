# SellsyPrivateAccess

# Application d'authentification OAuth avec Sellsy en connexion Privée

Ce projet est une application Node.js utilisant Express pour implémenter une authentification OAuth avec Sellsy. Il génère un code challenge PKCE, redirige l'utilisateur vers la page d'authentification de Sellsy, et récupère un token d'accès pour interagir avec l'API Sellsy.

---

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

- **Node.js** (version 14 ou supérieure) installé sur votre machine.
- **npm** (généralement inclus avec Node.js) pour installer les dépendances.
- Un compte **Sellsy** avec les credentials OAuth (client ID, client secret, etc.).
- **Ngrok** (ou un outil similaire) pour exposer votre serveur local à Internet pendant les tests.

---

## 🔧 Installation

Clonez ce dépôt** sur votre machine locale :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo


Installez les dépendances nécessaires :


npm install
Configurez les variables d'environnement :

Créez un fichier .env à la racine du projet.

Ajoutez-y les variables suivantes en remplaçant les valeurs par celles fournies par Sellsy :

.env

CLIENT_ID=votre_client_id
CLIENT_SECRET=votre_client_secret
AUTHORIZATION_URL=https://votre-domaine.sellsy.com/oauth/authorize
TOKEN_URL=https://votre-domaine.sellsy.com/oauth/token
REDIRECT_URI=http://localhost:4000/auth/callback
API_URL=https://votre-domaine.sellsy.com/api/v2



🛠 Utilisation
Démarrez le serveur local :

npm start
Le serveur sera accessible à l'adresse http://localhost:4000.

Exposez votre serveur local à Internet :

Utilisez Ngrok pour créer un tunnel sécurisé :

bash

ngrok http 4000
Ngrok générera une URL publique (par exemple, https://1234.ngrok.io) que vous pourrez utiliser pour tester l'authentification OAuth.

Lancez l'authentification :

Ouvrez votre navigateur et accédez à http://localhost:4000.

Cliquez sur le bouton "Se connecter" pour être redirigé vers la page d'authentification de Sellsy.

Accédez au tableau de bord :

Après avoir autorisé l'application sur Sellsy, vous serez redirigé vers le tableau de bord.

Vous y verrez les données récupérées depuis l'API Sellsy.

🗂 Structure du projet
index.js : Le fichier principal contenant la logique de l'authentification OAuth et les routes Express.

.env : Fichier de configuration pour les variables d'environnement.

README.md : Ce fichier, contenant les instructions d'installation et d'utilisation.

🔒 Déconnexion
Pour vous déconnecter, cliquez sur le bouton "Déconnexion" dans le tableau de bord. Cela supprimera le token d'accès et vous redirigera vers la page d'accueil.

📜 Licence
Ce projet est libre il s'agit d'un simple exemple de connexion privée avec l'API Sellsy 

👤 Auteur
Sébastien Portrait

🙏 Remerciements
Sellsy pour leur API. Mes collègues API

Express pour le framework web.

Ngrok pour le tunneling local.