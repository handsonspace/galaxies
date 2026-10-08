"""
Make QR codes for the galaxy pages.

It reads the galaxy list in assets/galaxies.js, so the codes always match the website.
For every galaxy that is ready it creates, in the folder qr_codes:
  * <slug>.svg        the plain code, sharp at any size (best for print layouts)
  * <slug>_label.png  the code with the galaxy name underneath (handy for sticker sheets)

Install once:   pip3 install "qrcode[pil]"
Run:            python3 tools/make_qr.py              (all galaxies that are ready)
                python3 tools/make_qr.py sombrero     (only the ones you name)
"""

import re
import sys
from pathlib import Path

import qrcode
import qrcode.image.svg
from PIL import Image, ImageDraw, ImageFont

# The address of the website. Change it here if the site ever moves.
BASE_URL = "https://handsonspace.github.io/galaxies/"

# Name language printed under the code: "de", "fr", "it" or "en"
LABEL_LANG = "en"

REPO = Path(__file__).resolve().parent.parent
GALAXY_LIST = REPO / "assets" / "galaxies.js"
OUT = Path.cwd() / "qr_codes"


def read_galaxies():
    """Return a list of dicts with slug, ready and names, read from galaxies.js."""
    text = GALAXY_LIST.read_text(encoding="utf8")
    text = re.sub(r"^\s*//.*$", "", text, flags=re.M)  # drop the explanation comments
    galaxies = []
    # every galaxy block starts with slug: "..."
    for block in re.split(r"(?=\bslug\s*:)", text)[1:]:
        slug = re.search(r'slug\s*:\s*"([^"]+)"', block).group(1)
        ready = re.search(r"ready\s*:\s*(true|false)", block)
        names = dict(re.findall(r'\b(de|fr|it|en)\s*:\s*"([^"]*)"', block))
        galaxies.append({"slug": slug, "ready": bool(ready and ready.group(1) == "true"), "names": names})
    return galaxies


def load_font(size):
    for path in [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",   # Mac
        "/Library/Fonts/Arial Bold.ttf",                       # Mac
        "C:/Windows/Fonts/arialbd.ttf",                        # Windows
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" # Linux
    ]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size=size)


def make_codes(galaxy):
    url = BASE_URL + galaxy["slug"] + "/"
    label = galaxy["names"].get(LABEL_LANG) or galaxy["slug"]

    # H = highest error correction: still scans if the sticker gets scratched
    settings = dict(error_correction=qrcode.constants.ERROR_CORRECT_H, border=4)

    # 1. plain SVG
    svg = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, **settings)
    svg.save(OUT / f"{galaxy['slug']}.svg")

    # 2. PNG with the name underneath
    qr = qrcode.QRCode(box_size=40, **settings)
    qr.add_data(url)
    qr.make(fit=True)
    code = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    width, height = code.size
    font = load_font(int(width * 0.07))
    sheet = Image.new("RGB", (width, height + int(width * 0.13)), "white")
    sheet.paste(code, (0, 0))
    draw = ImageDraw.Draw(sheet)
    text_width = draw.textlength(label, font=font)
    draw.text(((width - text_width) / 2, height - width * 0.03), label, fill="black", font=font)
    sheet.save(OUT / f"{galaxy['slug']}_label.png", dpi=(600, 600))

    print(f"  {galaxy['slug']:<16} {url}")


def main():
    wanted = sys.argv[1:]
    galaxies = read_galaxies()
    if wanted:
        chosen = [g for g in galaxies if g["slug"] in wanted]
        missing = set(wanted) - {g["slug"] for g in chosen}
        if missing:
            print("Not found in galaxies.js:", ", ".join(sorted(missing)))
    else:
        chosen = [g for g in galaxies if g["ready"]]

    if not chosen:
        print("No galaxies to make codes for.")
        return

    OUT.mkdir(exist_ok=True)
    print(f"Making {len(chosen)} QR code(s) in {OUT}:")
    for galaxy in chosen:
        make_codes(galaxy)
    print("Done. Scan one printed test sticker before printing a whole batch.")


if __name__ == "__main__":
    main()
