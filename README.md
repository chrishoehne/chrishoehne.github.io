# chrishoehne.github.io

Personal academic website of Christian Höhne, PhD candidate in Economics at the
University of Cambridge. Live at <https://chrishoehne.github.io>.

## Structure

```
index.html              About, research interests, work in progress
cv.html                 CV, shown inline on desktop and linked on mobile
assets/css/site.css     Stylesheet
assets/js/site.js       Abstract disclosures, pinned nav, column alignment
assets/cv/              CV PDF
assets/images/          Portrait, favicon, X mark
```

## Local preview

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>. There is no build step.

## Deployment

GitHub Pages serves `main`. Merging to `main` publishes within about a minute.
