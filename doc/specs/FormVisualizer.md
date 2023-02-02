# Definition des specs de la page FORMVIZUALIZER ( page permettant de repondre au formulaire ) pour gerer les états

## Affichage de cette page

**Conditions Genereales d'affichage de la page :**

1. si Form public on affiche la page
2. sinon si user connecte on affiche la page
3. sinon on demande a se connecter
4. si form a défini qu'on peut modifier les reponses
5. affichage si on a deja repondu
6. sinon MESSAGE VOUS AVEZ DEJA REPONDU

**Affichage**

1. le formulaire qui contient chaque question reponse
2. bouton submit qui enregistre les reponses en bdd => Message MERCI DAVOIR REPONDU
   **Conditions**
3. Si user connecte bouton ok
4. sinon 1. affichage input text pour saisie du nom public 2. bouton submit disabled tant que nom public non renseigné

### Question sur cette page

### Besoin de cette page

si user est connecte
si form public
si user public a donné son nom
si user a déja repondu
si form autorise de modifier les reponses
le formulaire complet

### State de cette page

```js
isConnected = true, false

form.isPublic = true, false
form.canOverWriteAnswers = true, false ( defini par owner form)
form ( le form complet )
form.components.input.answerIsRequired = true, false

publicUser.name
user.hasAlreadyRespond = true,false

userAnswer [answers]
answer = {
questionTitle,
answer = string ou [choice] ou null
}
```
