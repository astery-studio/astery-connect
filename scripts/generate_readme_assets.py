"""Gera as animações em pixel art usadas pelo README do Astery Connect."""

from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageEnhance, ImageFont
except ImportError as error:
    raise SystemExit("Instale a dependência com: python -m pip install Pillow") from error


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "docs" / "assets"
SOURCE_COVER = ASSETS / "capa-retro.png"

CREAM = "#fff5f7"
PALE_PINK = "#fbd3e2"
PINK = "#ef8db3"
HOT_PINK = "#dc5a91"
BURGUNDY = "#6e2948"
WHITE = "#fffafb"


def pixel_font(size, bold=False):
    filename = "consolab.ttf" if bold else "consola.ttf"
    return ImageFont.truetype(str(Path("C:/Windows/Fonts") / filename), size)


def pixel_sparkle(draw, x, y, color, scale=2):
    draw.rectangle((x - scale, y - 3 * scale, x + scale, y + 3 * scale), fill=color)
    draw.rectangle((x - 3 * scale, y - scale, x + 3 * scale, y + scale), fill=color)
    draw.rectangle((x - scale, y - scale, x + scale, y + scale), fill=CREAM)


def save_cover_animation():
    if not SOURCE_COVER.exists():
        raise SystemExit(f"Arte-base não encontrada: {SOURCE_COVER}")

    source = Image.open(SOURCE_COVER).convert("RGB")
    source.thumbnail((1200, 620), Image.Resampling.LANCZOS)
    base = Image.new("RGB", (1200, 600), PALE_PINK)
    base.paste(source, ((1200 - source.width) // 2, (600 - source.height) // 2))

    frames = []
    sparkle_sets = [
        [(100, 120), (520, 90), (1130, 360)],
        [(220, 470), (620, 500), (1080, 100)],
        [(60, 300), (580, 150), (1160, 500)],
        [(300, 80), (720, 520), (1040, 260)],
    ]

    for index, positions in enumerate(sparkle_sets):
        frame = ImageEnhance.Brightness(base).enhance(1.0 + (0.015 if index % 2 else 0))
        draw = ImageDraw.Draw(frame)
        for x, y in positions:
            pixel_sparkle(draw, x, y, WHITE, 2)

        # Cursor piscando no balão: detalhe conceitual, não uma UI final.
        if index % 2:
            draw.rectangle((805, 378, 811, 411), fill=HOT_PINK)
        frames.append(frame)

    frames[0].save(
        ASSETS / "capa-retro.gif",
        save_all=True,
        append_images=frames[1:],
        duration=[520, 520, 520, 720],
        loop=0,
        optimize=True,
    )


def window(draw, box, title, active=False):
    x1, y1, x2, y2 = box
    draw.rectangle((x1 + 5, y1 + 5, x2 + 5, y2 + 5), fill=BURGUNDY)
    draw.rectangle(box, fill=CREAM, outline=BURGUNDY, width=3)
    draw.rectangle((x1 + 3, y1 + 3, x2 - 3, y1 + 27), fill=HOT_PINK if active else PINK)
    draw.line((x1 + 3, y1 + 29, x2 - 3, y1 + 29), fill=BURGUNDY, width=3)
    draw.text((x1 + 10, y1 + 7), title, font=pixel_font(12, True), fill=WHITE if active else BURGUNDY)
    for offset, symbol in [(58, "_"), (35, "o"), (12, "x")]:
        bx = x2 - offset
        draw.rectangle((bx, y1 + 7, bx + 17, y1 + 22), fill=CREAM, outline=BURGUNDY, width=2)
        draw.text((bx + 8, y1 + 13), symbol, anchor="mm", font=pixel_font(9, True), fill=BURGUNDY)


def architecture_frame(active):
    small = Image.new("RGB", (550, 230), "#f7d8e8")
    draw = ImageDraw.Draw(small)

    for x in range(0, 550, 12):
        draw.line((x, 0, x, 230), fill="#efc6dc")
    for y in range(0, 230, 12):
        draw.line((0, y, 550, y), fill="#efc6dc")

    draw.rectangle((15, 12, 535, 216), fill="#fdebf2", outline=BURGUNDY, width=3)
    draw.rectangle((18, 15, 532, 43), fill=PINK)
    draw.text((32, 23), "camadas.exe", font=pixel_font(14, True), fill=BURGUNDY)
    draw.text((430, 23), "_  o  x", font=pixel_font(13, True), fill=BURGUNDY)

    layers = [
        ("INTERFACE", "telas e componentes"),
        ("SERVICO", "regras de negocio"),
        ("REPOSITORIO", "dados em memoria"),
    ]
    xs = [28, 202, 376]
    for index, ((title, description), x) in enumerate(zip(layers, xs)):
        window(draw, (x, 72, x + 145, 172), title, index == active)
        words = description.split(" ")
        split = 2 if len(words) > 2 else 1
        draw.text((x + 72, 121), " ".join(words[:split]), anchor="mm", font=pixel_font(10), fill=BURGUNDY)
        if words[split:]:
            draw.text((x + 72, 139), " ".join(words[split:]), anchor="mm", font=pixel_font(10), fill=BURGUNDY)

    draw.text((190, 118), ">", anchor="mm", font=pixel_font(20, True), fill=HOT_PINK)
    draw.text((364, 118), ">", anchor="mm", font=pixel_font(20, True), fill=HOT_PINK)
    pixel_sparkle(draw, 39, 198, HOT_PINK, 1)
    pixel_sparkle(draw, 510, 195, "#aa83d0", 1)

    return small.resize((1100, 460), Image.Resampling.NEAREST)


def save_architecture_animation():
    frames = [architecture_frame(index) for index in range(3)]
    frames[0].save(
        ASSETS / "arquitetura-retro.gif",
        save_all=True,
        append_images=frames[1:],
        duration=[900, 900, 1200],
        loop=0,
        optimize=True,
    )


if __name__ == "__main__":
    save_cover_animation()
    save_architecture_animation()
    print(f"Assets retrô gerados em {ASSETS}")
