# 🚀 Guide Déploiement AZULAN E-commerce

## 📋 ÉTAPES DE DÉPLOIEMENT

### 1️⃣ MONGODB ATLAS (Base de données gratuite en cloud)

1. Aller sur https://www.mongodb.com/cloud/atlas
2. S'inscrire avec ton email (nqairidriss@yahoo.fr)
3. Créer un projet "AZULAN"
4. Créer un cluster gratuit (M0 - toujours gratuit)
5. Créer un utilisateur DB:
   - Username: `azulan`
   - Password: Générer un mot de passe fort
6. Dans "Network Access", ajouter IP `0.0.0.0/0` (allow all)
7. Cliquer "Connect" → "Drivers" → Copier la connection string
   - Format: `mongodb+srv://azulan:PASSWORD@cluster0.mongodb.net/azulan?retryWrites=true&w=majority`
   - **REMPLACER** `PASSWORD` par le vrai mot de passe

✅ **Copy la connection string!**

---

### 2️⃣ RAILWAY (Hébergement backend gratuit)

1. Aller sur https://railway.app
2. S'inscrire avec GitHub (Chelles77)
3. Créer un nouveau projet
4. Cliquer "Deploy from GitHub"
5. Sélectionner `Chelles77/azulan.fr`
6. Railway va auto-détecter Node.js
7. Ajouter les variables d'environnement (Settings → Variables):
   ```
   MONGODB_URI = [copie de MongoDB Atlas]
   JWT_SECRET = your_super_secret_jwt_key_minimum_32_chars_long!!!
   STRIPE_SECRET_KEY = sk_test_... (obtenir sur Stripe)
   PORT = 5000
   NODE_ENV = production
   FRONTEND_URL = https://azulan.fr
   ```

8. Railway va déployer automatiquement
9. Tu recevras une URL: `https://azulan-prod-xxxx.railway.app`

✅ **Copier l'URL du backend!**

---

### 3️⃣ METTRE À JOUR LE FRONTEND

Changer dans `admin-v2.html` et `connexion-v2.html`:
```javascript
// Avant:
const API_URL = 'http://localhost:5000/api';

// Après:
const API_URL = 'https://azulan-prod-xxxx.railway.app/api';
```

---

### 4️⃣ STRIPE (Paiements)

1. Créer compte https://stripe.com
2. Aller dans "Developers" → "API keys"
3. Copier:
   - `STRIPE_SECRET_KEY` (commence par `sk_test_`)
   - `STRIPE_PUBLISHABLE_KEY` (commence par `pk_test_`)
4. Ajouter à Railway variables

---

### 5️⃣ NETLIFY (Frontend statique)

1. Aller sur https://netlify.com
2. Connecter le repo GitHub `Chelles77/azulan.fr`
3. Netlify va auto-déployer tous les `.html`
4. Configuration:
   - Build command: (laisser vide)
   - Publish directory: `.` (racine du repo)

✅ **Frontend live sur:** `https://azulan-driss.netlify.app`

---

## 🔌 FLUX DE DONNÉES

```
Frontend (Netlify) 
    ↓
API (Railway Backend)
    ↓
MongoDB (Atlas)
    ↓
Stripe (Paiements)
```

---

## ✅ CHECKLIST FINAL

- [ ] MongoDB Atlas configuré avec connection string
- [ ] Railway déployé avec variables d'environnement
- [ ] Frontend updated avec l'URL du backend
- [ ] Netlify déploie les fichiers HTML
- [ ] Stripe API keys configurées
- [ ] Tester connexion: `https://azulan-driss.netlify.app/connexion-v2.html`
- [ ] Tester admin: `https://azulan-driss.netlify.app/admin-v2.html`

---

## 🧪 TESTER LOCALEMENT

```bash
cd backend
npm start
# Le serveur tourne sur http://localhost:5000

# Tester l'health check:
curl http://localhost:5000/api/health
```

---

## 📞 SUPPORT

Si erreur de connexion MongoDB:
- Vérifier la connection string
- Vérifier l'IP est whitelistée dans MongoDB Atlas
- Vérifier le mot de passe

Si erreur d'authentification:
- Vérifier JWT_SECRET
- Vérifier le token est stocké dans localStorage

Si erreur Stripe:
- Vérifier les clés API
- S'assurer que mode "test" est activé
