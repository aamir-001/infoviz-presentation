# Navigating the Global Refugee Crisis - Interactive Slideshow

An interactive data visualization slideshow presenting analysis of global refugee and asylum seeker patterns from UNHCR data (2000-2023).

> **📢 For Teammates:** All 11 datasets are pre-loaded and ready to use! Jump to [Adding New Slides](#-adding-new-slides-for-teammates) to get started.

## 🚀 Quick Start - Running the App

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Python, Node.js, PHP, or VS Code Live Server

### Step 1: Start a Local Web Server

**IMPORTANT:** You must run this from a local server (not by opening the HTML file directly) due to ES6 module imports and CORS restrictions.

**Option 1: Python (Recommended)**
```bash
cd slideshow
python -m http.server 8000
```

**Option 2: Node.js**
```bash
cd slideshow
npx http-server -p 8000
```

**Option 3: PHP**
```bash
cd slideshow
php -S localhost:8000
```

**Option 4: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Step 2: Open in Browser

Navigate to: **`http://localhost:8000`**

### Step 3: Navigate the Slideshow

**Keyboard Controls:**
- `←` `→` Arrow keys - Previous/Next slide
- `Space` - Next slide
- `Home` - Jump to first slide
- `End` - Jump to last slide

**Mouse Controls:**
- Click arrow buttons (← →) on screen
- Use dropdown menus on map slides to change time periods

---

## 📁 Project Structure

```
infoviz-presentation/
├── README.md           # This file - Instructions and documentation
└── slideshow/          # Main application folder
    ├── index.html      # Main HTML structure (12 slides)
    ├── slideshow.js    # Navigation logic and data loading (ALL datasets loaded)
    ├── charts.js       # D3.js visualization functions (8 charts)
    ├── style.css       # Warm earth tone styling
    └── data/           # All CSV and GeoJSON data files (11 datasets)
        ├── asylum_monthly_global_avg.csv
        ├── asylum_monthly_europe_avg.csv
        ├── asylum_3yr_window.csv
        ├── asylum_5yr_window.csv
        ├── asylum_seekers.csv
        ├── asylum_seekers_monthly.csv
        ├── age_gender_distribution.csv
        ├── persons_of_concern.csv
        ├── demographics.csv
        ├── resettlement.csv
        ├── time_series.csv
        └── countries-110m.json (TopoJSON world map)
```

---

## 📊 Current Slideshow (12 Slides)

### Slide Overview

1. **Title Slide** - Introduction and team information
2. **Problem** - Overview of the refugee crisis
3. **Context** - Background, data sources, and scope
4. **Q5 Part 1** - Seasonal Trends (Global & Europe monthly charts)
5. **Q5 Part 2** - 5-Year Window Analysis (line chart)
6. **Q5 Part 3** - 3-Year Window Analysis (line chart)
7. **Q6** - Age & Gender Demographics (pie charts)
8. **Q7 Part 1** - Top 10 Refugee Hosting Countries (bar chart)
9. **Q7 Part 2** - Top 10 Asylum Application Countries (bar chart)
10. **Q7 Part 3** - Refugee Hosting Geographic Map (interactive, 1950-2019)
11. **Q7 Part 4** - Asylum Applications Geographic Map (interactive, 2000-2019)
12. **Conclusion** - Key findings and policy implications

### Interactive Features

- **Slide 10 & 11:** Dropdown menus to explore different 5-year time periods
- **All charts:** Hover tooltips showing detailed data
- **Maps:** Click countries for refugee/asylum numbers

---

## ➕ Adding New Slides (For Teammates)

Follow these steps to add slides for Q1-Q4 or Q8-Q10:

### Available Datasets

**All datasets are pre-loaded and ready to use!** You don't need to add new CSV files.

| Dataset Variable | CSV File | Description |
|-----------------|----------|-------------|
| `data.monthlyGlobal` | asylum_monthly_global_avg.csv | Global monthly asylum averages |
| `data.monthlyEurope` | asylum_monthly_europe_avg.csv | Europe monthly asylum averages |
| `data.window3yr` | asylum_3yr_window.csv | 3-year rolling window analysis |
| `data.window5yr` | asylum_5yr_window.csv | 5-year rolling window analysis |
| `data.ageGender` | age_gender_distribution.csv | Age and gender demographics |
| `data.personsOfConcern` | persons_of_concern.csv | Refugees and persons of concern |
| `data.asylumSeekers` | asylum_seekers.csv | Asylum seeker statistics |
| `data.asylumSeekersMonthly` | asylum_seekers_monthly.csv | Monthly asylum seeker data |
| `data.demographics` | demographics.csv | Demographic information |
| `data.resettlement` | resettlement.csv | Resettlement data |
| `data.timeSeries` | time_series.csv | Time series analysis data |

**You can use any combination of these datasets in your visualizations!**

### Step 1: Choose Your Dataset(s)

1. **Review available datasets** in the table above
2. **Inspect the data structure** using browser console:
   ```javascript
   console.log(data.resettlement);  // Example: check resettlement data
   ```
3. **Plan your visualization** based on the data columns available

### Step 2: Access Pre-Loaded Data

**All datasets are already loaded!** No need to modify data loading code.

The following datasets are available in the `data` object:

```javascript
// Access any of these in your chart functions:
data.monthlyGlobal          // asylum_monthly_global_avg.csv
data.monthlyEurope          // asylum_monthly_europe_avg.csv
data.window3yr              // asylum_3yr_window.csv
data.window5yr              // asylum_5yr_window.csv
data.ageGender              // age_gender_distribution.csv
data.personsOfConcern       // persons_of_concern.csv
data.asylumSeekers          // asylum_seekers.csv
data.asylumSeekersMonthly   // asylum_seekers_monthly.csv
data.demographics           // demographics.csv
data.resettlement           // resettlement.csv
data.timeSeries             // time_series.csv
```

**Example usage in your chart function:**
```javascript
export function createYourChart(data, containerId) {
  // Use any pre-loaded dataset
  const myData = data.resettlement;  // Access resettlement data

  // Process and visualize...
}
```

### Step 3: Update Slide Count and Add Rendering

**A. Update total slides (line 7 in `slideshow.js`):**
```javascript
const totalSlides = 13;  // INCREMENT from 12 to 13
```

**B. Add rendering case (around line 60 in `slideshow.js`):**
```javascript
function renderChartsForSlide(slideNum) {
  if (!allDataLoaded) return;

  switch(slideNum) {
    // ... existing cases

    case 13:  // Your new slide number
      // Pass the entire data object to access any dataset
      charts.createQ8YourChart(data, '#chart-q8');
      break;
  }
}
```

**Note:** Pass the entire `data` object to your chart function so you can access any dataset you need.

### Step 4: Create Chart Function in `charts.js`

Add your chart function at the end of `charts.js`:

```javascript
// ============================================================
// Q8 - Your Question Title
// ============================================================

export function createQ8YourChart(dataObj, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();  // Clear previous

  // Access the specific dataset you need
  const myData = dataObj.resettlement;  // Or any other dataset

  // Set dimensions
  const margin = { top: 60, right: 30, bottom: 60, left: 80 };
  const width = 650 - margin.left - margin.right;
  const height = 380 - margin.top - margin.bottom;

  // Create SVG
  const svg = container.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Process your data
  const chartData = myData.map(d => ({
    // Transform your data here
    x: d.columnName,
    y: +d.value  // Convert to number
  }));

  // Create scales
  const xScale = d3.scaleBand()
    .domain(chartData.map(d => d.x))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(chartData, d => d.y)])
    .nice()
    .range([height, 0]);

  // Add axes
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));

  // Add your visualization (bars, lines, etc.)
  g.selectAll(".bar")
    .data(chartData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.x))
    .attr("y", d => yScale(d.y))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.y))
    .attr("fill", "#D84315");

  // Add title
  svg.append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", margin.top - 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Your Chart Title");
}
```

**Reference existing chart functions** in `charts.js` for more examples:
- Line charts: `create3YearWindowChart()`, `create5YearWindowChart()`
- Bar charts: `createTop10RefugeeHostsChart()`
- Pie charts: `createAgeGenderPieCharts()`
- Maps: `createRefugeeHostingMap()`, `createAsylumApplicationsMap()`

### Step 5: Add HTML Slide in `index.html`

Add before the conclusion slide (currently slide 12):

```html
<!-- Slide 13: Q8 - Your Question -->
<div class="slide question-slide" data-slide="13">
    <div class="slide-header">
        <h2>Q8: Your Question Title</h2>
    </div>

    <div class="chart-container">
        <div id="chart-q8"></div>
    </div>

    <div class="interpretation-panel">
        <h3>Key Findings</h3>

        <h4>Finding 1</h4>
        <p>Explain what the chart shows...</p>
        <ul>
            <li><strong>Point 1:</strong> Details</li>
            <li><strong>Point 2:</strong> Details</li>
            <li><strong>Point 3:</strong> Details</li>
        </ul>

        <h4>Finding 2</h4>
        <p>More interpretation...</p>

        <h4>Key Insight</h4>
        <p><strong>Main takeaway:</strong> Summarize the most important finding.</p>
    </div>
</div>
```

**IMPORTANT:** Update the conclusion slide number:
```html
<!-- Change this: -->
<div class="slide conclusion-slide" data-slide="12">

<!-- To this: -->
<div class="slide conclusion-slide" data-slide="13">
```

### Step 6: Test Your Changes

1. **Hard refresh browser:** `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Check console:** Press F12, look for errors
3. **Navigate to your slide:** Use arrow keys
4. **Verify:**
   - Data loads correctly
   - Chart renders properly
   - Navigation works
   - Tooltips appear (if applicable)

---

## 🎨 Styling Guidelines

### Color Palette (Warm Earth Tones)

Use these CSS variables defined in `style.css`:

```css
--earth-dark: #5D4037      /* Dark brown (headings, borders) */
--earth-medium: #8D6E63    /* Medium brown (accents) */
--terracotta: #D84315      /* Reddish orange (highlights) */
--sand: #EFEBE9            /* Light beige (backgrounds) */
--text-dark: #3E2723       /* Dark text */
--accent-orange: #FF6F00   /* Bright orange (emphasis) */
```

### Chart Colors

- **Sequential scales:** `d3.interpolateOrRd` (maps, gradients)
- **Categorical data:** `d3.schemeCategory10` or custom colors
- **Primary chart color:** `#D84315` (terracotta)
- **Secondary colors:** `#FF6F00`, `#F39C12`

### Typography

- **Slide titles (h2):** 32px, bold, earth-dark
- **Chart titles:** 20-22px, bold
- **Subtitles (h4):** 18px, bold, terracotta
- **Body text:** 16px, line-height 1.6
- **Axis labels:** 12-14px

### Layout

- **Chart area:** 65% width (left column)
- **Interpretation area:** 35% width (right column)
- **Slide padding:** 40px 50px
- **Grid gap:** 20px

---

## 🐛 Troubleshooting

### Charts Not Displaying

**Symptom:** Blank slides or missing visualizations

**Solutions:**
1. Open browser console (F12) and check for errors
2. Verify CSV file path is correct: `data/your_file.csv`
3. Check column names match your code exactly
4. Ensure data loads before rendering: check `allDataLoaded` flag
5. Use `console.log(data)` to inspect loaded data

### Module/CORS Errors

**Symptom:** `CORS policy` or `cannot load module` errors

**Solution:** Must use a local server, not `file://` protocol
```bash
python -m http.server 8000
```

### Changes Not Appearing

**Symptom:** Code changes don't show up in browser

**Solution:** Hard refresh to clear cache
- Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### Data Loading Errors

**Symptom:** "Cannot read property of undefined" errors

**Solutions:**
1. Check CSV file exists in `data/` folder
2. Verify column names (case-sensitive!)
3. Handle missing values: `+d.value || 0`
4. Convert strings to numbers: `+d.value` or `parseFloat(d.value)`

### Dropdown Not Working

**Symptom:** Dropdown doesn't update chart

**Solutions:**
1. Check element ID matches: `<select id="your-dropdown">`
2. Verify event listener in `initEventListeners()` function
3. Ensure render function is async: `async function renderYourMap()`
4. Check selected period exists in data

### Map Not Rendering

**Symptom:** Geographic map shows blank or errors

**Solutions:**
1. Verify `countries-110m.json` exists in `data/` folder
2. Check TopoJSON script loaded: `<script src="https://d3js.org/topojson.v3.min.js"></script>`
3. Use `mapNameFix` object to match country names
4. Ensure projection and scale are appropriate

---

## 📚 Resources & References

### D3.js Documentation
- [Official D3 API](https://d3js.org/)
- [D3 Graph Gallery](https://d3-graph-gallery.com/)
- [Observable D3 Collection](https://observablehq.com/@d3/gallery)

### Specific Chart Types
- [Bar Charts](https://d3-graph-gallery.com/barplot.html)
- [Line Charts](https://d3-graph-gallery.com/line.html)
- [Pie Charts](https://d3-graph-gallery.com/pie.html)
- [Choropleth Maps](https://d3-graph-gallery.com/choropleth.html)

### TopoJSON & Geographic Data
- [World Atlas TopoJSON](https://github.com/topojson/world-atlas)
- [TopoJSON Documentation](https://github.com/topojson/topojson)

### Data Source
- **UNHCR Refugee Data:** [Kaggle Dataset](https://www.kaggle.com/datasets/unitednations/refugee-data)
- **Coverage:** 2000-2023
- **Includes:** Refugees, asylum seekers, IDPs, stateless persons

---

## 🔍 Code Examples

### Example: Simple Bar Chart

```javascript
export function createSimpleBarChart(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  const margin = { top: 60, right: 30, bottom: 60, left: 80 };
  const width = 650 - margin.left - margin.right;
  const height = 380 - margin.top - margin.bottom;

  const svg = container.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([0, width])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.value)])
    .range([height, 0]);

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  g.append("g")
    .call(d3.axisLeft(y));

  // Bars
  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.category))
    .attr("y", d => y(+d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(+d.value))
    .attr("fill", "#D84315");

  // Title
  svg.append("text")
    .attr("x", width / 2 + margin.left)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Your Chart Title");
}
```

### Example: Adding Tooltips

```javascript
// Create tooltip div
const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "8px")
  .style("background", "white")
  .style("border", "1px solid #aaa")
  .style("border-radius", "6px")
  .style("pointer-events", "none")
  .style("opacity", 0);

// Add tooltip to bars
g.selectAll(".bar")
  .on("mousemove", (event, d) => {
    tooltip.style("opacity", 1)
      .html(`<b>${d.category}</b><br>Value: ${d.value}`)
      .style("left", `${event.pageX + 15}px`)
      .style("top", `${event.pageY + 15}px`);
  })
  .on("mouseout", () => tooltip.style("opacity", 0));
```

---

## 🤝 Team Collaboration Tips

### Avoiding Conflicts

1. **Coordinate slide numbers** with teammates
2. **Use descriptive commit messages:** "Add Q8: Migration patterns chart"
3. **Test locally** before pushing changes
4. **Document your changes** in this README

### Naming Conventions

- **CSV files:** `lowercase_with_underscores.csv`
- **Chart container IDs:** `#chart-q8-topic`
- **Function names:** `createQ8TopicChart()`
- **Variable names:** `camelCase` for JavaScript

### Git Workflow (if using version control)

```bash
# Pull latest changes
git pull origin main

# Create a feature branch
git checkout -b add-question-8

# Make your changes
# Test thoroughly

# Commit with clear message
git add .
git commit -m "Add Q8: Migration patterns analysis

- Add migration_patterns.csv data file
- Create createMigrationChart() function
- Add slide 13 with interpretation
- Update totalSlides to 13"

# Push and create pull request
git push origin add-question-8
```

---

## 📦 Dependencies

### Loaded from CDN (in `index.html`)

- **D3.js v7:** `https://d3js.org/d3.v7.min.js`
- **TopoJSON v3:** `https://d3js.org/topojson.v3.min.js`

### No Installation Required

This project uses vanilla JavaScript with no build tools or package managers needed.

---

## 🎯 Remaining Work

Questions to be added by teammates:

- [ ] **Q1** - Your question here
- [ ] **Q2** - Your question here
- [ ] **Q3** - Your question here
- [ ] **Q4** - Your question here
- [ ] **Q8** - Your question here
- [ ] **Q9** - Your question here
- [ ] **Q10** - Your question here

### Potential Enhancements

- Add slide transition animations
- Export presentation to PDF
- Add presenter notes mode
- Mobile responsive improvements
- Accessibility (ARIA labels, keyboard navigation)

---

## 👥 Team

- **Amaan Elahi** - ae2950
- **Aayush Anand** - aa13015
- **Md Aamir Achhava** - ma8616

**Course:** Information Visualization
**Institution:** [Your University]
**Semester:** [Current Semester]

---

## 📄 License & Data Attribution

**Data Source:** UNHCR Refugee Population Statistics Database
**Access:** https://www.kaggle.com/datasets/unitednations/refugee-data
**License:** CC BY 4.0
**Coverage:** 2000-2023 (varies by dataset)

---

## 💡 Quick Tips

1. **Always test with a local server** - don't open HTML directly
2. **Check browser console** (F12) for errors
3. **Hard refresh** (Ctrl+Shift+R) to see changes
4. **Follow existing patterns** - copy similar chart functions
5. **Keep data files small** - aggregate before loading
6. **Use semantic HTML** - proper heading hierarchy
7. **Comment complex code** - explain D3 transformations

---

**Need help?** Check existing chart functions in `charts.js` for examples, or review the browser console for specific error messages.

**Happy visualizing! 📊🌍**
