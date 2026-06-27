import {defineField, defineType} from 'sanity'

// Mantém os campos já existentes (name, image, published, featured, order)
// e adiciona Ano, Técnica e Dimensões. Todos os novos são opcionais — as
// obras já cadastradas continuam válidas (campos vazios = null).
export default defineType({
  name: 'artwork',
  title: 'Obra',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Ano',
      type: 'string',
      description: 'Ex.: 2024',
    }),
    defineField({
      name: 'technique',
      title: 'Técnica',
      type: 'string',
      description: 'Ex.: Óleo sobre tela',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensões',
      type: 'string',
      description: 'Dimensões reais da obra. Ex.: 120 × 80 cm',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
      description:
        'Texto opcional sobre a obra. Quando preenchido, substitui o texto padrão na ficha da obra.',
    }),
    defineField({
      name: 'available',
      title: 'Disponível',
      type: 'boolean',
      description: 'Indica se a obra está disponível para aquisição.',
      initialValue: true,
    }),
    defineField({
      name: 'collection',
      title: 'Coleção',
      type: 'reference',
      to: [{type: 'collection'}],
      description:
        'Define em qual coleção a obra aparece. Deixe em branco para obra independente.',
    }),
    defineField({
      name: 'published',
      title: 'Publicada',
      type: 'boolean',
      description: 'Somente obras publicadas aparecem no site.',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      description: 'Define a obra em destaque na home.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Menor número aparece primeiro na galeria.',
    }),
  ],
  orderings: [
    {
      title: 'Ordem (crescente)',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'year',
      media: 'image',
    },
  },
})
