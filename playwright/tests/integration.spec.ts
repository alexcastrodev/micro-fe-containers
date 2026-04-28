import { expect, test, type Page } from '@playwright/test'

type Credentials = { username: string; password: string }

async function login(page: Page, credentials: Credentials) {
  await page.goto('/login')

  await page.locator('input').nth(0).fill(credentials.username)
  await page.locator('input[type="password"]').fill(credentials.password)
  await page.getByRole('button', { name: 'Entrar' }).click()
}

test.describe('Micro-frontend integration', () => {
  test('admin sees all remotes and pages', async ({ page }) => {
    const loadedRemotes = new Set<string>()
    page.on('response', (response) => {
      const url = response.url()
      if (response.ok() && url.includes('http://localhost:5174/remoteEntry.js')) {
        loadedRemotes.add('iot')
      }
      if (response.ok() && url.includes('http://localhost:5175/remoteEntry.js')) {
        loadedRemotes.add('finance')
      }
    })

    await login(page, { username: 'admin', password: 'admin123' })

    await expect(page.getByText('Dashboard')).toBeVisible()
    await expect(page.getByRole('link', { name: 'IoT Loggers' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'IoT Map' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Finance Summary' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Finance Transactions' })).toBeVisible()
    await expect(page).toHaveScreenshot('admin-dashboard.png', { fullPage: true })

    await page.getByRole('link', { name: 'IoT Loggers' }).click()
    await expect(page).toHaveURL(/\/iot\/loggers/)
    await expect(page.getByRole('heading', { name: /IoT.*Loggers/i })).toBeVisible()
    await expect(page).toHaveScreenshot('admin-iot-loggers.png', {
      fullPage: true,
      mask: [page.locator('.recharts-responsive-container')],
    })

    await page.getByRole('link', { name: 'IoT Map' }).click()
    await expect(page).toHaveURL(/\/iot\/map/)
    await expect(page.getByRole('heading', { name: 'IoT Map' })).toBeVisible()
    await expect(page).toHaveScreenshot('admin-iot-map.png', {
      fullPage: true,
      mask: [page.locator('.leaflet-container, canvas, svg')],
    })

    await page.getByRole('link', { name: 'Finance Summary' }).click()
    await expect(page).toHaveURL(/\/finance\/summary/)
    await expect(page.getByRole('heading', { name: 'Finance Summary' })).toBeVisible()
    await expect(page).toHaveScreenshot('admin-finance-summary.png', {
      fullPage: true,
      mask: [page.locator('.recharts-responsive-container')],
    })

    await page.getByRole('link', { name: 'Finance Transactions' }).click()
    await expect(page).toHaveURL(/\/finance\/transactions/)
    await expect(page.getByRole('heading', { name: 'Finance Transactions' })).toBeVisible()
    await expect(page).toHaveScreenshot('admin-finance-transactions.png', {
      fullPage: true,
      mask: [page.locator('.recharts-responsive-container')],
    })

    expect(loadedRemotes.has('iot')).toBeTruthy()
    expect(loadedRemotes.has('finance')).toBeTruthy()

    await page.reload()
    await expect(page.getByText('Alice Admin')).toBeVisible()
  })

  test('iot-viewer cannot access finance routes', async ({ page }) => {
    await login(page, { username: 'iot', password: 'iot123' })

    await expect(page.getByRole('link', { name: 'IoT Loggers' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'IoT Map' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Finance Summary' })).toHaveCount(0)
    await expect(page).toHaveScreenshot('iot-viewer-dashboard.png', { fullPage: true })

    await page.goto('/finance/summary')
    await expect(page.getByText('403 - Forbidden')).toBeVisible()
    await expect(page).toHaveScreenshot('iot-viewer-forbidden-finance.png', { fullPage: true })
  })

  test('finance-viewer cannot access iot routes', async ({ page }) => {
    await login(page, { username: 'finance', password: 'finance123' })

    await expect(page.getByRole('link', { name: 'Finance Summary' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Finance Transactions' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'IoT Loggers' })).toHaveCount(0)
    await expect(page).toHaveScreenshot('finance-viewer-dashboard.png', { fullPage: true })

    await page.goto('/iot/loggers')
    await expect(page.getByText('403 - Forbidden')).toBeVisible()
    await expect(page).toHaveScreenshot('finance-viewer-forbidden-iot.png', { fullPage: true })
  })
})
