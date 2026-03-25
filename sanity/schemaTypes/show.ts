import { defineType, defineField } from "sanity";

export const showType = defineType({
  name: "show",
  title: "Show",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City, Country (e.g., 'Berlin, Germany')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lineup",
      title: "Lineup",
      type: "text",
      description: "Other artists performing (optional)",
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
      description: "Link to buy tickets (optional)",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "Show time (e.g., '20:00' or '8:00 PM')",
    }),
  ],
  preview: {
    select: {
      venue: "venue",
      location: "location",
      date: "date",
    },
    prepare({ venue, location, date }) {
      return {
        title: location ? `${venue} - ${location}` : venue || "Untitled Show",
        subtitle: `${location} - ${date}`,
      };
    },
  },
});
