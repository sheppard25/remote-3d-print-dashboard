# 🖨️ Remote 3D Print Dashboard

> Dashboard web/Electron pour la gestion à distance d'imprimantes 3D via Repetier Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-%5E18.0.0-blue)](https://reactjs.org/)

## 📋 Description

Un dashboard moderne et intuitif permettant de contrôler et surveiller vos imprimantes 3D à distance via Repetier Server. Développé avec Electron et React pour une expérience desktop cross-platform fluide.

## ✨ Fonctionnalités

### 🎯 Principales
- **Upload de fichiers** : Envoi de fichiers .gcode, STL via glisser-déposer
- **Suivi en temps réel** : Progression, températures (buse/plateau), vitesse d'impression
- **Gestion de la file d'attente** : Ajout, suppression, réorganisation des tâches
- **Contrôle manuel** : Mouvements XYZ, chauffage, ventilateurs, extrusion
- **Notifications** : Alertes Discord, email ou locales (fin d'impression, erreurs)
- **Multi-imprimantes** : Support de plusieurs instances Repetier Server
- **Historique** : Statistiques et historique des impressions

### 🔒 Sécurité
- Connexion sécurisée (HTTPS, authentification par token)
- Accès local et distant
- Gestion des permissions

## 🏗️ Architecture

```
remote-3d-print-dashboard/
├── backend/              # API Node.js + intégration Repetier
│   ├── src/
│   │   ├── api/         # Routes API REST
│   │   ├── services/    # Logique métier
│   │   ├── models/      # Modèles de données
│   │   └── utils/       # Utilitaires
│   ├── tests/
│   └── package.json
├── frontend/            # React + Electron
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── pages/       # Pages de l'application
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # Services API
│   │   └── styles/      # CSS/SCSS
│   ├── public/
│   └── package.json
├── docs/                # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── UI_MOCKUPS/
├── scripts/             # Scripts d'installation et automatisation
└── README.md
```

## 🛠️ Stack Technique

### Frontend
- **Electron** : Application desktop cross-platform
- **React 18** : Interface utilisateur moderne
- **Axios / Socket.io** : Communication avec le backend
- **TailwindCSS** : Styling

### Backend
- **Node.js** : Serveur API
- **Express** : Framework web
- **Axios** : Requêtes vers Repetier Server API
- **Socket.io** : WebSocket pour temps réel

### Notifications
- **Discord.js** : Webhooks Discord
- **Nodemailer** : Envoi d'emails

### Base de données (optionnel)
- **SQLite** : Historique local des impressions

## 🚀 Installation

### Prérequis
- Node.js >= 16.0.0
- npm ou yarn
- Repetier Server installé et configuré

### Étapes

1. **Clone le repo**
```bash
git clone https://github.com/sheppard25/remote-3d-print-dashboard.git
cd remote-3d-print-dashboard
```

2. **Installation Backend**
```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement dans .env
npm run dev
```

3. **Installation Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

4. **Build Electron (Production)**
```bash
npm run build
npm run electron:build
```

## ⚙️ Configuration

### Variables d'environnement (backend)

Créez un fichier `.env` dans le dossier `backend/` :

```env
# Repetier Server
REPETIER_HOST=192.168.1.100
REPETIER_PORT=3344
REPETIER_API_KEY=your_api_key_here

# Notifications Discord (optionnel)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Notifications Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# Serveur backend
PORT=5000
```

## 📚 Documentation

- [Documentation API Repetier Server](https://www.repetier-server.com/manuals/0.90/)
- [Architecture du projet](docs/ARCHITECTURE.md)
- [Guide de contribution](CONTRIBUTING.md)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

### Workflow
1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Roadmap

- [ ] Connexion et authentification Repetier Server
- [ ] Upload de fichiers .gcode
- [ ] Affichage temps réel (températures, progression)
- [ ] File d'attente d'impression
- [ ] Contrôles manuels (mouvements, chauffage)
- [ ] Notifications Discord
- [ ] Notifications Email
- [ ] Support webcam (si disponible)
- [ ] Historique des impressions
- [ ] Thème dark/light
- [ ] Support multi-langues
- [ ] Application mobile (React Native)

## 🐛 Issues

Vous avez trouvé un bug ? [Ouvrez une issue](https://github.com/sheppard25/remote-3d-print-dashboard/issues)

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**sheppard25**
- GitHub: [@sheppard25](https://github.com/sheppard25)

## 🙏 Remerciements

- [Repetier Server](https://www.repetier-server.com/) pour leur excellente API
- La communauté makers et impression 3D
- Tous les contributeurs du projet

---

⭐ **N'oubliez pas de mettre une étoile si ce projet vous plaît !**
