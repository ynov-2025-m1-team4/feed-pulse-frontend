// sentry.client.config.js
Sentry.init({
  dsn: "https://4ec2952d766cb855563c8bbcdde40b16@o4509507231678464.ingest.de.sentry.io/4509513311060048",
  integrations: [Sentry.browserTracingIntegration()],
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/]
});