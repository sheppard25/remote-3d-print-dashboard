# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à **Remote 3D Print Dashboard** ! Vos contributions sont essentielles pour améliorer ce projet.

## 📜 Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment puis-je contribuer ?](#comment-puis-je-contribuer)
- [Configuration de l'environnement de développement](#configuration-de-lenvironnement-de-développement)
- [Processus de Pull Request](#processus-de-pull-request)
- [Conventions de code](#conventions-de-code)
- [Conventions des commits](#conventions-des-commits)
- [Signaler un bug](#signaler-un-bug)
- [Proposer une fonctionnalité](#proposer-une-fonctionnalité)

## 📜 Code de conduite

Ce projet respecte un code de conduite basé sur le respect mutuel :

- Être respectueux et inclusif
- Accepter les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté
- Faire preuve d'empathie envers les autres membres

## 🛠️ Comment puis-je contribuer ?

### Signaler des bugs
Si vous trouvez un bug, veuillez [ouvrir une issue](https://github.com/sheppard25/remote-3d-print-dashboard/issues/new) en incluant :
- Description détaillée du problème
- Étapes pour reproduire le bug
- Comportement attendu vs comportement observé
- Captures d'écran si possible
- Informations système (OS, version Node.js, version Repetier Server)

### Proposer des améliorations
Vous avez une idée d'amélioration ?
1. Vérifiez qu'elle n'existe pas déjà dans les [issues existantes](https://github.com/sheppard25/remote-3d-print-dashboard/issues)
2. Ouvrez une nouvelle issue avec le label `enhancement`
3. Décrivez clairement votre proposition et son intérêt

### Contribuer au code
1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/MaSuperFeature`)
3. Committez vos changements (`git commit -m 'Add: Ma super fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/MaSuperFeature`)
5. Ouvrez une Pull Request

## ⚙️ Configuration de l'environnement de développement

### Prérequis
- Node.js >= 16.0.0
- npm ou yarn
- Git
- Repetier Server (ou environnement de test)

### Installation

```bash
# Cloner votre fork
git clone https://github.com/VOTRE-USERNAME/remote-3d-print-dashboard.git
cd remote-3d-print-dashboard

# Ajouter le remote upstream
git remote add upstream https://github.com/sheppard25/remote-3d-print-dashboard.git

# Backend
cd backend
npm install
cp .env.example .env
# Configurer les variables dans .env
npm run dev

# Frontend (dans un autre terminal)
cd ../frontend
npm install
npm run dev
```

### Exécuter les tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 🔄 Processus de Pull Request

1. **Assurez-vous que votre code suit les conventions**
   - Lint : `npm run lint`
   - Format : `npm run format`
   - Tests : `npm test`

2. **Mettez à jour votre branche avec main**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

3. **Créez une Pull Request claire**
   - Titre descriptif et concis
   - Description détaillée des changements
   - Référence aux issues liées (ex: `Closes #123`)
   - Screenshots si changements visuels

4. **Répondez aux commentaires de review**
   - Soyez ouvert aux suggestions
   - Apportez les modifications demandées

5. **Attendez l'approbation**
   - Au moins une review approbée
   - Tous les tests passent
   - Pas de conflits

## 📝 Conventions de code

### JavaScript/React
- Utilisez ES6+ syntax
- PascalCase pour les composants React
- camelCase pour les variables et fonctions
- UPPER_CASE pour les constantes
- Utilisez des noms descriptifs

```javascript
// ✅ Bon
const getUserData = async (userId) => {
  const API_ENDPOINT = '/api/users';
  // ...
};

// ❌ Mauvais
const getdata = async (id) => {
  const endpoint = '/api/users';
  // ...
};
```

### Organisation des fichiers
```
frontend/src/
├── components/
│   └── Button/
│       ├── Button.jsx
│       ├── Button.module.css
│       └── Button.test.jsx
```

### Commentaires
- Commentez le "pourquoi", pas le "quoi"
- Utilisez JSDoc pour les fonctions importantes

```javascript
/**
 * Envoie un fichier gcode vers l'imprimante
 * @param {File} file - Fichier .gcode à envoyer
 * @param {string} printerId - ID de l'imprimante cible
 * @returns {Promise<Object>} Réponse de l'API
 */
async function uploadGcodeFile(file, printerId) {
  // Implementation
}
```

## 💬 Conventions des commits

Nous suivons [Conventional Commits](https://www.conventionalcommits.org/)

### Format
```
<type>(<scope>): <description>

[corps optionnel]

[footer optionnel]
```

### Types
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation uniquement
- `style`: Changements de formatage (espaces, virgules, etc.)
- `refactor`: Refactoring du code
- `test`: Ajout ou modification de tests
- `chore`: Maintenance (dépendances, config, etc.)

### Exemples
```bash
feat(upload): add drag and drop for gcode files
fix(dashboard): correct temperature display bug
docs(readme): update installation instructions
refactor(api): simplify printer connection logic
test(upload): add unit tests for file validation
```

## 🐛 Signaler un bug

Utilisez le template d'issue pour les bugs :

```markdown
**Description du bug**
Une description claire du problème.

**Étapes pour reproduire**
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer.

**Screenshots**
Si applicable, ajoutez des captures d'écran.

**Environnement**
- OS: [ex: Windows 10, Ubuntu 22.04]
- Node.js: [ex: 18.0.0]
- Repetier Server: [ex: 1.4.10]
- Navigateur: [ex: Chrome 120]
```

## ✨ Proposer une fonctionnalité

```markdown
**Problème rencontré**
Décrivez le problème que cette fonctionnalité résoudrait.

**Solution proposée**
Comment vous imaginez la solution.

**Alternatives considérées**
Autres approches envisagées.

**Contexte supplémentaire**
Toute information pertinente.
```

## 📚 Ressources utiles

- [Documentation Repetier Server API](https://www.repetier-server.com/manuals/0.90/)
- [Documentation React](https://react.dev/)
- [Documentation Electron](https://www.electronjs.org/docs/latest/)
- [Guide Git](https://git-scm.com/doc)

## ❓ Questions

Si vous avez des questions, n'hésitez pas à :
- Ouvrir une [Discussion GitHub](https://github.com/sheppard25/remote-3d-print-dashboard/discussions)
- Contacter les mainteneurs via issues

---

**Merci de contribuer à Remote 3D Print Dashboard ! 🚀**
