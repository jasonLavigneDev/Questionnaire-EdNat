# Definition des specs de la HOMEPAGE pour gerer les états

## Affichage de cette page

**Conditions Generales d'affichage de la page :**

1. si User connecté on affiche la page
2. sinon on demande a se connecter

**Affichage**
Bouton nouveau Questionnaire qui redirige vers /builder/intro
Liste des formulaires qui nous appartient

Pour chaque formulaire qui nous appartient

1. Bouton de visualisation des reponses
   **Conditions :** 1. Si il y a des reponses => /answers/id 2. Sinon bouton disabled

2. bouton de Modification du formulaire
   **Conditions:** 1. EN ATTENTE DE DISCUSSION 2. Possibilitées: 3. CHOIX1: 1. Si il y a des reponses , duplication du formulaire ( enregistrement sous nouveau id ) 1. Si pas de reponses , modification du form existant 4. CHOIX2: 1. 1bouton edition , qui modifie le form actuel ( avec ou sans reponses ) 1. 1 bouton dupliquer , qui duplique le form et enregistre sous nouveau id .
3. bouton de supression du formulaire
4. bouton de generation de l'url du form

### Question sur cette page

Le bouton de modification du formulaire ( attente de precision )
Le bouton de reponse ( va t on repondre a nos propres formulaires )
La liste des formulaire ( on affiche NOS formulaire ou ceux qu'il faut repondre ? )

### Besoin de cette page

Savoir si user est connecte ou non
Connaitre la liste des formulaire de cet user ????
Pour chaque formulaire savoir si il contient des réponses ??????

### State de cette page

```js
isConnected = true, false

forms = [form.userId] : null
```
