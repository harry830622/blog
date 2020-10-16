import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

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
      avatar: file(absolutePath: { regex: "/thumbnail.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  const avatar = data.avatar?.childImageSharp?.fixed;

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || 'Harry Chang'}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <p>
        {`Personal blog by `}
        <a
          href={`https://twitter.com/${social?.twitter || 'harry830622'}`}
          target="_blank"
          rel="noreferrer"
        >
          {author?.name || 'Harry Chang'}
        </a>
        .
        <br />
        {author?.summary || 'I build cool things.'}
      </p>
    </div>
  );
};

export default Bio;
