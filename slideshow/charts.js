// Charts.js - All D3 visualization functions for the slideshow

// ============================================================
// Q5 CHARTS - Seasonal Trends in Asylum Applications
// ============================================================

export function createGlobalMonthlyChart(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  // Set up dimensions and margins
  const margin = { top: 60, right: 30, bottom: 60, left: 80 };
  const width = 650 - margin.left - margin.right;
  const height = 380 - margin.top - margin.bottom;

  // Define month order
  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Parse the data
  const chartData = data.map(d => ({
    Month: d.Month,
    Value: +d.Value
  }));

  // Create scales
  const xScale = d3.scaleBand()
    .domain(monthOrder)
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(chartData, d => d.Value)])
    .nice()
    .range([height, 0]);

  // Create SVG container
  const svg = container.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Add X axis
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  g.append("g")
    .call(d3.axisLeft(yScale));

  // Add X axis label
  g.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .text("Month");

  // Add Y axis label
  g.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -60)
    .text("Avg Asylum Applications");

  // Create line generator
  const line = d3.line()
    .x(d => xScale(d.Month) + xScale.bandwidth() / 2)
    .y(d => yScale(d.Value));

  // Add the line
  g.append("path")
    .datum(chartData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Add points
  g.selectAll(".point")
    .data(chartData)
    .join("circle")
    .attr("class", "point")
    .attr("cx", d => xScale(d.Month) + xScale.bandwidth() / 2)
    .attr("cy", d => yScale(d.Value))
    .attr("r", 4)
    .attr("fill", "steelblue")
    .append("title")
    .text(d => `Month: ${d.Month}\nValue: ${d.Value}`);

  // Add title
  svg.append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Average Monthly Asylum Applications (Global)");
}

export function createEuropeMonthlyChart(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  const width = 650, height = 380;
  const margin = {top: 45, right: 30, bottom: 50, left: 60};

  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);

  const x = d3.scalePoint()
      .domain(data.map(d => d.Month))
      .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.Value) - 1,
        d3.max(data, d => d.Value) + 1
      ])
      .range([height - margin.bottom, margin.top]);

  // ---- LINE ----
  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#c0392b")
      .attr("stroke-width", 2.5)
      .attr("d", d3.line()
          .x(d => x(d.Month))
          .y(d => y(d.Value))
      );

  // ---- POINTS ----
  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.Month))
      .attr("cy", d => y(d.Value))
      .attr("r", 4)
      .attr("fill", "#c0392b");

  // ---- AXES ----
  svg.append("g")
     .attr("transform", `translate(0,${height - margin.bottom})`)
     .call(d3.axisBottom(x));

  svg.append("g")
     .attr("transform", `translate(${margin.left},0)`)
     .call(d3.axisLeft(y));

  // ---- AXIS LABELS ----
  svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Month");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(20, ${height / 2}) rotate(-90)`)
      .style("font-size", "12px")
      .text("Average Asylum Applications");

  // ---- TITLE ----
  svg.append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Average Monthly Asylum Applications (Europe Only)");
}

