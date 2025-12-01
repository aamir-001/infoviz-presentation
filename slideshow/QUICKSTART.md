# 🚀 Quick Start Guide

## Run the Slideshow in 3 Steps

### Step 1: Open Terminal
Navigate to the slideshow folder:
```bash
cd d:\infoviz-presentation\slideshow
```

### Step 2: Start Local Server
Run one of these commands:

**Python (Recommended)**
```bash
python -m http.server 8000
```

**Node.js**
```bash
npx http-server -p 8000
```

**VS Code Live Server**
- Right-click `index.html` → "Open with Live Server"

### Step 3: Open Browser
Go to: **http://localhost:8000**

---

## 🎮 How to Navigate

### Using Mouse
- Click **← →** buttons at bottom

### Using Keyboard
- **Arrow Keys** or **Space Bar**: Next/Previous
- **Home/End**: Jump to first/last slide

---

## 📊 What You'll See

1. **Title Slide** - Team info
2. **Problem** - What we're exploring
3. **Context** - Why it matters
4. **Q5 Part 1** - Seasonal trends (Global + Europe charts)
5. **Q5 Part 2** - 5-year window analysis
6. **Q6** - Age & Gender demographics (pie charts)
7. **Q7 Part 1** - Top refugee hosts (bar chart)
8. **Q7 Part 2** - Top asylum destinations (bar chart)
9. **Conclusions** - Key findings

---

## ⚠️ Troubleshooting

### Charts Not Loading?
1. **Check console**: Press F12, look for errors
2. **Verify data folder**: Ensure `data/*.csv` files exist
3. **Use local server**: Don't open `file://` directly

### CORS Error?
You MUST use a local server (Python/Node/Live Server)

### Blank Page?
- Clear cache: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- Check browser console for errors

---

## 📝 Next Steps (For Your Teammates)

When your teammates finish Q1-Q4 and Q8-Q10:

1. **Add chart function** to `charts.js`
2. **Add HTML slide** to `index.html`
3. **Add case** to `slideshow.js` (renderChartsForSlide function)
4. **Update totalSlides** variable

See [README.md](README.md) for detailed instructions.

---

## 🎨 Customization Tips

### Change Colors
Edit `:root` variables in `style.css`:
```css
:root {
  --earth-dark: #5D4037;      /* Your color here */
  --terracotta: #D84315;      /* Your color here */
  /* ... */
}
```

### Edit Interpretation Text
Open `index.html`, find `.interpretation-panel` sections, edit the `<p>` and `<ul>` content.

### Adjust Transition Speed
In `style.css`, change:
```css
.slide {
  transition: opacity 500ms ease-in-out; /* Change 500ms */
}
```

---

## ✅ You're All Set!

Your slideshow is ready to present. Just start the server and navigate with arrow keys or buttons.

Good luck with your presentation! 🎉
