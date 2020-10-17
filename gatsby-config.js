require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteUrl: `https://yhchang.me`,
    title: `yhchang`,
    author: {
      name: `Harry Chang`,
      summary: `I build cool stuff.`,
    },
    description: `Personal blog by Harry Chang. I build cool stuff.`,
    keywords: ['blog', 'code', 'entrepreneurship', 'life'],
    social: {
      twitter: `harry830622`,
      github: `harry830622`,
      linkedin: `harry830622`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        ...(process.env.NODE_ENV === 'development'
          ? {
              host: 'preview.contentful.com',
            }
          : {}),
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `yhchang`,
        short_name: `yhchang`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `assets/icon.png`,
      },
    },
    // `gatsby-plugin-feed`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
