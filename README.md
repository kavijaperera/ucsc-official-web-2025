<p align="center">
  <a href="https://ucscieee.lk">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/logo-white.svg">
      <img src="public/logo-blue.svg" alt="UCSC IEEE Student Branch" width="360">
    </picture>
  </a>
</p>

<h1 align="center">IEEE Student Branch of UCSC</h1>

<p align="center">
  The website of the IEEE Student Branch of the<br>
  University of Colombo School of Computing.
</p>

<p align="center">
  <a href="https://ucscieee.lk">Visit the website</a> ·
  <a href="https://www.linkedin.com/company/ucscieeesb/">LinkedIn</a> ·
  <a href="https://www.instagram.com/ucsc.ieee/">Instagram</a> ·
  <a href="https://www.facebook.com/IEEE.UCSC/">Facebook</a>
</p>

<p align="center">
  <a href="https://github.com/IEEEUCSC/ucsc-official-web-2025/actions/workflows/deploy.yml">
    <img src="https://github.com/IEEEUCSC/ucsc-official-web-2025/actions/workflows/deploy.yml/badge.svg" alt="GitHub Pages deployment workflow">
  </a>
</p>

## About the website

Established in 2011, the IEEE Student Branch of UCSC brings students together
through technical learning, competitions, volunteering, and professional
development. This website presents the branch's activities and the people
behind them.

- **Branch overview** — an introduction to IEEE UCSC and its areas of activity.
- **Events and timeline** — workshops, competitions, and past initiatives.
- **Our team** — executive and standing committees, with member profiles.
- **Previous officers** — a dedicated page for past committees.
- **Blog** — event highlights, technical articles, and community updates.
- **Contact** — branch contact details and social channels.

The site uses repository-managed content and local media. There is no CMS,
database, or API key required for local development.

## Built with

| Technology | Role |
| --- | --- |
| Next.js 16 · React 19 | Pages, components, metadata, and static export |
| Tailwind CSS 4 | Styling, responsive layouts, and theme colors |
| GSAP · ScrollTrigger · `@gsap/react` | Scroll animations and page transitions |
| Lenis | Smooth scrolling |
| React Icons | Social and interface icons |
| GitHub Actions · GitHub Pages | Build checks and static-site deployment |

The site uses the locally hosted **Raveo** font. Exact dependency versions are
recorded in the lockfiles.

## Local development

Use **Node.js 24** and npm, matching the deployment workflow. If you use nvm,
the repository includes an `.nvmrc` file.

```bash
git clone https://github.com/IEEEUCSC/ucsc-official-web-2025.git ucsc-web-2025
cd ucsc-web-2025
nvm use
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Changes to pages and components
appear automatically while the development server is running.

### Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the versions recorded in `package-lock.json` |
| `npm run dev` | Start the local development server |
| `npm run lint` | Check JavaScript, JSX, and Next.js conventions |
| `npm run build` | Build the static site into `out/` |
| `npm audit` | Check installed dependencies for reported vulnerabilities |
| `npm run deploy` | Manually publish an existing `out/` build to `gh-pages` |

### Preview a production build

```bash
npm run lint
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

