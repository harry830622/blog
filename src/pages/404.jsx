import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundPage = ({ location, data }) => {
  const siteTitle = data.site.siteMetadata?.title;

  return (
    <Layout location={location} title={siteTitle || 'yhchang'}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
