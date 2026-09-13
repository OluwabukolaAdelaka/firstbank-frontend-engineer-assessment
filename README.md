# NewsOnline

A responsive React + TypeScript news feed built for the FirstBank frontend engineer assessment. It fetches live articles from [NewsAPI.org](https://newsapi.org) and renders them as a paginated card grid, translated from the provided design.

## Setup

```bash
yarn install
```

Create a `.env` file in the project root with your own [NewsAPI.org](https://newsapi.org) API key:

```
VITE_NEWS_API_KEY=your_newsapi_org_key_here
VITE_NEWS_API_BASE_URL=https://newsapi.org/v2
```

Then run the dev server:

```bash
yarn dev
```

## Notes / assumptions

- **Data source:** the feed uses `GET /v2/top-headlines?country=us`.
- **NewsAPI free-tier limits:** the developer/free plan truncates `description` and `content` server-side (~200 characters) and caps pagination at the first 100 results. A small amount of client-side cleanup (`src/utils/text.ts`) trims dangling mid-sentence cutoffs back to the last complete sentence where possible.
- **Pagination:** capped at 6 pages to match the design, with 6 articles per page.
- Articles with neither a `description` nor `content` are filtered out of the feed rather than rendered as an empty-looking card.

## Tech stack

- React 19 + TypeScript
- Vite
- Plain CSS (component-scoped stylesheets, no framework)
