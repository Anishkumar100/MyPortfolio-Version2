// In schemas/project.js


//always know that the name attribute must have camelCase
export default  {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of your project.',
    },
    {
      name: 'githubLink',
      title: 'Github link for the project',
      type: 'url',
      description: "The unique url of your project's repository from github ",
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'The main screenshot or thumbnail for the project.',
      options: {
        hotspot: true, // This lets you crop images nicely in the studio
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the project.',
    },
    {
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'The live URL where the project is deployed.',
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of technologies used (e.g., React, Node.js).',
      options: {
        layout: 'tags' // This makes it look like tags in the editor
      }
    },
  ],
};