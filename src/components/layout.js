/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import Header from "./header"
import "./layout.css"
import { ThemeContext } from "./ThemeContext"

const themes = {
  light: {
    foreground: "inherit",
    background: "inherit",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
}

const ThemedLayout = styled.div`
  color: ${props => themes[props.theme.name].foreground};
  background-color: ${props => themes[props.theme.name].background};
  transition: all 0.4s ease;
  min-height: 100vh;

  & a {
    color: ${props => (props.theme.name === "dark" ? "#B38CD9" : "inherit")};
  }
`

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (min-width: 900px) {
    padding: 0;
  }
`

const GatsbyLink = styled.a`
  margin-left: 5px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeContext.Consumer>
        {theme => (
          <ThemedLayout theme={theme}>
            <Header siteTitle={data.site.siteMetadata.title} theme={theme} />
            <Content>
              <main>{children}</main>
              <Footer>
                <p>
                  © {new Date().getFullYear()}, Built with
            {` `}
                </p>
                <GatsbyLink href="https://www.gatsbyjs.org">Gatsby</GatsbyLink>
              </Footer>
            </Content>
          </ThemedLayout>
        )}
      </ThemeContext.Consumer>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
