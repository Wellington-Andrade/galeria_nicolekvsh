import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tvqjz8gn',
    dataset: 'production',
  },
  // appId fixo evita o prompt a cada `npx sanity deploy`.
  deployment: {
    appId: 'cl2a0d5tttctykv84vpgswsl',
  },
})
