# 💜 AMINATA — 22 Ans de Lumière

Un site d'anniversaire romantique, poétique et entièrement responsive pour Aminata.

> *"I love you To the moon, beyond and never back."*

---

## ✨ Ce qui est inclus

| Section | Description |
|---------|-------------|
| **Hero** | Animation des lettres A-M-I-N-A-T-A + machine à écrire |
| **Message d'accueil** | Texte tendre avec effet typewriter |
| **Timeline** | 18+ moments clés de votre histoire, scroll storytelling |
| **Galerie** | ~10 photos avec lightbox interactive |
| **Vidéos** | Lecteur vidéo intégré, responsive |
| **22 Raisons** | Cartes animées, une par année de vie |
| **Lettre d'amour** | Enveloppe interactive + téléchargement PDF |
| **Verset Coranique** | Sourate Al-Ahzab v.3 avec 3 récitateurs + traductions |
| **Bouton Amour** | Compteur de clics avec confettis + localStorage |
| **Formulaire** | Envoi de souvenirs (photos, dates, lieux) |
| **Confettis** | Déclenchement automatique + au clic |
| **Cœurs flottants** | Animation subtile en background |

---

## 🚀 Déploiement

### Option 1 : Vercel (Recommandé)

1. **Créer un repo GitHub**
   ```bash
   git init
   git add .
   git commit -m "Site anniversaire Aminata"
   git branch -M main
   git remote add origin https://github.com/TON-USERNAME/aminata-birthday.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Va sur [vercel.com](https://vercel.com)
   - Connecte avec GitHub
   - Importe le repo
   - Clique **Deploy**

3. **Activer Vercel Analytics**
   - Dashboard Vercel → Ton projet → **Analytics**
   - Active **Web Analytics** (gratuit)
   - Le script est déjà dans le `<head>` du HTML

4. **Domaine personnalisé** (optionnel)
   - Project Settings → Domains
   - Ajoute ton domaine

### Option 2 : Lovable

- Upload le dossier sur [lovable.dev](https://lovable.dev)
- Déploie en un clic

### Option 3 : Netlify

- Glisse-dépose le dossier sur [netlify.com](https://netlify.com)
- Ou connecte le repo GitHub

---

## 📊 Analytics & Suivi

### Vercel Analytics (déjà intégré)
Le script `<script defer src="/_vercel/insights/script.js"></script>` est déjà dans le HTML.
Tu verras :
- Nombre de visites
- Pages vues
- Pays des visiteurs
- Appareils utilisés
- Temps passé

### Événements trackés automatiquement
- `love_click` : clic sur le bouton "augmenter l'amour"
- `letter_opened` : ouverture de l'enveloppe
- `quran_play` : lecture du verset

### Compteur "Amour" (local + backend)
- **Local** : stocké dans `localStorage` du navigateur d'Aminata
- **Global** : pour suivre TOUS les clics, il faut un backend

#### Option backend simple : Vercel KV + Serverless Function
```
1. Crée un projet Vercel avec une fonction serverless
2. Utilise Vercel KV (Redis) pour stocker le compteur
3. L'API retourne le compteur global
```

#### Option gratuite : CountAPI
```javascript
// Dans js/main.js, remplace la partie localStorage par :
fetch('https://api.countapi.xyz/hit/aminata-birthday/love')
  .then(r => r.json())
  .then(data => { countEl.textContent = data.value; });
