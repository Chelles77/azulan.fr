# 🔗 Mettre à Jour l'URL du Backend dans le Frontend

## Étape 1: Copier l'URL Railway

Après le déploiement Railway, tu auras une URL comme:
```
https://azulan-prod-xxxxx.railway.app
```

**COPIE CETTE URL**

---

## Étape 2: Remplacer dans les Fichiers Frontend

Tu dois remplacer `http://localhost:5000/api` par `https://azulan-prod-xxxxx.railway.app/api` dans:

### Fichiers à modifier:

1. **admin-v2.html**
   - Ligne 107: `const API_URL = 'http://localhost:5000/api';`
   - Remplace par: `const API_URL = 'https://azulan-prod-xxxxx.railway.app/api';`

2. **connexion-v2.html**
   - Ligne 81: `const API_URL = 'http://localhost:5000/api';`
   - Remplace par: `const API_URL = 'https://azulan-prod-xxxxx.railway.app/api';`

3. **Autres fichiers HTML** (si tu les mets à jour):
   - categorie.html
   - panier.html
   - etc.

---

## Étape 3: Utiliser Find & Replace

Pour faire ça rapidement:

### Option A: VS Code
1. Ouvre le dossier du projet dans VS Code
2. Appuie sur `Ctrl+H` (Find and Replace)
3. Find: `http://localhost:5000`
4. Replace: `https://azulan-prod-xxxxx.railway.app`
5. Clique "Replace All"

### Option B: Terminal (PowerShell)
```powershell
cd "C:\Users\nqair\OneDrive\Bureau\E-commerce driss"

# Remplace dans admin-v2.html
(Get-Content admin-v2.html) -replace 'http://localhost:5000', 'https://azulan-prod-xxxxx.railway.app' | Set-Content admin-v2.html

# Remplace dans connexion-v2.html
(Get-Content connexion-v2.html) -replace 'http://localhost:5000', 'https://azulan-prod-xxxxx.railway.app' | Set-Content connexion-v2.html
```

### Option C: Manuel
Ouvre chaque fichier et change manuellement les lignes.

---

## Étape 4: Vérifier les Changements

1. Cherche `localhost` dans tous les fichiers HTML
2. Il ne devrait pas y avoir de `localhost:5000` sauf dans les fichiers -v2
3. Utilise Ctrl+Shift+F pour chercher dans tous les fichiers

---

## Étape 5: Commit et Push

```bash
git add admin-v2.html connexion-v2.html
git commit -m "Update API URLs to production Railway backend"
git push origin main
```

Netlify va automatiquement redéployer avec les nouvelles URLs!

---

## Étape 6: Tester le Frontend

1. Va sur `https://azulan-driss.netlify.app/connexion-v2.html`
2. Essaie de te connecter
3. Tu devrais voir les données du backend en production!

---

## ⚠️ Important: CORS

Si tu vois une erreur comme:
```
Access to XMLHttpRequest from 'https://azulan-driss.netlify.app' has been blocked by CORS policy
```

Cela signifie que le backend refuse la requête venant du frontend.

**Solution:** Dans `backend/server.js`, vérifie que CORS est correctement configuré:

```javascript
app.use(cors({
  origin: 'https://azulan-driss.netlify.app',
  credentials: true
}));
```

Puis redéploie Railway.

---

## Checklist Finale

- [ ] Copié l'URL Railway
- [ ] Remplacé `localhost:5000` dans tous les fichiers
- [ ] Testé que le frontend se connecte au backend
- [ ] Committed et pushé les changements
- [ ] Vérifié que Netlify a redéployé
- [ ] Testé la connexion sur le site en production
