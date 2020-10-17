import React from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';

const Layout = ({ location, children, title }) => {
  const { site } = useStaticQuery(graphql`
    query Layout {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `);

  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  const header = isRootPath ? (
    <h1 className="main-heading">
      <Link to="/">{title || 'SITE TITLE'}</Link>
    </h1>
  ) : (
    <Link className="header-link-home" to="/">
      {title || 'SITE TITLE'}
    </Link>
  );

  const social = site.siteMetadata?.social;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <a
          href={`https://twitter.com/${social?.twitter || ''}`}
          target="_blank"
          rel="noreferrer"
        >
          twitter
        </a>
        {` • `}
        <a
          href={`https://github.com/${social?.github || ''}`}
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        {` • `}
        <a
          href={`https://www.linkedin.com/in/${social?.linkedin || ''}`}
          target="_blank"
          rel="noreferrer"
        >
          linkedin
        </a>
      </footer>
    </div>
  );
};

Layout.defaultProps = {
  title: '',
};

Layout.propTypes = {
  title: PropTypes.string,
};

export default Layout;