Open [localhost:4173](http://localhost:4173). Python is only needed for this
preview command; any static file server can serve `out/`.

`npm start` runs `next start`, which does **not** serve this project's static
export. Use a static file server to preview the production output.

## Updating website content

Most recurring content changes belong in [`utils/index.js`](utils/index.js).

| What to update | Where to edit |
| --- | --- |
| Navigation links | `navbarLinks` in `utils/index.js` |
| Areas of activity | `whatweDo` in `utils/index.js` |
| Timeline entries | `timelineData` in `utils/index.js` |
| Past events | `pastEvents` in `utils/index.js` |
| Current committees | `executiveCommittee` and `standingCommittee` in `utils/index.js` |
| Previous officers | `prevOfficers` in `utils/index.js` |
| Blog posts | `blogs` in `utils/index.js` |
| Contact details and social links | `contactInfo` and `contactExCom` in `utils/index.js` |
| Page title, description, and sharing image | `metadata` in `app/layout.jsx` |
| Brand colors and shared styles | `styles/globals.css` |
| Logos, photographs, and video | `public/` |

### Adding or replacing a team portrait

1. Place the compressed image under `public/images/team/`, in the appropriate
   committee folder.
2. Set the member's `image` value relative to `public/images/team/`, for example
   `excom/hashen.jpg`. The component adds `/images/team/` automatically.
3. Check the desktop and mobile crops. Team cards use `object-cover`, appear
   in grayscale by default, and show color on hover.

Keep images appropriately sized and compressed before committing them. Images
are served as static assets; Next.js image optimization is disabled for export.
Use full `https://` URLs for external links and descriptive alternative text
where image fields support it.

## Project structure

```text
app/
  layout.jsx                 Shared layout, font, and site metadata
  page.jsx                   Homepage composition
  previous-officers/page.jsx Previous officers page
  blog/page.jsx              Blog listing page
  blog/[slug]/page.jsx       Blog article page
components/                  Website sections and navigation
  helpers/                   Team cards, blog cards, animations, and transitions
utils/
  index.js                   Content, committee data, and contact details
  lenis.js                   Client-side smooth-scrolling export
styles/
  globals.css                Tailwind theme and shared styles
  fonts/                     Local font files
public/                      Logos, photographs, and video
.github/workflows/deploy.yml GitHub Pages deployment workflow
next.config.mjs              Static export and routing configuration
eslint.config.mjs            Lint configuration
```

## Deployment

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
runs when changes are pushed to **`main`**. It:

1. Installs dependencies with `npm ci` on Node.js 24.
2. Runs lint and creates the static production build.
3. Publishes `out/` to the **`gh-pages`** branch.

For branch-based GitHub Pages publishing, use `gh-pages` and the repository root
as the Pages source in the repository settings.

The build includes a `CNAME` for **`ucscieee.lk`** and a `.nojekyll` file. Routes
use trailing slashes and directory `index.html` files so page HTML and Next.js
route payloads resolve on static hosts. Transition links use the client router
with speculative prefetching disabled.

If the domain changes, update `CNAME`, the build script in `package.json`, the
deployment workflow, and `metadataBase` in `app/layout.jsx` together.

## Maintenance and contributions

Keep changes focused and explain their purpose in the pull request. For content
updates, check dates, names, roles, contact details, external links, and image
paths against the branch's approved information.

Before merging:

- Run `npm run lint` and `npm run build`.
- Preview the exported homepage, `/previous-officers/`, `/blog/`, and one blog article.
- Check desktop and mobile navigation, portrait crops, and scrolling behavior.
- After deployment, check the live routes, media, and social-sharing metadata.

### Dependency updates

npm is the package manager used by CI. After changing dependencies, update
`package-lock.json` with npm and regenerate the alternative pnpm lockfile with
`pnpm import`. Use one package manager per `node_modules` installation, and run
lint, build, and `npm audit` before accepting an update.

Next.js 16.4 supplies ESLint 10 compatibility adapters. Three bundled lint
plugins still declare older peer ranges, so scoped overrides in `package.json`
and `pnpm-workspace.yaml` align them with the root ESLint version. Keep these
overrides aligned and remove them when upstream peer ranges include ESLint 10.

The current frontend targets modern browsers. Tailwind 4 requires Safari 16.4+,
Chrome 111+, or Firefox 128+; consider browser support when changing the stack.

## Contact the branch

For branch inquiries, email [ucscieee@gmail.com](mailto:ucscieee@gmail.com) or
visit [ucscieee.lk](https://ucscieee.lk).

## Implementation Notes

### Design: matching the existing site

- **Same design tokens.** Introduced no new colors or fonts. The blog uses the theme colors from `styles/globals.css` (`primary-blue`, `secondary-blue`, `primary-white`) and inherits the Raveo font from the root layout.
- **Same shell.** The blog routes live under `app/`, so they automatically get the existing navbar, footer, Lenis smooth scrolling, preloader and page-transition overlay. I only added one `blog` entry to `navbarLinks`, which updates the desktop and mobile menus together.
- **Same visual language.** The pages follow the provided design reference: uppercase letter-spaced labels, large tight headings, rounded cards with soft shadows, and faint blurred blue gradients.
- **Same conventions.** Content is a `blogs` array in `utils/index.js` (like `pastEvents`). The reusable card sits in `components/helpers/` (like `TeamMembers`). Pages use `.jsx`. URLs use trailing slashes to match `trailingSlash: true`.
- **One shared-component fix.** `TransitionLink` now sends `#section` links to the homepage when they are clicked from another page, so the navbar works on `/blog/`. Behavior on the homepage is unchanged.

### Performance: large images and long titles

**Images**
- Next.js image optimization is disabled for this static export, so I compressed the photo before committing it (about 300 KB).
- Every image sits in a container with a fixed aspect ratio (`aspect-[4/3]` on small cards, `aspect-[3/4]` for the article image) and uses `fill` with `object-cover`. A very large or oddly shaped photo is cropped to fit. It cannot overflow the page or cause layout shift.
- `sizes` tells the browser how wide each image renders. Listing images lazy-load, and only the article's main image uses `priority`.

**Long titles**
- Cards clamp titles to 4 lines (`line-clamp-4`) and descriptions to 3 lines. `break-words` stops an unbroken string from overflowing.
- The article page shows the full title with `break-words`, a `max-w-6xl` limit, and responsive sizes (`text-4xl`, then `sm:text-6xl`, then `lg:text-[5.8rem]`).
- Article text is limited to a readable column (`max-w-[47rem]`).
- I checked long titles during development using a temporary placeholder post.

**Build-time work**
- Blog pages and `BlogCard` are server components with no `"use client"`. `generateStaticParams` pre-renders every article to static HTML, and no new dependencies were added. Unknown slugs return a 404 (`dynamicParams = false`).

### Improvements: one feature I would add next

**Search and category filter on the listing page.** Each post already has a `category`, so a small client component (`useState` plus `filter`) could let readers search titles and descriptions and filter by category without changing the data model. This matters once the blog has more than a handful of posts. Pagination ("Load more") would be the follow-up for a very long list.