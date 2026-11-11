# Nyi Lin Naing – portfolio

Personal portfolio built with React, Three.js (react-three-fiber) and Vite, live at https://tznyi.github.io/my_pf/

- `src/components/EmbeddingSpace.jsx`: the 3D hero. Every project is a point in an embedding space, grouped into clusters with a prototype at each centre.
- `src/components/FewShotLab3D.jsx`: a Prototypical Network running in the browser in 3D. Visitors label points and watch every other point get classified by its distance to each group's prototype, the method behind my MSc dissertation.

## Edit the content

All text lives in `src/data.js`.

## Run locally

```bash
npm install
npm run dev
```

GitHub Actions builds and deploys the site on every push to `main` (`.github/workflows/deploy.yml`).
