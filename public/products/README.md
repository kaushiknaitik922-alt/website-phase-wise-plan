# Product photographs

Drop a photograph here named after the product slug and it appears on the
product card and at the top of the product page:

```
public/products/pp-granules.jpg
public/products/hdpe-sheets.jpg
public/products/ro-filter-housing-bottles.jpg
```

`.jpg`, `.jpeg`, `.png` and `.webp` all work. Roughly 1600 × 1200 px and under
400 KB is a good target — large enough to stay sharp, small enough to load fast.

These files are a stand-in for the real thing. Anything uploaded through
**Admin → Products → *product* → Hero image** takes priority over the file
here, so the client can replace a photo without touching the repository.
