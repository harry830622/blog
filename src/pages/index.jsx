import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default ({ location, data }) => {
  const siteTitle = data.site.siteMetadata?.title || 'yhchang';
  const posts = data.allContentfulPost?.nodes || [];

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Posts" />
      <Bio />
      {posts.map((post) => (
        <article
          key={post.slug}
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h2>
              <Link to={`/posts/${post.slug}`} itemProp="url">
                <span itemProp="headline">{post.title}</span>
              </Link>
            </h2>
            <small>{new Date(post.updatedAt).toDateString()}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: post.content.childMdx.excerpt,
              }}
              itemProp="description"
            />
          </section>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost(sort: { fields: updatedAt, order: DESC }) {
      nodes {
        slug
        tags
        title
        updatedAt
        content {
          childMdx {
            excerpt
          }
        }
      }
    }
  }
`;
