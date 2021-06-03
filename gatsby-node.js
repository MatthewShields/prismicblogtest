/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
  {
    prismic {
      allPosts {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  }
  
  `)
  const template = path.resolve('src/templates/post.js')
  console.log(pages);
  console.log(pages.data);
  pages.data.prismic.allPosts.edges.forEach(edge => {

    let page_path = '/'+edge.node._meta.uid;
    if(edge.node._meta.uid === 'index') {
      page_path = '/';
    }

    console.log('page_path');
    console.log(page_path);

    createPage({
      path: `${page_path}`,
      component: template,
      context: {
        uid: edge.node._meta.uid,
      },
    })
  })
}


// const { createRemoteFileNode } = require("gatsby-source-filesystem")
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   createTypes(`
//     type PRISMIC_PostBodyImage_grid implements Node {
//       fields: GridImage
//       grid_imageSharpMine: File @link(from: "grid_imageSharpNode")
//     }

//     type GridImage {
//       grid_image: String
//     }
//   `)
// }
// exports.onCreateNode = async ({
//   node,
//   actions: { createNode },
//   store,
//   cache,
//   createNodeId,
// }) => {
//   // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
//   if (
//     node.internal.type === "PRISMIC_PostBodyImage_grid" &&
//     node.frontmatter.featuredImgUrl !== null
//   ) {
//     let fileNode = await createRemoteFileNode({
//       url: node.fields.grid_image, // string that points to the URL of the image
//       parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
//       createNode, // helper function in gatsby-node to generate the node
//       createNodeId, // helper function in gatsby-node to generate the node id
//       cache, // Gatsby's cache
//       store, // Gatsby's redux store
//     })
//     // if the file was created, attach the new node to the parent node
//     if (fileNode) {
//       node.grid_imageSharpNode = fileNode.id
//     }
//   }
// }