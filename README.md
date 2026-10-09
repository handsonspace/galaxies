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

Each QR code points to the address of the galaxy folder, for example
`https://handsonspace.github.io/galaxies/sombrero/`.
You can add `#fr`, `#it` or `#en` at the end of the address to force a language.

The script `tools/make_qr.py` makes the codes for you from the list in `assets/galaxies.js`:

1. Install the QR library once: `pip3 install "qrcode[pil]"`
2. In the Terminal, go to this folder and run `python3 tools/make_qr.py`
3. The codes appear in a new folder `qr_codes`: an SVG for print layouts and a PNG with the galaxy name.

Run `python3 tools/make_qr.py sombrero` to make only the codes you name.

## Visit statistics

Visits are counted with GoatCounter (free, no cookies): https://handsonspace.goatcounter.com
Every page needs this line just before `</body>`, so copy it into each new galaxy page
(it is already there if you copy the sombrero folder):

```
<script data-goatcounter="https://handsonspace.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
```

## Image credits

Sombrero (Hubble): ESA/Hubble & NASA, K. Noll. Check the credit line of each image on esawebb.org, esahubble.org or the Euclid pages of ESA.
