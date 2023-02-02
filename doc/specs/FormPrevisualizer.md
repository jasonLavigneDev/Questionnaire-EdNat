# Definition des specs de la page FORMPREVIZUALIZER pour gerer les états

## Affichage de cette page

**Conditions Genereales d'affichage de la page :**

1. si User connecté on affiche la page
2. sinon on demande a se connecter

**Affichage**

1. le formulaire qui contient chaque question reponse
2. bouton retour => /builder/component/id
3. bouton submit qui enregistre en bdd => /homepage

### Question sur cette page

### Besoin de cette page

si user est connecte
le formulaire complet

### State de cette page

```js
isConnected = true, false

form ( form complet )
```
