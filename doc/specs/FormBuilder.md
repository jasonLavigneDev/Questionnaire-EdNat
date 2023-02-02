# Definition des specs de la page FORMBUILDER pour gerer les états

## Affichage de cette page

**Conditions Genereales d'affichage de la page :**

1. si User connecté on affiche la page
2. sinon on demande a se connecter

**Affichage**

1. Select des differents type d input dispo
2. Au click sur un type d'input
   **Conditions** 1. Si input simple 1. input type texte pour le titre de la question 2. sinon 1. input type text pour le titre de la question 2. input de type texte pour une reponse a proposer
3. bouton +
   **Conditions** 1. si des champs required non remplit bouton disabled ( titre ) 2. sinon bouton ok
4. Au click sur le bouton +
   1. affichage de la reponse proposer en dessous
   2. garde en memoire le titre
   3. reset de l input de reponse
5. bouton valider
   1. si des champs required non remplit bouton disabled ( titre )
   2. sinon bouton ok
6. affichage a droite de la question avec pour chaque
   1. bouton up qui permet de passer cette question au dessus de la precendte
   2. bouton down qui permet de passer cette question en dessous de la suivante
   3. bouton edit
      1. ouvre le builder correspondant a gauche avec en memoire le titre et les reponses déja enregistré
   4. bouton delete qui supprime cette question/Reponse
7. bouton retour => /builder/intro
   1. garde en memoire tout le travail déja fais
8. bouton suivant => /builder/previzzualizer

### Question sur cette page

### Besoin de cette page

User connecte ou non
type d input choisi
champs required ou pas
au clique sur edit connaitre quel builder est associé et les infos déja presentes
au clique sur retour garder en memoire toutes les infos

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
