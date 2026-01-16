#!/usr/bin/env python3
"""Generate template images for the canvas creator at 1060x2000px"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory if it doesn't exist
output_dir = "projects/app/public/templates"
os.makedirs(output_dir, exist_ok=True)

def create_messages_template():
    """Create the messages/chat template"""
    width, height = 1060, 2000
    img = Image.new('RGB', (width, height), color='#f5f5f5')
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fall back to default
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 36)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Top message card
    draw.rounded_rectangle([40, 80, 1020, 480], radius=20, fill='white', outline='#e0e0e0', width=2)
    draw.text((60, 130), "NAME", fill='#999999', font=font_small)
    draw.line([(60, 155), (1000, 155)], fill='#cccccc', width=2)
    draw.text((60, 200), "MESSAGE", fill='#999999', font=font_small)
    for y in [240, 290, 340, 390]:
        for x in range(60, 1000, 10):
            draw.line([(x, y), (x+5, y)], fill='#e0e0e0', width=1)
    
    # User avatar (left)
    draw.ellipse([40, 550, 140, 650], fill='#d0d0d0')
    
    # Middle message card (right-aligned)
    draw.rounded_rectangle([40, 720, 1020, 1120], radius=20, fill='white', outline='#e0e0e0', width=2)
    draw.text((920, 770), "NAME", fill='#999999', font=font_small, anchor="rt")
    draw.line([(60, 795), (1000, 795)], fill='#cccccc', width=2)
    draw.text((920, 840), "MESSAGE", fill='#999999', font=font_small, anchor="rt")
    for y in [880, 930, 980, 1030]:
        for x in range(60, 1000, 10):
            draw.line([(x, y), (x+5, y)], fill='#e0e0e0', width=1)
    
    # User avatar (right)
    draw.ellipse([920, 1150, 1020, 1250], fill='#d0d0d0')
    
    # Bottom message card
    draw.rounded_rectangle([40, 1360, 1020, 1510], radius=20, fill='white', outline='#e0e0e0', width=2)
    for y in [1410]:
        for x in range(60, 1000, 10):
            draw.line([(x, y), (x+5, y)], fill='#e0e0e0', width=1)
    
    # User avatar (left)
    draw.ellipse([40, 1490, 140, 1590], fill='#d0d0d0')
    
    # Transition arrows at bottom
    draw.ellipse([115, 1815, 185, 1885], outline='#e0e0e0', width=2)
    draw.polygon([(140, 1850), (155, 1840), (155, 1860)], fill='#999999')
    draw.text((530, 1865), "T R A N S I T I O N", fill='#999999', font=font_small, anchor="mm")
    draw.ellipse([875, 1815, 945, 1885], outline='#e0e0e0', width=2)
    draw.polygon([(920, 1850), (905, 1840), (905, 1860)], fill='#999999')
    
    img.save(os.path.join(output_dir, "template-messages.png"))
    print("Created template-messages.png")

def create_map_template():
    """Create the map template"""
    width, height = 1060, 2000
    img = Image.new('RGB', (width, height), color='#f5f5f5')
    draw = ImageDraw.Draw(img)
    
    try:
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
    except:
        font_small = ImageFont.load_default()
    
    # Coastline (left)
    points = [(100, 200), (150, 400), (140, 600), (130, 800), (160, 1000), (190, 1200), (170, 1400)]
    draw.line(points, fill='#999999', width=3)
    
    # Territory line (right)
    points = [(700, 100), (750, 300), (760, 500), (770, 700), (750, 900), (730, 1100), (780, 1300)]
    draw.line(points, fill='#999999', width=2)
    
    # Islands
    draw.ellipse([740, 220, 860, 380], fill='#e0e0e0', outline='#999999', width=2)
    draw.ellipse([700, 655, 820, 785], fill='#e0e0e0', outline='#999999', width=2)
    draw.ellipse([730, 1035, 830, 1165], fill='#e0e0e0', outline='#999999', width=2)
    
    # Small scattered islands
    draw.ellipse([625, 1275, 675, 1325], fill='#e0e0e0', outline='#999999', width=2)
    draw.ellipse([685, 1405, 755, 1495], fill='#e0e0e0', outline='#999999', width=2)
    draw.ellipse([480, 1530, 520, 1570], fill='#e0e0e0', outline='#999999', width=2)
    
    # Transition arrows at bottom
    draw.ellipse([115, 1815, 185, 1885], outline='#e0e0e0', width=2)
    draw.polygon([(140, 1850), (155, 1840), (155, 1860)], fill='#999999')
    draw.text((530, 1865), "T R A N S I T I O N", fill='#999999', font=font_small, anchor="mm")
    draw.ellipse([875, 1815, 945, 1885], outline='#e0e0e0', width=2)
    draw.polygon([(920, 1850), (905, 1840), (905, 1860)], fill='#999999')
    
    img.save(os.path.join(output_dir, "template-map.png"))
    print("Created template-map.png")

if __name__ == "__main__":
    create_messages_template()
    create_map_template()
    print("Templates generated successfully!")
