import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({
  location,
  lang,
  title,
  isTitleOverwritten,
  description,
  keywords,
  imageUrl,
  meta,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            keywords
            social {
              twitter
            }
          }
        }
      }
    `,
  );

  const url = `${site.siteMetadata.siteUrl}${location.pathname}`;
  const defaultTitle = site.siteMetadata?.title;
  const metaDescription = description || site.siteMetadata?.description;
  const metaKeywords =
    keywords.length > 0 ? keywords : site.siteMetadata?.keywords;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={
        isTitleOverwritten ? null : `%s — ${defaultTitle || 'SITE TITLE'}`
      }
      link={[{ rel: 'canonical', href: url }]}
      meta={[
        {
          name: `description`,
          content: metaDescription || 'SITE DESCRIPTION',
        },
        {
          name: `keywords`,
          content: (metaKeywords || ['blog']).join(','),
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...(site.siteMetadata?.social?.twitter
          ? [
              {
                name: `twitter:creator`,
                content: `@${site.siteMetadata?.social?.twitter}`,
              },
            ]
          : []),
        ...(imageUrl
          ? [
              {
                property: 'og:image',
                content: imageUrl,
              },
              {
                name: 'twitter:card',
                content: 'summary_large_image',
              },
            ]
          : [
              {
                name: `twitter:card`,
                content: `summary`,
              },
            ]),
        ...meta,
      ]}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  isTitleOverwritten: false,
  description: '',
  keywords: [],
  imageUrl: '',
  meta: [],
};

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
  isTitleOverwritten: PropTypes.bool,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
};

export default SEO;
