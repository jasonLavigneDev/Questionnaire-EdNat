# Définition des specs de la page FORMBUILDER pour gérer les états

## Affichage de cette page

**Conditions Générales d'affichage de la page :**

Si User connecté on affiche la page, sinon on demande à se connecter.

**Affichage**

- Select des differents type d'input dispo
- Au click sur un type d'input :
  - input type texte pour le titre de la question
  - input de type texte pour une reponse à proposer (selon le type)
  - bouton + (inactif si champs requis manquants), clic le bouton =>
    - affichage de la réponse proposée en dessous
    - garde en mémoire le titre
    - reset de l'input de réponse
- Bouton _valider_ (inactif si champs requis manquants) => action ??
- Affichage à droite de la question avec pour chacune :

  - bouton _up_ => passer cette question au dessus de la précédente
  - bouton _down_ => passer cette question en dessous de la suivante
  - bouton _edit_ => ouvre le builder correspondant à gauche avec en mémoire le titre et les réponses déja enregistrées
  - bouton _delete_ => supprime cette question

- Bouton _retour_ => `/builder/intro` (garde en mémoire tout le travail déja fait)
- Bouton _suivant_ => `/builder/previzzualizer`

### Question sur cette page

### Besoin de cette page

- User connecté ou non
- Type d'input choisis
- Champs required ou pas
- Au clic sur _edit_ : connaitre quel builder est associé et les infos déja presentes
- Au clic sur _retour_ : garder en mémoire toutes les infos

### State de cette page

```js
isConnected = true, false

titleIsRequired = true, false (defini par le programme)
descIsRequired = true, false (defini par le programme)

form{
...form, ( les infos du form en cas de clique sur retour)
// ...form correspond a
title,
desc,
isOnlyGroup = true , false
isPublic = true, false
groups = [group] : []
//
components:[{input}] ( mise a jour du tableau avec chaque input )
}

input{
title,
answerIsRequired = true, false (defini par le owner du form)
options = [reponses possible]
}
```
