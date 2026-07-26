# 🗄️ MongoDB Atlas - Configuration Gratuite

## ÉTAPE 1: Créer un compte MongoDB Atlas

1. Va sur **https://www.mongodb.com/cloud/atlas**
2. Clique sur **"Sign Up"**
3. Inscris-toi avec ton email: **nqairidriss@yahoo.fr**
4. Crée un mot de passe fort
5. Accepte les conditions

---

## ÉTAPE 2: Créer un Cluster Gratuit

1. Après inscription, tu es sur le dashboard
2. Clique sur **"Create a Deployment"**
3. Sélectionne le plan **"M0 FREE"** (toujours gratuit)
4. Choisis ta région (Europe - Ireland ou Belgium)
5. Clique **"Create"**

**⏳ Le cluster se crée en 5-10 minutes**

---

## ÉTAPE 3: Créer un Utilisateur Database

1. Dans le menu, clique sur **"Database Access"**
2. Clique sur **"Add New Database User"**
3. Remplis:
   - **Username:** `azulan`
   - **Password:** Génère un mot de passe fort (8+ caractères, majuscules, chiffres, symboles)
   - ⚠️ **COPIE CE MOT DE PASSE** - tu le besoin plus tard!
4. Clique **"Add User"**

---

## ÉTAPE 4: Configurer le Network Access

1. Dans le menu, clique sur **"Network Access"**
2. Clique sur **"Add IP Address"**
3. Clique sur **"Allow Access from Anywhere"** (0.0.0.0/0)
4. ⚠️ **ATTENTION:** Ceci ouvre ton DB à internet. En production, restricts-le!
5. Clique **"Confirm"**

---

## ÉTAPE 5: Obtenir la Connection String

1. Va dans **"Databases"** → Clique sur **"Connect"**
2. Choisis **"Drivers"** (pas Mongo Shell)
3. Sélectionne **"Node.js"** et version **"4.1 or later"**
4. Tu veras une connection string:
   ```
   mongodb+srv://azulan:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   ```

5. **REMPLACE `<password>`** par le mot de passe que tu as copié à l'étape 3
6. Ajoute `/azulan` à la fin avant le `?`:
   ```
   mongodb+srv://azulan:YOUR_PASSWORD@cluster0.mongodb.net/azulan?retryWrites=true&w=majority
   ```

7. ✅ **COPIE CETTE STRING COMPLÈTE!**

---

## ÉTAPE 6: Mettre à jour le .env

Dans `backend/.env`, remplace la ligne MONGODB_URI:

```env
MONGODB_URI=mongodb+srv://azulan:YOUR_PASSWORD@cluster0.mongodb.net/azulan?retryWrites=true&w=majority
```

---

## ✅ VÉRIFICATION

Pour tester que la connection fonctionne:

```bash
cd backend
npm run test-server
# Doit afficher "✅ MongoDB connecté"
```

Si erreur "Authentication failed":
- Vérifie le username/password
- Vérifie que l'IP est whitelistée
- Attends 1-2 minutes après la création de l'utilisateur

---

## 🔐 SÉCURITÉ

⚠️ **NE JAMAIS commiter le .env avec les vrais credentials!**

Le `.env` est dans `.gitignore` donc git ignore automatiquement ce fichier.

Mais en production (Railway), tu configureras les variables via l'interface, pas via fichier.