export function create3YearWindowChart(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  const width = 750, height = 420;
  const margin = {top: 50, right: 130, bottom: 60, left: 60};

  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("cursor", "crosshair");

  const groups = Array.from(d3.group(data, d => d.Window_3yr));
  const months = groups[0][1].map(d => d.Month);

  const x = d3.scalePoint()
      .domain(months)
      .range([margin.left, width - margin.right])
      .padding(0.5);

  const y = d3.scaleLinear()
      .domain([
        d3.min(data, d => +d.Value) - 2,
        d3.max(data, d => +d.Value) + 2
      ])
      .range([height - margin.bottom, margin.top]);

  const color = d3.scaleOrdinal()
      .domain(groups.map(g => g[0]))
      .range(d3.schemeSet2);

  // -------------------
  // TOOLTIP DIV
  // -------------------
  const tooltip = d3.select(document.body)
    .append("div")
    .attr("class", "chart-tooltip")
    .style("position", "fixed")
    .style("background", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "6px 10px")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("box-shadow", "0px 2px 6px rgba(0,0,0,0.15)")
    .style("opacity", 0);

  // -------------------
  // DRAW LINES WITH HOVER POINTS
  // -------------------
  groups.forEach(([label, rows], idx) => {
    // Line
    svg.append("path")
      .datum(rows)
      .attr("fill", "none")
      .attr("stroke", color(label))
      .attr("stroke-width", 2.3)
      .attr("d", d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Value))
      );

    // Hover dots
    svg.selectAll(`.dot-3yr-${idx}`)
      .data(rows)
      .enter()
      .append("circle")
      .attr("class", `dot-3yr-${idx}`)
      .attr("cx", d => x(d.Month))
      .attr("cy", d => y(d.Value))
      .attr("r", 5)
      .attr("fill", color(label))
      .attr("opacity", 0)
      .on("mouseover", (event, d) => {
          tooltip.style("opacity", 1);
          tooltip.html(
            `<b>${label}</b><br>
             Month: ${d.Month}<br>
             Value: ${d.Value.toFixed(2)}`
          );
      })
      .on("mousemove", (event) => {
          tooltip.style("left", (event.clientX + 12) + "px")
                 .style("top", (event.clientY - 20) + "px");
      })
      .on("mouseout", () => {
          tooltip.style("opacity", 0);
      });
  });

  // -------------------
  // AXES
  // -------------------
  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  // Axis labels
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .style("font-size", "13px")
      .text("Month");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(20, ${height/2}) rotate(-90)`)
      .style("font-size", "13px")
      .text("Average Asylum Applications");

  // Title
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", 30)
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("3-Year Window Monthly Averages");

  // Legend
  const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right + 10}, ${margin.top})`);

  groups.forEach(([label], i) => {
    const g = legend.append("g")
        .attr("transform", `translate(0, ${i * 22})`);

    g.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color(label));

    g.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .style("font-size", "12px")
      .text(label);
  });
}

export function create5YearWindowChart(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  const width = 750, height = 420;
  const margin = {top: 50, right: 130, bottom: 60, left: 60};

  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("cursor", "crosshair");

  // Group data by Window_5yr
  const groups = Array.from(d3.group(data, d => d.Window_5yr));
  const months = groups[0][1].map(d => d.Month);

  // X scale
  const x = d3.scalePoint()
      .domain(months)
      .range([margin.left, width - margin.right])
      .padding(0.5);

  // Y scale
  const y = d3.scaleLinear()
      .domain([
        d3.min(data, d => +d.Value) - 5,
        d3.max(data, d => +d.Value) + 5
      ])
      .range([height - margin.bottom, margin.top]);

  // Colors
  const color = d3.scaleOrdinal()
      .domain(groups.map(g => g[0]))
      .range(d3.schemeSet2);

  // -------------------
  // TOOLTIP
  // -------------------
  const tooltip = d3.select(document.body)
    .append("div")
    .attr("class", "chart-tooltip")
    .style("position", "fixed")
    .style("background", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "6px 10px")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("box-shadow", "0px 2px 6px rgba(0,0,0,0.15)")
    .style("opacity", 0);

  // -------------------
  // DRAW LINES + HOVER POINTS
  // -------------------
  groups.forEach(([label, rows], idx) => {
    // Line path
    svg.append("path")
      .datum(rows)
      .attr("fill", "none")
      .attr("stroke", color(label))
      .attr("stroke-width", 2.3)
      .attr("d", d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Value))
      );

    // Hover dots (invisible except on hover)
    svg.selectAll(`.dot-5yr-${idx}`)
      .data(rows)
      .enter()
      .append("circle")
      .attr("class", `dot-5yr-${idx}`)
      .attr("cx", d => x(d.Month))
      .attr("cy", d => y(d.Value))
      .attr("r", 5)
      .attr("fill", color(label))
      .attr("opacity", 0)
      .on("mouseover", (event, d) => {
          tooltip.style("opacity", 1);
          tooltip.html(
            `<b>${label}</b><br>
             Month: ${d.Month}<br>
             Value: ${d.Value.toFixed(2)}`
          );
      })
      .on("mousemove", (event) => {
          tooltip.style("left", (event.clientX + 12) + "px")
                 .style("top", (event.clientY - 20) + "px");
      })
      .on("mouseout", () => tooltip.style("opacity", 0));
  });

  // -------------------
  // AXES
  // -------------------
  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  // Axis labels
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .style("font-size", "13px")
      .text("Month");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(20, ${height/2}) rotate(-90)`)
      .style("font-size", "13px")
      .text("Average Asylum Applications");

  // Title
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", 30)
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("5-Year Window Monthly Averages");

  // -------------------
  // LEGEND
  // -------------------
  const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right + 10}, ${margin.top})`);

  groups.forEach(([label], i) => {
    const g = legend.append("g")
        .attr("transform", `translate(0, ${i * 22})`);

    g.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", color(label));

    g.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .style("font-size", "12px")
      .text(label);
  });
}

