# Définition des specs de la page FORMPREVISUALIZER pour gérer les états

## Affichage de cette page

**Conditions Générales d'affichage de la page :**

Si User connecté on affiche la page, sinon on demande à se connecter.

**Affichage**

- Formulaire qui contient chaque questions/réponses
- Bouton _retour_ => `/builder/component/id`
- Bouton _submit_ qui enregistre en bdd => `/homepage`

### Question sur cette page

### Besoin de cette page

Si user est connecté : le formulaire complet

### State de cette page

```js
isConnected = true, false

form ( form complet )
```
