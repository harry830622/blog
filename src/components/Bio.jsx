import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query Bio {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
      thumbnail: contentfulAsset(title: { eq: "thumbnail" }) {
        fixed(width: 50, height: 50, quality: 95) {
          ...GatsbyContentfulFixed
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  const thumbnail = data.thumbnail?.fixed;

  return (
    <div className="bio">
      {thumbnail && (
        <Img
          fixed={thumbnail}
          alt={author?.name || 'YOUR NAME'}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <p>
        {`Personal blog by `}
        <a
          href={`https://twitter.com/${social?.twitter || ''}`}
          target="_blank"
          rel="noreferrer"
        >
          {author?.name || 'YOUR NAME'}
        </a>
        .
        <br />
        {author?.summary || 'YOUR SUMMARY'}
      </p>
    </div>
  );
};

export default Bio;
