# SQLbase Security Nexus

A documentation platform for **SQLbase** – the cross-platform security scanning toolkit. The site visualizes SQL injection scanning through an interactive, terminal-inspired interface with 3D data structures.

## Design

- **Retro-futuristic security console**: CRT-style visuals, green/amber palette, scanlines, and terminal boot sequence.
- **Interactive modules**: SQL Injection Visualizer (split-screen code + 3D), Dynamic Testing Simulator, CI/CD Pipeline Visualizer, Security Score Dashboard, Live Terminal.
- **Filesystem-style navigation**: UNIX-style tree for sqlbase modules (scanner, tester, remediation, etc.).
- **Accessibility**: Reduced motion respected, semantic HTML, ARIA where needed.

## Tech stack

- **Next.js 14** (App Router)
- **React 18**
- **Three.js** via `@react-three/fiber` and `@react-three/drei` for 3D
- **CSS modules** for CRT effects, glitch, scanlines

## Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use this for development (hot reload, no upload needed).

### Preview the static site (as it will look when uploaded)

To preview the built static site locally (same as after upload):

```bash
npm run preview
```

This builds the site and serves the `out/` folder at [http://localhost:3000](http://localhost:3000). To preview the exact `htdocs` folder contents:

```bash
npm run preview:htdocs
```

## Build (static export)

The site is built as **static HTML** so you can host it anywhere (including servers that expect `index.html` in `htdocs`):

```bash
npm run build
```

This creates an `out/` folder with `index.html` and assets.

### Deploy to htdocs (index.html required)

If your host expects **index.html** (or index.php/index.htm) inside an **htdocs** directory:

```bash
npm run build:htdocs
```

Then upload **everything inside the `htdocs` folder** to your server’s htdocs directory. You’ll have `htdocs/index.html` and the rest of the site files there.

## GitHub Pages (build once on GitHub)

The repo is set up so **GitHub builds the site once** on each push; you only push source code, no build folder.

1. **Push this repo** to GitHub (e.g. `main` branch). Do **not** commit `node_modules`, `out`, or `htdocs` contents.

2. **Turn on GitHub Pages from Actions**  
   In the repo: **Settings → Pages**. Under “Build and deployment”, set **Source** to **GitHub Actions**.

3. **Trigger a build**  
   Push to `main` (or run the workflow manually: **Actions → Deploy to GitHub Pages → Run workflow**). The workflow will:
   - Install dependencies
   - Run `npm run build` (static export)
   - Deploy the `out/` folder to GitHub Pages

4. **Site URL**  
   After the first successful run, the site will be at:
   - **Project site:** `https://<your-username>.github.io/<repo-name>/`  
   (e.g. `https://nome.github.io/SQLBASEDOCU/`)

Workflow file: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

## Pushing to GitHub (optimized size)

Only source code and config are tracked. The following are **ignored** so the repo stays small:

- `node_modules/` – install with `npm install` after clone (or let GitHub Actions install on deploy)
- `.next/`, `out/`, `htdocs/*` – build output; never push these; GitHub builds once on deploy
- Logs, IDE files, OS cruft (see `.gitignore`)

After cloning, run `npm install` then `npm run dev` or `npm run preview`.

## Project structure

- `app/` – Next.js App Router (layout, page, globals)
- `components/` – Hero, Sidebar, SQLInjectionVisualizer, DynamicTestingSimulator, CIPipelineVisualizer, SecurityDashboard, LiveTerminal, InstallUsage, Scene3D

The content (Install/Usage, CI info) is derived from the main SQLbase README and presented in the docs UI.
