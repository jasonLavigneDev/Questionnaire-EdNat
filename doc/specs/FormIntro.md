# Definition des specs de la page FORMINTRO pour gerer les états

## Affichage de cette page

**Conditions Genereales d'affichage de la page :**

1. si User connecté on affiche la page
2. sinon on demande a se connecter

**Affichage**

1. input de type text pour le titre du formulaire ( requis ou non )
2. input de type text pour la description du formulaire ( optionnel )
3. checkbox public
   **Conditions :** 1. Si coché , checkbox groupe disabled 2. Si coché , les groupes add sont remis a 0

4. checkbox groupe
   **Conditions :** 1. Si coché , checkbox public disabled 2. Si coché et pas de groupes , affichage texte PAS DE GROUPE 3. Si coché et groupes dispo, affichage select avec liste des groupes dispo et affichage boutton ADD 1. Au click sur ADD , affichage du groupe en dessous du select 2. Au click sur ADD , retirer ce groupe du select 3. Si checkbox groupe décoché ou disabled , remis a 0 des groupes ADD
5. select des groupes dispo

6. bouton suivant
   **Conditions :** 1. Si champ manquant disabled 2. Sinon => /builder/components/id

### Question sur cette page

### Besoin de cette page

Savoir si user est connecte ou non
Savoir si user a des groupes
Savoir si des champs required sont presents et rempli

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
