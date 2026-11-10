# Nyi Lin Naing – portfolio

Personal portfolio built with React and Vite, live at https://tznyi.github.io/my_pf/

The centrepiece is an interactive few-shot learning lab (`src/components/FewShotLab.jsx`): a Prototypical Network running in the browser. Visitors label examples and watch every other point get classified by its distance to each group's prototype, the method behind my MSc dissertation.

## Edit the content

All text lives in `src/data.js`.

## Run locally

```bash
npm install
npm run dev
```

GitHub Actions builds and deploys the site on every push to `main` (`.github/workflows/deploy.yml`).
