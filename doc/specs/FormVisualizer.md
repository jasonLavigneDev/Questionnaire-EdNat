# Définition des specs de la page FORMVISUALIZER (page permettant de répondre au formulaire) pour gérer les états

## Affichage de cette page

**Conditions Générales d'affichage de la page :**

- Si Form public ou user connecté => on affiche la page
- Sinon on demande à se connecter ou bien un email
- Si on peut modifier les reponses => affichage des réponses déjà fournies
- Sinon MESSAGE VOUS AVEZ DEJA REPONDU

**Affichage**

- Formulaire qui contient chaque questions/réponses
- Bouton _submit_ qui enregistre les réponses en bdd => Message _MERCI DAVOIR REPONDU_
- Si formulaire public : input text pour saisie du nom public et bouton _submit_ disabled tant que nom public non
  renseigné

### Question sur cette page

- Peut-on modifier les réponses déjà données ?
- Si oui est-ce une option du formulaire ?

### Besoin de cette page

- user connecté
- nom du user si form public
- form complet avec réponses et options

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
