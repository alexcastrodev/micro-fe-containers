# Playwright Integration Tests

This folder contains end-to-end tests that validate the full micro-frontend integration:

- Auth login flow (`/login` + `auth-api`)
- Host navigation (`kurz-panel`)
- Remote loading (`iot` and `finance` federation remotes)
- Role-based access control (`admin`, `iot-viewer`, `finance-viewer`)
- Session persistence after refresh

## Usage

```bash
cd playwright
pnpm install
pnpm exec playwright install chromium
```

Run with an already running stack:

```bash
pnpm test
```

Or run full integration flow (up/build -> test -> down):

```bash
pnpm test:integration
```

If a test fails, open the report:

```bash
pnpm exec playwright show-report
```
