import { RetryPlugin } from '@module-federation/retry-plugin'

export default () =>
  RetryPlugin({
    retryTimes: 3,
    retryDelay: 1000,
    addQuery: true,
    onRetry: ({ times, url }) => console.warn(`[mf-retry] attempt ${times} for ${url}`),
    onError: ({ url }) => console.error(`[mf-retry] gave up on ${url}`),
  })