```

---

## 📝 Configuration du formulaire de souvenirs

Le formulaire permet à Aminata d'envoyer des souvenirs (dates, lieux, photos, vidéos).

### Option 1 : Formspree (Recommandé, 50 soumissions/mois gratuit)
1. Crée un compte sur [formspree.io](https://formspree.io)
2. Crée un nouveau formulaire, récupère l'ID
3. Dans `index.html`, remplace :
   ```html
   <form id="souvenirsForm" ...>
   ```
   par :
   ```html
   <form action="https://formspree.io/f/TON_FORM_ID" method="POST" enctype="multipart/form-data">
   ```
4. Supprime `id="souvenirsForm"` ou garde-le pour le JS

### Option 2 : Formgrid (50/mois gratuit, pipeline leads)
- [formgrid.dev](https://formgrid.dev) — meilleure gestion des soumissions

### Option 3 : Netlify Forms
- Ajoute `data-netlify="true"` au `<form>`
- Déploie sur Netlify
- Les soumissions arrivent dans le dashboard Netlify

### Option 4 : Google Sheets + Apps Script (100% gratuit)
1. Crée une Google Sheet
2. Extensions → Apps Script
3. Colle le script Web App pour recevoir les données
4. Remplace l'URL dans le JS

---

## 🖼️ Remplacer les contenus

### Photos
1. Place tes photos dans `assets/images/`
2. Renomme-les : `photo1.jpg`, `photo2.jpg`, etc.
3. Dans `index.html`, remplace les placeholders :
   ```html
   <div class="gallery-item" data-src="assets/images/photo1.jpg" data-caption="Description...">
   ```

### Vidéos
1. Place tes vidéos dans `assets/videos/`
2. Renomme : `video1.mp4`, `video2.mp4`, etc.
3. Mets aussi des posters (miniatures) : `poster1.jpg`, etc.

### Timeline
Dans `index.html`, cherche les blocs `<!-- REMPLACER : ... -->` et ajoute tes photos/vidéos.

### Ton prénom
Dans `js/main.js`, ligne ~15 :
```javascript
tonPrenom: 'TonPrénom', // REMPLACE ICI
```

### Textes
Tous les textes sont dans `index.html`. Cherche les commentaires `<!-- REMPLACER -->`.

---

## 🎨 Personnalisation CSS

Les couleurs sont dans `css/style.css`, variables CSS en haut :
```css
:root {
  --mauve: #B8A1C9;
  --vert: #A8C5A8;
  --saumon: #F4A698;
  --bleu: #8FB8D9;
  --rose: #E8B4B8;
}
```

---

## 📱 Responsive

Le site est **mobile-first** :
- Navigation hamburger sur mobile
- Timeline verticale sur petits écrans
- Galerie en 2 colonnes puis 1 colonne
- Lettres A-M-I-N-A-T-A qui se réduisent

Testé sur :
- iPhone 12/13/14/15
- Samsung Galaxy
- iPad
- Desktop (1920px+)

---

## 🔧 Technologies

- **HTML5** sémantique
- **CSS3** avec variables, grid, flexbox, animations
- **Vanilla JavaScript** (pas de framework, léger)
- **Google Fonts** : Cormorant Garamond, Montserrat, Amiri
- **Aucune dépendance externe** (sauf Vercel Analytics)

---

## ♿ Accessibilité

- `prefers-reduced-motion` respecté
- Focus visible sur tous les éléments interactifs
- ARIA labels sur les boutons
- Contraste des couleurs vérifié
- Navigation clavier complète (lightbox, formulaire)

---

## 🌙 Verset Coranique — Sources Audio

Les liens audio utilisent **verses.quran.com** (source officielle) :
- **Al-Hussary** : `https://verses.quran.com/Alafasy/mp3/033003.mp3`
- **Al-Sudais** : `https://verses.quran.com/Sudais/mp3/033003.mp3`
- **Alafasy** : `https://verses.quran.com/Alafasy/mp3/033003.mp3`

*Note : Al-Hussary utilise temporairement le lien Alafasy car l'API verses.quran.com ne fournit pas tous les récitateurs. Pour une source complète, utiliser l'API Quran.com ou télécharger les MP3 manuellement dans `assets/audio/`.*

---

## 📄 Licence

Projet personnel — usage privé uniquement.

---

*Fait avec 💜 pour Aminata, Sirah, Xodeeram, Marie Etchebest.*
*22 ans (68) de pure lumière.*
