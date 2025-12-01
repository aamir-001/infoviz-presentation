// Slideshow.js - Main navigation and data loading logic

import * as charts from './charts.js';

// Global state
let currentSlide = 1;
const totalSlides = 12;
let allDataLoaded = false;
let selectedRefugeePeriod = "2015-2019";
let selectedAsylumPeriod = "2015-2019";

// Data storage
const data = {
  monthlyGlobal: null,
  monthlyEurope: null,
  window3yr: null,
  window5yr: null,
  ageGender: null,
  personsOfConcern: null,
  asylumSeekers: null,
  demographics: null
};

// Navigation functions
function showSlide(n) {
  const slides = document.querySelectorAll('.slide');

  // Bounds checking
  if (n > totalSlides) currentSlide = totalSlides;
  else if (n < 1) currentSlide = 1;
  else currentSlide = n;

  // Hide all slides
  slides.forEach(slide => slide.classList.remove('active'));

  // Show current slide
  const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
  if (activeSlide) {
    activeSlide.classList.add('active');

    // Render charts for this slide
    renderChartsForSlide(currentSlide);
  }

  // Update progress indicator
  document.getElementById('progress-indicator').textContent = `${currentSlide} / ${totalSlides}`;

  // Update button states
  document.getElementById('prev-btn').disabled = currentSlide === 1;
  document.getElementById('next-btn').disabled = currentSlide === totalSlides;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Chart rendering logic
function renderChartsForSlide(slideNum) {
  if (!allDataLoaded) return;

  switch(slideNum) {
    case 4: // Q5 Part 1
      if (data.monthlyGlobal) {
        charts.createGlobalMonthlyChart(data.monthlyGlobal, '#chart-q5-global');
      }
      if (data.monthlyEurope) {
        charts.createEuropeMonthlyChart(data.monthlyEurope, '#chart-q5-europe');
      }
      break;

    case 5: // Q5 Part 2 - 5-Year Window
      if (data.window5yr) {
        charts.create5YearWindowChart(data.window5yr, '#chart-q5-5year');
      }
      break;

    case 6: // Q5 Part 3 - 3-Year Window
      if (data.window3yr) {
        charts.create3YearWindowChart(data.window3yr, '#chart-q5-3year');
      }
      break;

    case 7: // Q6
      if (data.ageGender) {
        charts.createAgeGenderPieCharts(data.ageGender, '#chart-q6-demographics');
      }
      break;

    case 8: // Q7 Part 1
      if (data.personsOfConcern) {
        const refugeeTotals = processRefugeeTotals(data.personsOfConcern);
        charts.createTop10RefugeeHostsChart(refugeeTotals, '#chart-q7-refugees');
      }
      break;

    case 9: // Q7 Part 2
      if (data.asylumSeekers) {
        const asylumTotals = processAsylumTotals(data.asylumSeekers);
        charts.createTop10AsylumHostsChart(asylumTotals, '#chart-q7-asylum');
      }
      break;

    case 10: // Q7 Part 3 - Refugee Hosting Map
      if (data.personsOfConcern) {
        renderRefugeeMap();
      }
      break;

    case 11: // Q7 Part 4 - Asylum Applications Map
      if (data.asylumSeekers) {
        renderAsylumMap();
      }
      break;
  }
}

// Render refugee hosting map with current selected period
async function renderRefugeeMap() {
  if (data.personsOfConcern) {
    await charts.createRefugeeHostingMap(data.personsOfConcern, '#chart-q7-map', selectedRefugeePeriod);
  }
}

// Render asylum map with current selected period
async function renderAsylumMap() {
  if (data.asylumSeekers) {
    await charts.createAsylumApplicationsMap(data.asylumSeekers, '#chart-q7-asylum-map', selectedAsylumPeriod);
  }
}

// Data processing functions
function processRefugeeTotals(personsOfConcern) {
  const map = new Map();

  personsOfConcern.forEach(d => {
    const country = d["Country / territory of asylum/residence"];
    const refugees = +String(d["Refugees (incl. refugee-like situations)"]).replace(/,/g, "") || 0;

    if (!country) return;

    if (!map.has(country)) map.set(country, 0);
    map.set(country, map.get(country) + refugees);
  });

  const totals = Array.from(map, ([country, total]) => ({ country, total }));
  return totals.sort((a, b) => b.total - a.total).slice(0, 10);
}

function processAsylumTotals(asylumSeekers) {
  const map = new Map();

  asylumSeekers.forEach(d => {
    const country = d["Country / territory of asylum/residence"];
    const applied = +String(d["Applied during year"]).replace(/,/g, "") || 0;

    if (!country) return;

    if (!map.has(country)) map.set(country, 0);
    map.set(country, map.get(country) + applied);
  });

  const totals = Array.from(map, ([country, total]) => ({ country, total }));
  return totals.sort((a, b) => b.total - a.total).slice(0, 10);
}

// Data loading
async function loadAllData() {
  try {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    // Load all CSV files in parallel
    const [
      monthlyGlobal,
      monthlyEurope,
      window3yr,
      window5yr,
      ageGender,
      personsOfConcern,
      asylumSeekers,
      demographics
    ] = await Promise.all([
      d3.csv('data/asylum_monthly_global_avg.csv'),
      d3.csv('data/asylum_monthly_europe_avg.csv'),
      d3.csv('data/asylum_3yr_window.csv'),
      d3.csv('data/asylum_5yr_window.csv'),
      d3.csv('data/age_gender_distribution.csv'),
      d3.csv('data/persons_of_concern.csv'),
      d3.csv('data/asylum_seekers.csv'),
      d3.csv('data/demographics.csv')
    ]);

    // Store in global data object
    data.monthlyGlobal = monthlyGlobal;
    data.monthlyEurope = monthlyEurope;
    data.window3yr = window3yr;
    data.window5yr = window5yr;
    data.ageGender = ageGender;
    data.personsOfConcern = personsOfConcern;
    data.asylumSeekers = asylumSeekers;
    data.demographics = demographics;

    allDataLoaded = true;
    loading.style.display = 'none';

    // Render charts for the first slide (if needed)
    renderChartsForSlide(currentSlide);

    console.log('✅ All data loaded successfully');
  } catch (error) {
    console.error('❌ Error loading data:', error);
    document.getElementById('loading').innerHTML = `
      <div style="color: #D84315;">
        <h3>Error Loading Data</h3>
        <p>Please make sure all CSV files are in the data/ folder.</p>
        <p style="font-size: 0.9em; color: #666;">${error.message}</p>
      </div>
    `;
  }
}

// Event listeners
function initEventListeners() {
  // Button navigation
  document.getElementById('prev-btn').addEventListener('click', prevSlide);
  document.getElementById('next-btn').addEventListener('click', nextSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        prevSlide();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ': // Space bar
        e.preventDefault();
        nextSlide();
        break;
      case 'Home':
        showSlide(1);
        break;
      case 'End':
        showSlide(totalSlides);
        break;
    }
  });

  // Prevent default space bar scrolling
  window.addEventListener('keydown', (e) => {
    if (e.key === ' ' && e.target === document.body) {
      e.preventDefault();
    }
  });

  // Refugee period dropdown handler
  const refugeePeriodSelect = document.getElementById('refugee-period-select');
  if (refugeePeriodSelect) {
    refugeePeriodSelect.addEventListener('change', (e) => {
      selectedRefugeePeriod = e.target.value;
      renderRefugeeMap();
    });
  }

  // Asylum period dropdown handler
  const asylumPeriodSelect = document.getElementById('asylum-period-select');
  if (asylumPeriodSelect) {
    asylumPeriodSelect.addEventListener('change', (e) => {
      selectedAsylumPeriod = e.target.value;
      renderAsylumMap();
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  loadAllData();
  showSlide(1);
});

// Export for debugging
window.slideshow = {
  showSlide,
  nextSlide,
  prevSlide,
  data,
  currentSlide: () => currentSlide
};
