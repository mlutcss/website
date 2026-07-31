# AGENTS Guide

## Project Overview

- **Name:** mlut website
- **Stack:** Eleventy, mlut, ejs, Sass, Javascript
- **Architecture:** SSG (Static site generation)

## Project Structure

- `src/` - editable sources
- `src/_includes/` - partials and reusable templates
- `src/_data/` - global Eleventy data
- `src/assets/` - styles, scripts, images, and other static assets
- `src/layouts/` - reusable generic layouts for pages
- `src/arts/` - pure CSS arts
- `dist/` - generated output

## Setup and commands

- **Install dependencies:** `npm i`
- **Build project:** `npm run build`
- **Start dev server:** `npm start`
- **Start mlut CLI in watch mode:** `npm run mlut`

## Working rules

- Always try to address the cause, not the effect
- Use modern vanilla JS with custom elements and without frameworks. See examples of components in `src/assets/script/`
- Use Atomic CSS aproach with mlut for writing styles
- Do not install new third-party packages without asking the user first
