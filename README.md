# How to Work with the mlut Website

If you like our website and want to contribute — great news! You can submit your own art created with **mlut** and have it featured in our gallery.

---

## Installation

1. Fork our repository from GitHub: [https://github.com/mlutcss/website](https://github.com/mlutcss/website)
2. Clone your fork locally using `git clone` (or add it as a remote).
3. Open a terminal (for example, Git Bash) and install all dependencies:

   ```bash
   npm ci
   ```
4. You’re all set — feel free to explore and start creating!

---

## Environment Overview

Before making changes, please read through the conventions and tools we use in this project.

### Eleventy (11ty)

Our website is built with **Eleventy (11ty)** — a static site generator. We use **EJS** as our templating language, and we expect contributions to follow the same approach.

Both tools have clear and beginner‑friendly documentation:

* Eleventy: [https://www.11ty.dev/docs/](https://www.11ty.dev/docs/)
* EJS: [https://ejs.co/#docs](https://ejs.co/#docs)

If you’re not familiar with them yet — don’t worry, they’re easy to pick up.

### mlut

We use **mlut** to generate all CSS for the website. Every art piece shown in the gallery **must be styled using mlut utilities**.

mlut allows you to write utilities in several places:

* `class` attributes of HTML elements
* JavaScript strings
* String values of object properties

The mlut configuration is located in `src/assets/style/style.scss`.


Please **do not modify this file** unless absolutely necessary. It contains core variables and rules used across the entire website.

**The only allowed exception** is adding a background color for your art in the gallery — this is explained in the Contribution section below.

### Scripts

The `package.json` file contains several useful scripts for development:

* **`npm run build`** runs `npx @11ty/eleventy` and `npx mlut -i src/assets/style/style.scss`. Builds the `dist` folder and generates all CSS styles using mlut.

* **`npm run mlut`** is equivalent to `npx mlut -i src/assets/style/style.scss -w`. Starts the mlut JIT engine and automatically generates styles based on templates.

* **`npm start`** is alias for `npx @11ty/eleventy --serve`. Launches a local development server.

---

## Contribution Guide

To add your own art made with mlut, follow these steps.

### 1. Create the art layout

Create a new `.ejs` file in the following folder `src/arts/`.

This file should contain the layout of your art. You may use EJS features or plain HTML — both are perfectly fine.

### 2. Name the file correctly

* The filename **must be unique**.
* It must match the art’s identifier.
* Use **kebab-case** only.

Valid examples:

* `ghost`
* `penrose-triangle`
* `pretty-long-art-name`

### 3. Register your art

Open the file `src/_data/arts.json`.

Add a new object describing your art. A typical entry looks like this:

```json
{
  "caption": "Penrose triangle",
  "artId": "penrose-triangle",
  "bgColor": "Bgc-$art850"
}
```

* `artId` — must match the filename of your `.ejs` file.
* `caption` — optional and can be omitted.

### 4. Add a background color

Each art in the gallery has its own background color.

Open the mlut config file `src/assets/style/style.scss`.

Find the color palettes defined for:

* Dark theme: `@media (prefers-color-scheme: dark)`
* Light theme: `@media (prefers-color-scheme: light)`

Inside the appropriate media query, add a custom CSS property following this pattern:

```scss
@media (prefers-color-scheme: dark) {
  html {
    /* core styles */
    --ml-artYourArtName: /* your art background color */
  }
}
```

Please follow these rules:

* Use **camelCase** for custom property names.
* Replace `YourArtName` with your actual art name.

### 5. Link the background color

Return to your art object in `src/_data/arts.json` and set the `bgColor` value to:

```
"Bgc-$artYourArtName"
```

### 6. Submit your work

* Double‑check that everything works correctly.
* Commit your changes.
* Push them to your forked repository.
* Open a Pull Request to the original repository.

---

That’s it!

We’re excited to see your creations and hope they’ll become part of our **pure CSS art gallery** 
