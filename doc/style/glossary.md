# Lexique d'utilisation pour les classes CSS:

## Introduction

Pour bien comprendre comment utiliser efficassement les classes d'aide CSS voici un point de départ.
Dans la majorité des cas la composition d'une classe est la suivante :

**nom de l'attribut**-**valeur et unité**

Example : Si je veux aligner mon contenu verticalement au centre voici ce qu'il faut mettre :
**ali-center**
Cela équivaut à align-items : center;
ali : align-items
center : center (la valeur)

Pour ce qui concerne notemment les marges et padding il faut parfois préciser droit, gauche haut et bas. Pour ce faire rien de plus simple: r l t b (right left top bottom).
Exemple si je veux une marge en haut de 10 pixels il faut mettre :
**mt-10px**
Cela équivaut à margin-top: 10px

On peut aussi 'mélanger' les directions :
Si je veux une marge en haut de 10 pixels et en bas aussi je peux mettre :
**mtb-10px**
Cela équivaut à margin-top: 10px et margin-bottom: 10px ou simplement margin: 1Opx 0;

**Unités**
Voici les principales unités que l'on peut retrouver dans les classes :

- px
- vh
- vw
- pct (%)
- rem

## Lexique des classes

### Padding

pad-**value**
padt-**value**
padr-**value**
padb-**value**
padl-**value**
padlr-**value**
padtb-**value**

### Marge

m-**value**
mt-**value**
mr-**value**
mb-**value**
ml-**value**
mlr-**value**
mtb-**value**

### Width

wd-**value**
maxWd-**value**

### Height

ht-**value**
maxHt-**value**

### Justify Content / Items

jc-**value**
ji-**value**

### Align / text align

ali-**value**
txtAli-**value**

### Flex

flex
center
column
row
flex-**value**

### Position

pos-**value**
top-**value**

### Color

color-**value**
color-**salmon**
color-**green**
color-**black**
color-**red**

### Autre

border
opac-**value**
txtTrans-**value**
