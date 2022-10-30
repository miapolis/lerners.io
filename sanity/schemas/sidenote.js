export default {
  name: "sidenote",
  type: "object",
  title: "Sidenote",
  fields: [
    {
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Correct", value: "correct" },
          { title: "Incorrect", value: "incorrect" },
        ],
      },
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
    },
  ],
};
