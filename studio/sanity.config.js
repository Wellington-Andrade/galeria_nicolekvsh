import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Mesmo projeto/dataset que o site consome (somente leitura no frontend).
export default defineConfig({
  name: 'default',
  title: 'Galeria Nicole Kvsh',

  projectId: 'tvqjz8gn',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
