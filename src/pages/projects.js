import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
`

const MarkerHeader = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
`

const ProjectsPage = ({ data }) => {
    return (
        <Layout>
            <SEO title="Projects" />
            <Content>
                <h1>Projekty</h1>
                {data.allDatoCmsArticle.edges
                    .filter(({ node }) => {
                        const rawDate = node.date
                        const date = new Date(rawDate)
                        return date < new Date()
                    })
                    .map(({ node }) => (
                        <div key={node.id}>
                            <Link
                                to={node.slug}
                                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
                            >
                                <MarkerHeader>{node.title}</MarkerHeader>
                            </Link>
                            <div>
                                <ArticleDate>{node.date}</ArticleDate>
                                <ReadingTime> - NONE</ReadingTime>
                            </div>
                        </div>
                    ))}
            </Content>
        </Layout>
    )
}

export default ProjectsPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allDatoCmsArticle {
      edges {
        node {
          id
          slug
          title
          date
          tags
        }
      }
    }
  }
`
