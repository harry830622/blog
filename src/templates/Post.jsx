import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { MDXEmbedProvider } from 'mdx-embed';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Post = ({ location, data, pageContext }) => {
  const post = data.contentfulPost;
  const siteTitle = data.site.siteMetadata?.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        location={location}
        title={post.title}
        description={post.content.childMdx.excerpt}
        keywords={post.tags}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{new Date(post.updatedAt).toDateString()}</p>
        </header>
        <section itemProp="articleBody">
          <MDXProvider components={{ Link }}>
            <MDXEmbedProvider>
              <MDXRenderer>{post.content.childMdx.body}</MDXRenderer>
            </MDXEmbedProvider>
          </MDXProvider>
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/posts/${previous.slug}`} rel="prev">
                {`← ${previous.title}`}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/posts/${next.slug}`} rel="next">
                {`${next.title} →`}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query Post($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      slug
      tags
      title
      updatedAt
      content {
        childMdx {
          excerpt
          body
        }
      }
    }
  }
`;
