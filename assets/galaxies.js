// Galaxienkreisel: the list of galaxies shown on the home page.
// To add a galaxy, copy one block below and change it.
//   slug:      the folder name of its page (letters and numbers only, e.g. "sombrero")
//   telescope: "webb", "hubble" or "euclid"
//   image:     the round picture in the images folder
//   ready:     true when its page exists, false to show it as "coming soon"
//   name:      the name in each language
window.GALAXIES = [
  {
    slug: "sombrero",
    telescope: "hubble",
    image: "images/sombrero.webp",
    ready: true,
    name: {
      de: "Sombrerogalaxie",
      fr: "Galaxie du Sombrero",
      it: "Galassia Sombrero",
      en: "Sombrero Galaxy"
    }
  },
  {
    slug: "webbcluster",
    telescope: "webb",
    image: "images/webb_cluster.webp",
    ready: false,
    name: {
      de: "Galaxienhaufen",
      fr: "Amas de galaxies",
      it: "Ammasso di galassie",
      en: "Galaxy cluster"
    }
  }
];
