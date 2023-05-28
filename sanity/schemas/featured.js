import {defineField, defineType, validation} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature Menu Category',

  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Feature Category name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'A short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'restaurant',
      type: 'array',
      title: 'Restaurant',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    }),
  ],
})
