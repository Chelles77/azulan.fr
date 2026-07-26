# 🚂 Railway - Déploiement Backend (Gratuit)

## ÉTAPE 1: Créer un compte Railway

1. Va sur **https://railway.app**
2. Clique sur **"Dashboard"** (haut droit)
3. Clique sur **"GitHub"** pour te connecter avec GitHub
4. Autorise Railway à accéder à tes repos GitHub
5. Tu es maintenant loggé!

---

## ÉTAPE 2: Créer un Nouveau Projet

1. Dans le dashboard Railway, clique **"New Project"**
2. Sélectionne **"Deploy from GitHub"**
3. Sélectionne ton repo: **Chelles77/azulan.fr**

---

## ÉTAPE 3: Ajouter un Service Backend

1. Clique sur **"Add"** → **"Database"** (optionnel, on va utiliser MongoDB Atlas)
2. Clique sur **"Add"** → **"GitHub Repo"**
3. Configure:
   - **Branch:** `main`
   - **Environment:** Laisse vide (auto-détect)

---

## ÉTAPE 4: Configurer les Variables d'Environnement

1. Sur la page du projet, clique sur le service **"azulan.fr"** (backend)
2. Clique sur l'onglet **"Variables"**
3. Ajoute ces variables:

```
MONGODB_URI = mongodb+srv://azulan:PASSWORD@cluster0.mongodb.net/azulan?retryWrites=true&w=majority
JWT_SECRET = your_super_secret_key_minimum_32_chars_change_me_!!!
STRIPE_SECRET_KEY = sk_test_... (à obtenir plus tard)
PORT = 5000
NODE_ENV = production
FRONTEND_URL = https://azulan-driss.netlify.app
```

**⚠️ Remplace:**
- `PASSWORD` par le mot de passe MongoDB (de SETUP-MONGODB.md)
- `STRIPE_SECRET_KEY` plus tard après Stripe

---

## ÉTAPE 5: Configurer le Build

1. Clique sur l'onglet **"Settings"**
2. Sous "Build", configure:
   - **Build Command:** `npm install` (automatique)
   - **Start Command:** `npm start` (automatique)
3. Clique **"Deploy"**

---

## ÉTAPE 6: Attendre le Déploiement

1. Railway va télécharger le code depuis GitHub
2. Il va installer les dépendances (`npm install`)
3. Il va lancer le serveur
4. ✅ Tu verras une URL comme: `https://azulan-prod-xxxxx.railway.app`

**⏳ Le déploiement prend 5-10 minutes**

---

## ÉTAPE 7: Vérifier que le Backend Fonctionne

Ouvre dans le navigateur:
```
https://azulan-prod-xxxxx.railway.app/api/health
```

Tu devrais voir:
```json
{"status":"Backend AZULAN is running!"}
```

✅ **Si tu vois ce message, le backend est déployé!**

---

## ÉTAPE 8: Copier l'URL du Backend

1. Tu verras l'URL complète dans Railway dashboard
2. **COPIE CETTE URL** - tu la besoin pour le frontend!
3. Exemple: `https://azulan-prod-12345.railway.app`

---

## Redéploiement Automatique

Chaque fois que tu pusses du code vers GitHub:
1. Railway détecte le changement automatiquement
2. Il redéploie le code en 2-3 minutes
3. Pas besoin de faire quoi que ce soit!

---

## Logs et Debugging

1. Dans le dashboard Railway, sélectionne le service
2. Clique sur **"Logs"**
3. Tu veras tous les logs du serveur en temps réel

Si le déploiement échoue:
- Vérifie les logs
- Vérifie que `npm start` fonctionne localement
- Vérifie que le fichier `server.js` existe

---

## Problèmes Courants

**"Build failed"**
- Vérifie que `package.json` existe dans `backend/`
- Vérifie que les dépendances sont correctes

**"MongoDB connection error"**
- Vérifie la MONGODB_URI dans Variables
- Vérifie que l'IP est whitelistée dans MongoDB Atlas

**"Port already in use"**
- Railway gère les ports automatiquement
- Change rien à la config du PORT

---

## Environnement Gratuit Railway

✅ Gratuit jusqu'à 500 heures/mois
✅ Inclut: Node.js, Database, Networking
⚠️ Au-delà: $5/month de crédit gratuit, puis payant
