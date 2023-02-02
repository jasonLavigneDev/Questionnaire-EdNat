# Définition des specs de la page FORMINTRO pour gérer les états

## Affichage de cette page

**Conditions Générales d'affichage de la page :**

Si User connecté on affiche la page, sinon on demande à se connecter.

**Affichage**

- Input de type text pour le _titre du formulaire_ (requis)
- Input de type text pour la _description du formulaire_ (optionnel)
- Checkbox _public_ : si coché => checkbox _groupe_ inactivé et les groupes ajoutés sont remis à 0
- Checkbox _groupe_ :
  - si coché => checkbox _public_ inactivé
  - si coché et pas de groupes dispo => affichage texte _PAS DE GROUPE_
  - si coché et groupes dispo => affichage select avec liste des groupes dispo + affichage boutton _Ajouter_
  - Clic sur _Ajouter_ => affichage du groupe en dessous et suppression du groupe du select
  * si checkbox _groupe_ décoché => remise à 0 des groupes ajoutés
- Select des groupes dispo (affichage conditionnel)
- Card des groupes ajoutés avec bouton de suppression (affichage conditionnel)

- Bouton _suivant_ : si champ manquant requis => inactif, => `/builder/components/id`

### Question sur cette page

### Besoin de cette page

- Savoir si un user est connecte ou non
- Savoir si le user connecté a des groupes
- Savoir si des champs required sont présents et remplis

### State de cette page

```js
isConnected = true, false

user.groups ? [group] : null

titleIsRequired = true, false (defini par le programme)
descIsRequired = true,false (defini par le programme)

form{
title,
desc,
isOnlyGroup = true , false
isPublic = true, false
groups = [group] : []
}
```
