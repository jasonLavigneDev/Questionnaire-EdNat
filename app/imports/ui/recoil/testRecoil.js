import { atom, selector } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID
  default: 'je suis un texte de test',
});

const charCountState = selector({
  key: 'charCountState', // unique ID
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

const toUpperCase = selector({
  key: 'toUpperCase',
  get: ({ get }) => get(textState),
  set: ({ set }, newValue) => set(textState, newValue.toUpperCase()),
});

const toLowerCase = selector({
  key: 'toLowerCase',
  get: ({ get }) => get(textState),
  set: ({ set }, newValue) => set(textState, newValue.toLowerCase()),
});

export { textState, charCountState, toUpperCase, toLowerCase };

/**
 1 atom est un simple state 
 on peut acceder a sa valeur avec useRecoilValue ( lecture seule )
 on peut acceder a son setter avec useSetRecoilState ( ecriture seule)
 on peut acceder a sa valeur + son setter avec useRecoilState ( lecture + ecriture )
 on peut reset sa value avec useResetRecoilState

 1 selector est un ensemble de fonctions pour changer la facon d interagir avec l atom
 via la methode get du selector 
 on recupere les valeurs necessaire a la mutation
 on peut ensuite retourner une nouvelle valeur avec la valeur récupéré 
 via la methode set du selector
 on met a jour l'atom avec la fonction définie
 */
