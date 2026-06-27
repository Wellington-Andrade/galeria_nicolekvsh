import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Coleção',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 64},
      validation: (rule) => rule.required(),
      description: 'Gerado automaticamente a partir do nome. Use apenas letras minúsculas e hífens.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      description: 'Breve descrição exibida nos cards da coleção.',
    }),
    defineField({
      name: 'coverArtwork',
      title: 'Obra de capa',
      type: 'reference',
      to: [{type: 'artwork'}],
      description:
        'Obra que representa a coleção nos cards. Deixe em branco para usar a primeira obra automaticamente.',
      options: {
        // Lista só as obras desta coleção (as que apontam de volta para ela).
        filter: ({document}) => {
          const id = (document._id || '').replace(/^drafts\./, '')
          return {filter: 'collection._ref == $id', params: {id}}
        },
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Menor número aparece primeiro na listagem.',
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
    select: {title: 'title', subtitle: 'subtitle'},
  },
})
