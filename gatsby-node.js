/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  return graphql(
    `
      {
        allDatoCmsArticle(
          sort: { fields: [date], order: DESC }
          limit: 10
          skip: 0
        ) {
          edges {
            node {
              slug
              title
            }
          }
        }
        tagsGroup: allDatoCmsArticle(limit: 2000) {
          group(field: tags) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allDatoCmsArticle.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: 'blog/' + post.node.slug,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previous,
          next
        }
      });
    });

    // Create blog sites by tags
    // const tags = result.data.tagsGroup.group;
    // tags.forEach(tag => {
    //   createPage({
    //     path: `/tags/${tag.fieldValue.toLowerCase()}`,
    //     component: path.resolve('./src/templates/posts-by-tag-template.js'),
    //     context: {
    //       limit: postsPerPage,
    //       tag: tag.fieldValue
    //     }
    //   });
    // });
  });
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `allDatoCmsArticle`) {
//     const value = createFilePath({ node, getNode });
//     createNodeField({
//       name: `slug`,
//       node,
//       value
//     });
//   }
// };


// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
//   return graphql(`
//     {
//       allMarkdownRemark {
//         edges {
//           node {
//             frontmatter {
//               path
//               draft
//               date
//             }
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       return Promise.reject(result.errors)
//     }
//     result.data.allMarkdownRemark.edges
//       .filter(({ node }) => !node.frontmatter.draft)
//       .forEach(({ node }) => {
//         createPage({
//           path: node.frontmatter.path,
//           component: blogPostTemplate,
//           slug: node.fields.slug,
//           context: {},
//         })
//       })
//   })
// }
