# JC Events

Bilingual (Spanish / English) website for an event-planning business: weddings, quinceañeras, graduations, baby showers and catering.

**Live demo:** https://gleimbek.github.io/JC_Events/

> This is a demo site. The contact forms validate the fields but don't send anything; after submitting, they say so.

## Pages

Each language has its own folder (`es/`, `en/`) with the same five pages:

- **Home**: hero slideshow, services, stats, filterable gallery with a lightbox, testimonials slider and a contact form
- **About**
- **Services**
- **Gallery**: full gallery with category filters and a lightbox
- **Contact**: quote request form and contact details

The root `index.html` redirects to the Spanish version.

## Built with

HTML, CSS and vanilla JavaScript, no build step. One stylesheet (`assets/css/style.css`) and one script (`assets/js/main.js`) are shared by every page; each part of the script only runs on pages that have the elements it needs.

## Run locally

Open `es/index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

---

Built by [Gustavo Leimbek](https://github.com/gleimbek) · [Portfolio](https://gleimbek.github.io/portfolio/)
