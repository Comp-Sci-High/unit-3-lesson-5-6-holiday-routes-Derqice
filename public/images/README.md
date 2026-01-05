# Image Assets Guide

## Directory: `/public/images/`

Place your image files in this directory. Currently set up with emoji fallbacks, but images will automatically load and replace emojis when provided.

## 🖼️ Recommended Image Specifications

### 1. Santa's Sleigh
- **Filename:** `sleigh.png`
- **Size:** 80 × 40 pixels
- **Format:** PNG with transparency
- **Description:** Red sleigh, festive design, side view
- **Fallback:** 🎅 emoji

### 2. Reindeer
- **Filename:** `reindeer.png`
- **Size:** 50 × 50 pixels
- **Format:** PNG with transparency
- **Description:** Side view, brown/tan color
- **Fallback:** 🦌 emoji
- **Note:** Single reindeer, will be duplicated in scene

### 3. Grinch Character
- **Filename:** `grinch.png`
- **Size:** 100 × 120 pixels
- **Format:** PNG with transparency
- **Description:** Standing pose, green character
- **Fallback:** 👹 emoji

### 4. Presents/Gifts
- **Filename:** `present.png`
- **Size:** 30 × 30 pixels
- **Format:** PNG with transparency
- **Description:** Gift box with ribbon
- **Fallback:** 🎁 emoji

### 5. Christmas Tree
- **Filename:** `tree.png`
- **Size:** 60 × 80 pixels
- **Format:** PNG with transparency
- **Description:** Pine tree, green with snow on top
- **Fallback:** CSS triangle (currently used)

### 6. House
- **Filename:** `house.png`
- **Size:** 120 × 100 pixels
- **Format:** PNG with transparency
- **Description:** Winter cottage, brown walls, red roof
- **Fallback:** CSS shapes (currently used)

## 🔄 How to Add Images

The website currently uses **emoji fallbacks** which work great! To replace with custom images:

### Option 1: Update HTML to use `<img>` tags
Find these elements and update:

```html
<!-- Current emoji version -->
<div class="santa-sleigh" id="santaSleigh">
  🎅 Sleigh
</div>

<!-- Updated with image -->
<img src="/images/sleigh.png" alt="Santa's Sleigh" class="santa-sleigh" id="santaSleigh">
```

### Option 2: Use CSS background-images
Update the CSS class:

```css
.santa-sleigh {
  background-image: url('/images/sleigh.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
```

## 📋 File Checklist

- [ ] `sleigh.png` - Santa's sleigh
- [ ] `reindeer.png` - Reindeer
- [ ] `grinch.png` - Grinch character
- [ ] `present.png` - Present/gift box
- [ ] `tree.png` - Christmas tree
- [ ] `house.png` - House/cottage

## 🎨 Design Recommendations

### Color Palette:
- **Primary Reds:** #FF4444, #CC0000
- **Greens:** #0D6B0D, #0A8A0A
- **Whites/Snows:** #FFFFFF, #F2F2F2
- **Golds:** #FFD700
- **Blues:** #0A1F4D, #1A4D99

### Animation-Friendly:
- Keep images centered with transparent backgrounds
- Avoid very high resolution (80x120px is plenty)
- PNG format for transparency support
- Square or rectangular shapes work best

### Emoji Fallbacks:
The site is fully functional with emoji! You don't HAVE to add images - the design works great with:
- 🎅 Santa
- 🦌 Reindeer
- 👹 Grinch
- 🎁 Presents
- 🌲 Trees
- 🏠 Houses

## 🚀 Quick Start

1. Create `/public/images/` folder (if not exists)
2. Add your PNG files to this folder
3. No code changes needed if using emoji fallbacks!
4. (Optional) Update HTML/CSS to reference image filenames

## 💻 Web-Safe Image Formats

**Recommended:** PNG
- **Pros:** Transparency, small file size, wide support
- **Cons:** None for this use case

**Alternative:** WebP
- **Pros:** Even smaller file size
- **Cons:** Older browser compatibility (add fallback)

**Not Recommended:** JPEG
- **Issue:** No transparency support

## 📐 Performance Tips

- Keep images under 50KB each
- Use "Optimize for web" before uploading
- Consider using a tool like TinyPNG for compression
- Lazy load images if adding many more

---

**Current Status:** ✅ Fully functional with emoji fallbacks  
**Enhancement Status:** 🎨 Ready for custom images anytime
