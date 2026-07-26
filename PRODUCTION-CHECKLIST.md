# ✅ Checklist Déploiement Production

## Phase 1: Préparation (30 minutes)

- [ ] **MongoDB Atlas**
  - [ ] Compte créé sur MongoDB Atlas
  - [ ] Cluster M0 gratuit créé
  - [ ] Utilisateur DB créé (username: azulan)
  - [ ] Password génération sécurisée
  - [ ] IP whitelist configurée (0.0.0.0/0)
  - [ ] Connection string obtenue et testée
  - [ ] Fichier `SETUP-MONGODB.md` lu en entier

- [ ] **Stripe**
  - [ ] Compte créé sur Stripe
  - [ ] Dashboard Stripe accessible
  - [ ] Secret Key (`sk_test_...`) copié
  - [ ] Publishable Key (`pk_test_...`) copié
  - [ ] Clés de test notées quelque part sécurisé

- [ ] **Railway**
  - [ ] Compte créé sur Railway
  - [ ] Connecté à GitHub via Railway
  - [ ] Fichier `SETUP-RAILWAY.md` lu en entier

---

## Phase 2: Configuration Backend (15 minutes)

- [ ] **Mise à jour .env**
  ```
  MONGODB_URI = mongodb+srv://azulan:PASSWORD@cluster0.mongodb.net/azulan?retryWrites=true&w=majority
  JWT_SECRET = your_super_secret_key_minimum_32_chars_!!!
  STRIPE_SECRET_KEY = sk_test_...
  PORT = 5000
  NODE_ENV = production
  ```

- [ ] **Tester localement**
  ```bash
  cd backend
  npm run test-server
  curl http://localhost:5000/api/health
  # Doit afficher: {"status":"Backend AZULAN is running!"}
  ```

- [ ] **Commit les changements .env** (NON - .env est dans .gitignore!)

---

## Phase 3: Déploiement Railway (20 minutes)

- [ ] **Créer projet Railway**
  - [ ] Connexion GitHub autorisée
  - [ ] Repo `azulan.fr` sélectionné
  - [ ] Service backend configuré

- [ ] **Ajouter variables d'environnement dans Railway**
  ```
  MONGODB_URI = [copy-paste du .env]
  JWT_SECRET = [copy-paste du .env]
  STRIPE_SECRET_KEY = [copy-paste du .env]
  NODE_ENV = production
  ```

- [ ] **Attendre le déploiement** (5-10 minutes)

- [ ] **Vérifier l'URL Railway**
  - [ ] Railway a affecté une URL: `https://azulan-prod-xxxxx.railway.app`
  - [ ] Health check fonctionne:
    ```
    https://azulan-prod-xxxxx.railway.app/api/health
    ```
  - [ ] Copier cette URL quelque part

---

## Phase 4: Configuration Frontend (10 minutes)

- [ ] **Mettre à jour les URLs API**
  - [ ] admin-v2.html: remplacer localhost par URL Railway
  - [ ] connexion-v2.html: remplacer localhost par URL Railway
  - [ ] Utiliser Find & Replace pour faciliter

- [ ] **Commit et push**
  ```bash
  git add admin-v2.html connexion-v2.html
  git commit -m "Update API URLs to production Railway backend"
  git push origin main
  ```

- [ ] **Vérifier Netlify**
  - [ ] Netlify a automatiquement redéployé
  - [ ] URL du site: `https://azulan-driss.netlify.app`

---

## Phase 5: Tester le Flux Complet (15 minutes)

### Test 1: Inscription
- [ ] Aller sur `https://azulan-driss.netlify.app/connexion-v2.html`
- [ ] Cliquer sur "Inscription"
- [ ] Remplir:
  - Prénom: Test
  - Nom: User
  - Email: test@azulan.fr
  - Mot de passe: Test123!@#
- [ ] Clicker "S'inscrire"
- [ ] ✅ Redirect vers page d'accueil

### Test 2: Connexion
- [ ] Retourner à `/connexion-v2.html`
- [ ] Remplir email/password
- [ ] Cliquer "Se connecter"
- [ ] ✅ Redirect vers page d'accueil

### Test 3: Admin Panel
- [ ] Aller sur `/admin-v2.html` (en étant connecté)
- [ ] ✅ Voir la sidebar + liste des produits + clients

### Test 4: Ajouter un Produit
- [ ] Remplir le formulaire d'ajout
- [ ] Cliquer "Enregistrer"
- [ ] ✅ Voir le produit dans la liste

### Test 5: Paiement (si strpe est configuré)
- [ ] Ajouter produits au panier
- [ ] Aller à `/panier.html`
- [ ] Cliquer "Payer"
- [ ] Utiliser numéro test: `4242 4242 4242 4242`
- [ ] ✅ Paiement accepté (mode test)

---

## Phase 6: Vérifications Finales (5 minutes)

- [ ] **Logs vérifiés**
  - [ ] Pas d'erreur dans Railway logs
  - [ ] Pas d'erreur CORS

- [ ] **Performance**
  - [ ] Les pages chargent rapidement
  - [ ] Les données s'affichent correctement

- [ ] **Sécurité**
  - [ ] ✅ Le JWT fonctionne
  - [ ] ✅ Les mots de passe sont hashés
  - [ ] ✅ Les secrets ne sont pas dans le code

- [ ] **Backups**
  - [ ] MongoDB Atlas fait des backups automatiques
  - [ ] GitHub contient tout le code

---

## Production URL

- **Frontend:** https://azulan-driss.netlify.app
- **Backend API:** https://azulan-prod-xxxxx.railway.app/api
- **Admin Panel:** https://azulan-driss.netlify.app/admin-v2.html
- **Connexion:** https://azulan-driss.netlify.app/connexion-v2.html

---

## Prochaines Étapes (Après Test)

1. **Activer Stripe en Production**
   - Compte entreprise sur Stripe
   - Obtenir clés live (`sk_live_`)
   - Remplacer dans Railway

2. **Optimisations**
   - Upload d'images (5 photos par produit)
   - Email notifications
   - Webhooks Stripe

3. **Marketing**
   - SEO optimization
   - Google Analytics
   - Email newsletter

---

## Support & Troubleshooting

**Erreur: "Cannot connect to MongoDB"**
- Vérifie la connection string dans Railway
- Vérifie que l'IP est whitelistée dans MongoDB Atlas
- Attends 1-2 minutes après la création

**Erreur: "CORS policy"**
- Vérifie que `cors()` est activé dans server.js
- Vérifie l'URL du frontend dans CORS config

**Paiement Stripe ne fonctionne pas**
- Vérifie les clés dans Railway
- Vérifie que tu es en mode TEST
- Utilise les numéros de test fournis

**Frontend ne se connecte pas à l'API**
- Vérifie l'URL du backend dans admin-v2.html
- Ouvre DevTools (F12) → Console pour les erreurs
- Vérifie que Railway est déployé et actif

---

## Budget

- **MongoDB Atlas:** Gratuit (M0)
- **Railway:** Gratuit (500 heures/mois)
- **Netlify:** Gratuit (bandwidth)
- **Stripe:** Gratuit en test, 2.9% + 0.30€ par transaction en production
- **Domain:** À configurer plus tard

**Total:** 0€ jusqu'à première vente! 🎉
