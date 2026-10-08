# Galaxienkreisel

Galaxy pages for the Galaxienkreisel spinner activity, in German, French, Italian and English.
Each spinner gets a sticker with a QR code that opens the page of its galaxy.

## What is in this folder

* `index.html` is the home page with all galaxies, grouped by telescope.
* `sombrero/index.html` is the page for one galaxy. Every galaxy has its own folder.
* `images/` holds the round galaxy pictures.
* `assets/galaxies.js` is the list of galaxies shown on the home page.
* `assets/site.css` is the design, shared by all pages.
* `assets/i18n.js` handles the language buttons. The page opens in the language of the phone and remembers the choice.

## How to add a new galaxy

1. Put its round picture in `images/`, for example `images/whirlpool.webp`.
2. Copy the folder `sombrero` and rename the copy, for example `whirlpool`.
3. In the new `whirlpool/index.html`, change the picture path and the texts in the four languages (look for `var T = {` near the bottom). The text at the top of the file is only what shows before the language is chosen, so change it to the German text too.
4. In `assets/galaxies.js`, copy one block, set `slug: "whirlpool"`, the telescope (`"webb"`, `"hubble"` or `"euclid"`), the image and the four names, and set `ready: true`.
5. Upload the changes. After a minute the page is live at `https://handsonspace.github.io/galaxies/whirlpool/`.

## QR codes

Make each QR code from the address of the galaxy folder, for example
`https://handsonspace.github.io/galaxies/sombrero/`.
You can add `#fr`, `#it` or `#en` at the end of the address to force a language.

## Image credits

Sombrero (Hubble): ESA/Hubble & NASA, K. Noll. Check the credit line of each image on esawebb.org, esahubble.org or the Euclid pages of ESA.
