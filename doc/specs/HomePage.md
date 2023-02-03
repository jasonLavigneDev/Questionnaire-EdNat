# Définition des specs de la HOMEPAGE pour gérer les états

## Affichage de cette page

**Conditions Générales d'affichage de la page :**

Si User connecté on affiche la page, sinon on demande à se connecter.

**Affichage**

- Bouton _nouveau Questionnaire_ qui redirige vers `/builder/intro`
- Liste des formulaires qui nous appartient, avec pour chacun les actions :

  - Bouton de _Visualisation des reponses_ s'il y en a => `/answers/id`, sinon ce bouton est inactif
  - Bouton de _Modification du formulaire_ (EN ATTENTE DE DISCUSSION) :

    1. Si il y a des reponses, duplication du formulaire (enregistrement sous nouveau id)
    2. Si pas de reponses, modification du form existant

    OU :

    1.  Bouton _Édition_ qui modifie le form actuel (avec ou sans reponses)
    2.  Bouton _Dupliquer_ qui duplique le form et enregistre sous nouveau id

  - Bouton de _Supression du formulaire_
  - Bouton de _Copie de l'url du form dans le presse papier_

### Question sur cette page

- Le bouton de modification du formulaire (attente de precision)
- Le bouton de réponse (va t on repondre a nos propres formulaires)

### Besoin de cette page

- Savoir si user est connecté ou non
- Connaitre la liste des formulaires de ce user
- Pour chaque formulaire savoir si il contient des réponses

### State de cette page

```js
isConnected = true, false

forms = [form.userId] : null
```