// ============================================================
// Q6 CHARTS - Age & Gender Demographics
// ============================================================

export function createAgeGenderPieCharts(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  const pieSize = 200;
  const radius = pieSize / 2 - 20;
  const padding = 40;

  const chartsPerRow = 3;
  const numCharts = data.length;
  const numRows = Math.ceil(numCharts / chartsPerRow);

  const totalWidth = chartsPerRow * pieSize + (chartsPerRow - 1) * padding;
  const totalHeight = numRows * (pieSize + 60);

  const svg = container.append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight);

  const color = d3.scaleOrdinal()
    .domain(["Male", "Female"])
    .range(["#ff9800", "#2196f3"]);

  const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  data.forEach((ageGroup, i) => {
    const row = Math.floor(i / chartsPerRow);
    const col = i % chartsPerRow;
    const x = col * (pieSize + padding) + pieSize / 2;
    const y = row * (pieSize + 60) + pieSize / 2 + 30;

    const g = svg.append("g")
      .attr("transform", `translate(${x},${y})`);

    const chartData = [
      { gender: "Male", value: +ageGroup["Male Count"] },
      { gender: "Female", value: +ageGroup["Female Count"] }
    ];

    const arcs = g.selectAll(".arc")
      .data(pie(chartData))
      .join("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.gender))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .append("title")
      .text(d => `${d.data.gender}: ${d.data.value.toLocaleString()}`);

    svg.append("text")
      .attr("x", x)
      .attr("y", y - pieSize / 2 - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text(ageGroup["Age Group"]);
  });

  const legend = svg.append("g")
    .attr("transform", `translate(${totalWidth - 60}, 10)`);

  const legendItems = legend.selectAll(".legend-item")
    .data(["Female", "Male"])
    .join("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 25})`);

  legendItems.append("circle")
    .attr("r", 6)
    .attr("fill", d => color(d));

  legendItems.append("text")
    .attr("x", 15)
    .attr("y", 5)
    .style("font-size", "12px")
    .text(d => d);
}

// ============================================================
// Q7 CHARTS - Top Refugee & Asylum Hosting Countries
// ============================================================

export function createTop10RefugeeHostsChart(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  const margin = { top: 20, right: 30, bottom: 40, left: 200 };
  const width = 900;
  const height = 450;

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleBand()
    .domain(data.map(d => d.country))
    .range([margin.top + 20, height - margin.bottom])
    .padding(0.2);

  svg.append("g")
    .attr("transform", `translate(0,${margin.top + 20})`)
    .call(d3.axisTop(x).ticks(5));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", margin.left)
    .attr("y", d => y(d.country))
    .attr("width", d => x(d.total) - margin.left)
    .attr("height", y.bandwidth())
    .attr("fill", "#4a90e2");

  svg.append("text")
    .attr("x", margin.left)
    .attr("y", 12)
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Top 10 Refugee-Hosting Countries (Total Across All Years)");
}

export function createTop10AsylumHostsChart(data, containerId) {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  const margin = { top: 45, right: 30, bottom: 40, left: 220 };
  const width = 900;
  const height = 450;

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleBand()
    .domain(data.map(d => d.country))
    .range([margin.top + 20, height - margin.bottom])
    .padding(0.2);

  svg.append("g")
    .attr("transform", `translate(0,${margin.top + 20})`)
    .call(d3.axisTop(x).ticks(5).tickFormat(d3.format(",")));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", margin.left)
    .attr("y", d => y(d.country))
    .attr("width", d => x(d.total) - margin.left)
    .attr("height", y.bandwidth())
    .attr("fill", "#F39C12");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top - 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Top 10 Asylum-Seeker Hosting Countries (Total Across All Years)");
}

// ============================================================
// Q7 PART 3 - Refugee Hosting Map (5-Year Windows)
// ============================================================

// Country name mapping to match TopoJSON names with data
const mapNameFix = {
  "United States": "United States of America",
  "South Korea": "Korea, Republic of",
  "North Korea": "Korea, Democratic People's Republic of",
  "Russia": "Russian Federation",
  "Iran": "Iran, Islamic Republic of",
  "Syria": "Syrian Arab Republic",
  "Venezuela": "Venezuela, Bolivarian Republic of",
  "Bolivia": "Bolivia, Plurinational State of",
  "Tanzania": "Tanzania, United Republic of",
  "Czech Republic": "Czechia",
  "Moldova": "Moldova, Republic of",
  "Laos": "Lao People's Democratic Republic",
  "Vietnam": "Viet Nam",
  "DR Congo": "Democratic Republic of the Congo",
  "Republic of Congo": "Congo",
  "Swaziland": "Eswatini",
  "Micronesia": "Micronesia, Federated States of",
  "Brunei": "Brunei Darussalam",
  "Cape Verde": "Cabo Verde",
  "Ivory Coast": "Côte d'Ivoire",
  "UAE": "United Arab Emirates"
};

export async function createRefugeeHostingMap(personsOfConcernData, containerId, selectedPeriod = "2015-2019") {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  // Load world TopoJSON
  const world = await d3.json('data/countries-110m.json');

  // Helper function to fix country names
  const fix = name => mapNameFix[name] ?? name;

  // Helper function to bucket years into 5-year periods
  const bucket = year => {
    const start = Math.floor(year / 5) * 5;
    return `${start}-${start + 4}`;
  };

  // Process data: group by 5-year periods and country
  const grouped = {};

  personsOfConcernData.forEach(d => {
    const year = +d.Year;
    const country = fix(d["Country / territory of asylum/residence"]);
    const refugees = +String(d["Refugees (incl. refugee-like situations)"]).replace(/,/g, "") || 0;

    if (!country || !year) return;

    const period = bucket(year);

    if (!grouped[period]) grouped[period] = {};
    if (!grouped[period][country]) grouped[period][country] = 0;

    grouped[period][country] += refugees;
  });

  // Get data for selected period
  const data = grouped[selectedPeriod] || {};

  const width = 850, height = 600;

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

  const projection = d3.geoMercator().scale(130).translate([width / 2, height / 1.6]);
  const path = d3.geoPath(projection);

  const values = Object.values(data);
  const maxVal = d3.max(values);

  // Color scale (light orange to dark red)
  const color = d3.scaleSequential()
    .domain([0, maxVal])
    .interpolator(d3.interpolateOrRd);

  // Tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "map-tooltip")
    .style("position", "absolute")
    .style("padding", "8px")
    .style("background", "white")
    .style("border", "1px solid #aaa")
    .style("border-radius", "6px")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("z-index", 10000);

  // Draw countries
  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => {
      const country = d.properties.name;
      return data[country] ? color(data[country]) : "#e5e5e5";
    })
    .attr("stroke", "#666")
    .attr("stroke-width", 0.5)
    .on("mousemove", (event, d) => {
      const name = d.properties.name;
      tooltip.style("opacity", 1)
        .html(`<b>${name}</b><br>Refugees: ${
          data[name] ? data[name].toLocaleString() : "No Data"
        }`)
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY + 15}px`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0));

  // Title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text(`Refugees Hosted by Country — ${selectedPeriod}`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .style("font-size", "13px")
    .text("Darker color = more refugees hosted");

  // Legend
  const legendWidth = 260, legendHeight = 12;
  const legendX = (width - legendWidth) / 2;
  const legendY = height - 40;

  const legendScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale)
    .ticks(4)
    .tickFormat(d => d3.format(".2s")(d).replace("G", "B"));

  // Gradient definition
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient")
    .attr("id", "refugeeLegend")
    .attr("x1", "0%").attr("x2", "100%")
    .attr("y1", "0%").attr("y2", "0%");

  gradient.append("stop").attr("offset", "0%").attr("stop-color", color(0));
  gradient.append("stop").attr("offset", "100%").attr("stop-color", color(maxVal));

  svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#refugeeLegend)");

  svg.append("g")
    .attr("transform", `translate(${legendX},${legendY + legendHeight})`)
    .call(legendAxis)
    .select(".domain")
    .remove();
}

// ============================================================
// Q7 PART 4 - Asylum Applications Map (5-Year Windows)
// ============================================================

export async function createAsylumApplicationsMap(asylumSeekerData, containerId, selectedPeriod = "2015-2019") {
  const container = d3.select(containerId);
  container.selectAll("*").remove();

  // Load world TopoJSON
  const world = await d3.json('data/countries-110m.json');

  // Helper function to fix country names
  const fix = name => mapNameFix[name] ?? name;

  // Helper function to bucket years into 5-year periods
  const bucket = year => {
    const s = Math.floor(year / 5) * 5;
    return `${s}-${s + 4}`;
  };

  // Process data using d3.rollups
  const grouped = d3.rollups(
    asylumSeekerData,
    v => d3.sum(v, d => +String(d["Applied during year"]).replace(/,/g, "") || 0),
    d => bucket(+d.Year),
    d => fix(d["Country / territory of asylum/residence"])
  );

  const periodMap = {};
  for (const [period, rows] of grouped) {
    periodMap[period] = {};
    for (const [c, val] of rows) {
      periodMap[period][c] = val;
    }
  }

  const periods = Object.keys(periodMap).sort();

  // Get data for selected period
  const data = periodMap[selectedPeriod] || {};

  const width = 850, height = 600;

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

  const projection = d3.geoMercator()
    .scale(130)
    .translate([width / 2, height / 1.6]);

  const path = d3.geoPath(projection);

  const values = Object.values(data);
  const maxVal = d3.max(values) || 0;

  // Color scale (OrRd = light orange → dark red)
  const color = d3.scaleSequential()
    .domain([0, maxVal])
    .interpolator(d3.interpolateOrRd);

  // Tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "asylum-tooltip")
    .style("position", "absolute")
    .style("padding", "8px")
    .style("background", "white")
    .style("border", "1px solid #aaa")
    .style("border-radius", "6px")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("z-index", 10000);

  // Draw countries
  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => {
      const c = d.properties.name;
      return data[c] ? color(data[c]) : "#e5e5e5";
    })
    .attr("stroke", "#666")
    .attr("stroke-width", 0.5)
    .on("mousemove", (event, d) => {
      const c = d.properties.name;
      tooltip.style("opacity", 1)
        .html(`
          <b>${c}</b><br>
          Asylum Applications: ${
            data[c] ? data[c].toLocaleString() : "No Data"
          }<br>
          Period: ${selectedPeriod}
        `)
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY + 15}px`);
    })
    .on("mouseout", () => tooltip.style("opacity", 0));

  // Title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text(`Asylum Applications by Country — ${selectedPeriod}`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 45)
    .attr("text-anchor", "middle")
    .style("font-size", "13px")
    .text("Darker red = more asylum applications");

  // Legend
  const legendWidth = 260, legendHeight = 12;
  const legendX = (width - legendWidth) / 2;
  const legendY = height - 40;

  const legendScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale)
    .ticks(4)
    .tickFormat(d => d3.format(".2s")(d).replace("G", "B"));

  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient")
    .attr("id", "asylumLegend")
    .attr("x1", "0%").attr("x2", "100%")
    .attr("y1", "0%").attr("y2", "0%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", color(0));

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", color(maxVal));

  svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#asylumLegend)");

  svg.append("g")
    .attr("transform", `translate(${legendX},${legendY + legendHeight})`)
    .call(legendAxis)
    .select(".domain")
    .remove();

  // Return periods for dropdown
  return { periods };
}
