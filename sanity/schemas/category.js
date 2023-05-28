import {defineField, defineType} from 'sanity'

export default defineType({
  // table
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  // columns
  fields: [
    defineField({
      name: 'title',
      title: 'Category name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image of Company',
      type: 'image',
    }),
  ],
})
