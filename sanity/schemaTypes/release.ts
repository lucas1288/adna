import { defineType, defineField } from "sanity";

export const releaseType = defineType({
  name: "release",
  title: "Release",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "release_type",
      title: "Release Type",
      type: "string",
      options: {
        list: [
          { title: "Album", value: "album" },
          { title: "EP", value: "ep" },
          { title: "Single", value: "single" },
          { title: "Live Session", value: "live-session" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: 'Short description (e.g., "Adna. album (2012)")',
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Link to streaming service or purchase page",
    }),
    defineField({
      name: "is_featured",
      title: "Featured on Homepage",
      type: "boolean",
      description: "Show this release as featured on the homepage",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "release_type",
    },
  },
});
