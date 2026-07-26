# 💳 Stripe - Configuration Paiements (Gratuit en Test)

## ÉTAPE 1: Créer un compte Stripe

1. Va sur **https://stripe.com**
2. Clique sur **"Get Started"** ou **"Sign Up"**
3. Inscris-toi avec:
   - Email: **nqairidriss@yahoo.fr**
   - Mot de passe fort
   - Prénom/Nom
4. Vérifie ton email
5. Tu es maintenant sur le dashboard Stripe!

---

## ÉTAPE 2: Accéder aux Clés API

1. Dans le dashboard, clique sur **"Developers"** (coin bas-gauche)
2. Clique sur **"API Keys"**
3. Tu veras deux types de clés:
   - **Publishable Key** (commence par `pk_test_`)
   - **Secret Key** (commence par `sk_test_`)

⚠️ **NE PARTAGE JAMAIS la Secret Key!**

---

## ÉTAPE 3: Copier les Clés

1. À côté de **"Secret key"**, clique sur l'icône **copy** (📋)
2. **COPIE LA SECRET KEY** - tu en aura besoin
   - Exemple: `sk_test_51LoNhiBHLi...`

3. À côté de **"Publishable key"**, clique copy
4. **COPIE LA PUBLISHABLE KEY**
   - Exemple: `pk_test_51LoNhiBHLi...`

---

## ÉTAPE 4: Configurer les Clés dans Railway

1. Va dans ton projet Railway
2. Clique sur le service du backend
3. Onglet **"Variables"**
4. Ajoute/Modifie:
   ```
   STRIPE_SECRET_KEY = sk_test_51LoNhiBHLi...
   STRIPE_PUBLISHABLE_KEY = pk_test_51LoNhiBHLi...
   ```
5. Railway redéploie automatiquement

---

## ÉTAPE 5: Mode Test vs Production

**Important:** Tu es actuellement en **TEST MODE**

Cela signifie:
- ✅ Les paiements ne sont pas vrais
- ✅ Tu peux utiliser les numéros de test
- ✅ Aucun argent n'est débité

### Numéros de Carte de Test

Pour tester les paiements, utilise:

**Carte réussie:**
```
Numéro: 4242 4242 4242 4242
Expiration: Toute date future (ex: 12/25)
CVC: N'importe quel 3 chiffres (ex: 123)
```

**Carte déclinée (teste les erreurs):**
```
Numéro: 4000 0000 0000 0002
Expiration: N'importe quelle date future
CVC: N'importe quel 3 chiffres
```

---

## ÉTAPE 6: Passer en Production (Plus tard)

Quand tu es prêt à accepter de vrais paiements:

1. Dans Stripe Dashboard, clique sur **"Activate your account"**
2. Remplis les infos de ton entreprise
3. Stripe active les clés en **LIVE MODE**
4. Les clés live commencent par `sk_live_` et `pk_live_`
5. Change-les dans Railway

⚠️ **NE MÉLANGE JAMAIS test et live keys!**

---

## ÉTAPE 7: Webhooks (Optionnel pour maintenant)

Les webhooks permettent à Stripe de notifier ton serveur des changements de paiement.

Plus tard, tu configureras:
1. Dans Stripe Dashboard → **"Webhooks"**
2. Ajoute l'URL: `https://azulan-prod-xxxxx.railway.app/api/orders/webhook`
3. Abonne-toi aux événements: `payment_intent.succeeded`, `payment_intent.failed`

Pour maintenant, on va juste vérifier l'état du paiement directement.

---

## Documentation Stripe

**Pour développeurs:**
- https://stripe.com/docs
- https://stripe.com/docs/stripe-js
- https://stripe.com/docs/payments

**Dashboard:**
- https://dashboard.stripe.com

---

## Sécurité

✅ Les clés publiques (`pk_test_`) peuvent être partagées
❌ Les clés secrètes (`sk_test_`) doivent RESTER SECRÈTES
❌ Ne les mets JAMAIS dans le code frontend
❌ Ne les commite JAMAIS sur GitHub

---

## Tester les Paiements Localement

Une fois configuré, tu pourras:

1. Aller sur `/panier.html`
2. Ajouter des produits au panier
3. Cliquer "Payer avec Stripe"
4. Utiliser la carte test `4242 4242 4242 4242`
5. Le paiement s'effectue en mode test (gratuit)
