"""Gera as animações em pixel art usadas pelo README do Astery Connect."""

from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageEnhance, ImageFont
except ImportError as error:
    raise SystemExit("Instale a dependência com: python -m pip install Pillow") from error


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "docs" / "assets"
SOURCE_COVER = ASSETS / "capa-retro.png"
SOURCE_ARCHITECTURE = ASSETS / "arquitetura-base.png"
TEAM_AVATARS = {
    "carla": ASSETS / "carla-avatar.png",
    "kaylanne": ASSETS / "kaylanne-avatar.png",
}

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


def architecture_card(draw, y, title, class_name, description, active=False):
    x1, x2 = 92, 508
    fill = "#f9d2e2" if active else "#fff8fa"
    title_fill = HOT_PINK if active else "#e99abb"
    shadow = "#9b456b"

    draw.rectangle((x1 + 3, y + 3, x2 + 3, y + 53), fill=shadow)
    draw.rectangle((x1, y, x2, y + 50), fill=fill, outline=BURGUNDY, width=2)
    draw.rectangle((x1 + 2, y + 2, x1 + 132, y + 48), fill=title_fill)
    draw.line((x1 + 134, y + 3, x1 + 134, y + 47), fill=BURGUNDY, width=2)

    draw.text((x1 + 67, y + 14), title, anchor="mm", font=pixel_font(12, True), fill=WHITE)
    draw.text((x1 + 67, y + 34), class_name, anchor="mm", font=pixel_font(8, True), fill=BURGUNDY)
    draw.text((x1 + 151, y + 12), description[0], font=pixel_font(10, True), fill=BURGUNDY)
    draw.text((x1 + 151, y + 30), description[1], font=pixel_font(9), fill="#8f5370")

    if active:
        pixel_sparkle(draw, x2 - 13, y + 11, "#fff1a8", 1)


def architecture_frame(active):
    if not SOURCE_ARCHITECTURE.exists():
        raise SystemExit(f"Moldura-base não encontrada: {SOURCE_ARCHITECTURE}")

    source = Image.open(SOURCE_ARCHITECTURE).convert("RGB")
    source = source.resize((600, 338), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(source)

    draw.text((112, 45), "ARQUITETURA EM CAMADAS", font=pixel_font(14, True), fill=BURGUNDY)

    cards = [
        ("INTERFACE", "Screens", ("Exibe e recebe ações", "HomeScreen, ChatScreen e Mensagem")),
        ("SERVICE", "MensagemService", ("Aplica as regras de negócio", "Valida, cria e encaminha mensagens")),
        ("REPOSITORY", "MensagemRepository", ("Gerencia os dados em memória", "Consulta mensagens por contato")),
    ]
    positions = [83, 166, 249]
    for index, (card, y) in enumerate(zip(cards, positions)):
        architecture_card(draw, y, *card, active=index == active)

    for y in (143, 226):
        draw.line((300, y, 300, y + 15), fill=HOT_PINK, width=3)
        draw.polygon([(294, y + 13), (306, y + 13), (300, y + 20)], fill=HOT_PINK)

    return source.resize((1200, 676), Image.Resampling.NEAREST)


def save_architecture_animation():
    frames = [architecture_frame(index) for index in range(3)]
    frames[0].save(
        ASSETS / "arquitetura-retro.gif",
        save_all=True,
        append_images=frames[1:],
        duration=[1100, 1100, 1400],
        loop=0,
        optimize=False,
        disposal=2,
    )


def team_frame(avatars, frame_index):
    canvas = Image.new("RGB", (600, 330), "#e8c9f3")
    draw = ImageDraw.Draw(canvas)

    for position in range(0, 600, 12):
        draw.line((position, 0, position, 330), fill="#d7afe8")
    for position in range(0, 330, 12):
        draw.line((0, position, 600, position), fill="#d7afe8")

    draw.rectangle((17, 17, 589, 319), fill="#5d2443")
    draw.rectangle((12, 12, 584, 314), fill="#fff4f8", outline=BURGUNDY, width=3)
    draw.rectangle((15, 15, 581, 48), fill=PINK)
    draw.line((15, 50, 581, 50), fill=BURGUNDY, width=3)
    draw.text((28, 23), "integrantes.exe", font=pixel_font(13, True), fill=BURGUNDY)

    for x, symbol in [(516, "_"), (539, "o"), (562, "x")]:
        draw.rectangle((x, 20, x + 15, 35), fill=CREAM, outline=BURGUNDY, width=2)
        draw.text((x + 7, 27), symbol, anchor="mm", font=pixel_font(8, True), fill=BURGUNDY)

    members = [
        ("carla", "Carla Cristina", "Sousa Araújo"),
        ("kaylanne", "Kaylanne de Jesus", "Sousa Satiro"),
    ]
    for index, (key, first_line, second_line) in enumerate(members):
        x = 40 + index * 270
        active = index == frame_index % 2
        border = HOT_PINK if active else BURGUNDY

        draw.rectangle((x + 4, 67, x + 244, 298), fill="#8f4568")
        draw.rectangle((x, 63, x + 240, 294), fill="#f9d7e5", outline=border, width=3)
        draw.rectangle((x + 9, 72, x + 231, 239), fill="#241229", outline=BURGUNDY, width=2)

        icon = avatars[key].resize((162, 162), Image.Resampling.NEAREST)
        canvas.paste(icon, (x + 39, 75))

        draw.rectangle((x + 9, 247, x + 231, 286), fill="#fff6f9", outline=BURGUNDY, width=2)
        status_color = "#f0629a" if active else "#9b456b"
        draw.rectangle((x + 19, 257, x + 25, 263), fill=status_color)
        draw.text((x + 120, 256), first_line, anchor="mm", font=pixel_font(10, True), fill=BURGUNDY)
        draw.text((x + 120, 274), second_line, anchor="mm", font=pixel_font(9, True), fill="#8f5370")

    sparkle_positions = [(27, 74), (573, 289), (27, 287), (573, 72)]
    sparkle_x, sparkle_y = sparkle_positions[frame_index % len(sparkle_positions)]
    pixel_sparkle(draw, sparkle_x, sparkle_y, "#fff1a8", 1)

    return canvas.resize((1200, 660), Image.Resampling.NEAREST)


def save_team_animation():
    avatars = {}
    for name, source_path in TEAM_AVATARS.items():
        if not source_path.exists():
            raise SystemExit(f"Avatar não encontrado: {source_path}")
        avatars[name] = Image.open(source_path).convert("RGB")

    frames = [team_frame(avatars, index) for index in range(4)]
    frames[0].save(
        ASSETS / "integrantes.gif",
        save_all=True,
        append_images=frames[1:],
        duration=[620, 620, 620, 820],
        loop=0,
        optimize=False,
        disposal=2,
    )


if __name__ == "__main__":
    save_cover_animation()
    save_architecture_animation()
    save_team_animation()
    print(f"Assets retrô gerados em {ASSETS}")
