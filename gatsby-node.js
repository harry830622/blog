exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const Post = require.resolve(`./src/templates/Post.jsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allContentfulPost(sort: { fields: updatedAt, order: DESC }) {
          nodes {
            slug
            title
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data.allContentfulPost?.nodes ?? [];

  // Create blog posts pages
  // `context` is available in the template as a prop and as a variable in GraphQL
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: `/posts/${post.slug}`,
      component: Post,
      context: {
        slug: post.slug,
        previous,
        next,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }
  `);
};
