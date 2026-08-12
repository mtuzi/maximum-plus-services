# Maximum Plus Services SARL — Site Vitrine

Site vitrine professionnel pour **Maximum Plus Services SARL**, entreprise de droit congolais (RDC) active dans les services multi-secteurs : nettoyage, entretien, aménagement, sécurité, négoce, etc.

---

## Architecture du projet

```
open-maximum-plus/
├── index.html          # Page d'accueil
├── about.html          # Qui sommes-nous
├── services.html       # Nos Services (12 services détaillés)
├── security.html       # Gardiennage & Sécurité
├── contact.html        # Formulaire de contact
├── css/
│   └── styles.css      # Styles principaux + responsive
├── js/
│   └── main.js         # Animations, navigation, formulaire
├── images/             # Répertoire pour images locales
└── README.md           # Ce fichier
```

## Technologies utilisées

| Technologie | Usage |
|---|---|
| HTML5 | Structure sémantique des pages |
| CSS3 | Design responsive, variables CSS, animations |
| JavaScript vanilla | Navigation, animations scroll, carrousel, validation formulaire |
| Google Fonts (Inter) | Typographie moderne et lisible |
| Font Awesome 6 | Icônes |
| OpenStreetMap | Carte interactive (about.html, contact.html) |
| Formspree | Envoi de formulaires par email |

## Fonctionnalités

- **Navigation fixe** avec menu burger animé (mobile)
- **Hero** avec bannière plein écran et CTA
- **Animations au scroll** (fade-in) via IntersectionObserver
- **Carrousel de témoignages** avec dots de navigation
- **Compteurs animés** pour les chiffres clés
- **Formulaire de contact** avec validation côté client (HTML5 + JS)
- **Page About** avec chronologie (timeline) et carte OpenStreetMap
- **12 services détaillés** avec icônes et descriptions
- **Page Gardiennage** dédiée avec avantages
- **Footer complet** avec liens, coordonnées et identifiants légaux

## Palette de couleurs

- Primaire : `#1A365D` (bleu nuit)
- Secondaire : `#F5F5F5` (gris clair)
- Accent : `#C79A3E` (or discret)
- Texte : `#2D3748` (gris foncé)

## Utilisation

1. Ouvrir `index.html` dans un navigateur, **ou**
2. Servir avec un serveur local :

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## Déploiement

Le site est entièrement statique et déployable sur :
- **Netlify** : glisser-déposer le dossier ou connecter le dépôt Git
- **Vercel** : `vercel deploy`
- **Tout hébergement FTP** : copier les fichiers sur le serveur

## Formulaire de contact

Le formulaire utilise **Formspree** pour l'envoi d'emails. Pour le mettre en production :

1. Créer un compte sur [Formspree.io](https://formspree.io)
2. Créer un nouveau formulaire et obtenir l'URL
3. Remplacer l'URL dans `contact.html` (attribut `action` du formulaire) :
   ```html
   <form action="https://formspree.io/f/VOTRE_ID" method="POST">
   ```

## Accessibilité

- Balises `role` et `aria-label` sur les éléments interactifs
- Images avec attribut `alt` descriptif
- Navigation clavier fonctionnelle
- Contrastes conformes WCAG 2.1 AA

## Responsive

Le site est optimisé pour :
- Desktop (> 1024px)
- Tablette (768px – 1024px)
- Mobile (< 768px)

## Licence

© 2026 Maximum Plus Services SARL — Tous droits réservés.
