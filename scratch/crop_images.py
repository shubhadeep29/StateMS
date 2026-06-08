import os
from PIL import Image

# Directories
src_dir = "/Users/suvo/.gemini/antigravity/brain/ae0e7792-7da2-40bd-bcb9-f4b8127e91e8"
dest_dir = "/Users/suvo/Developer/Project/StateMS/public/assets"

# Files mapping
files_map = {
    "media__1780894361071.jpg": "pharmacy_hero.png",
    "media__1780894361072.jpg": "shop_counter.png",
    "media__1780894361077.jpg": "shop_shelves.png",
    "media__1780894361081.jpg": "waiting_area.png",
    "media__1780894361082.jpg": "consultation_room.png"
}

# Process each image
for src_name, dest_name in files_map.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    
    if os.path.exists(src_path):
        print(f"Processing {src_name} -> {dest_name}...")
        with Image.open(src_path) as img:
            width, height = img.size
            # Crop 45 pixels from the bottom to remove the watermark (1024x461 -> 1024x416)
            crop_box = (0, 0, width, height - 45)
            cropped_img = img.crop(crop_box)
            cropped_img.save(dest_path, "PNG")
            print(f"Saved cropped image to {dest_path}")
    else:
        print(f"Source file not found: {src_path}")
