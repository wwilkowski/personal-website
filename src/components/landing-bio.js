import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Skills from './skills'

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 78vh;
  max-width: 60rem;
  margin: 0 auto;
`

const Title = styled.h2`
  padding: 0;
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 19px;
`

const Description = styled.p`
  padding: 0;
  margin-bottom: 12px;
  font-weight: 300;
  max-width: 500px;
`

const NameHeader = styled.h1`
  margin-bottom: 1.5rem;
`

const SocialsList = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  flex-wrap: wrap;
`

const SocialLink = styled.a`
  text-transform: none;
  margin: 0 1rem 0 0;
`

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 38px;

  @media (min-width: 900px) {
    width: 120px;
    height: 120px;
  }
`

const About = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`

const AboutText = styled.p`
  font-size: 16px;
  font-weight: 300;

  @media (min-width: 900px) {
    font-size: 19px;
  }
`

const LandingBio = () => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
        allDatoCmsHomePage {
          edges {
            node {
              image {
                url
              }
              title
              description
              socials {
                name
                url
              }
              about
            }
          }
        }
      }
    `}
    render={data => (
      <OuterContainer>
        <About>
          <StyledImage src={data.allDatoCmsHomePage.edges[0].node.image.url} alt="author's image" />
          <div>
            <Title>{data.allDatoCmsHomePage.edges[0].node.title}</Title>
            <Description>{data.allDatoCmsHomePage.edges[0].node.description}</Description>
            <SocialsList>
              {data.allDatoCmsHomePage.edges[0].node.socials.map(social => <li><SocialLink target='_blank' href={social.url}>{social.name}</SocialLink></li>)}
            </SocialsList>
          </div>
        </About>
        <AboutText>{data.allDatoCmsHomePage.edges[0].node.about}</AboutText>
        <Skills />
      </OuterContainer>
    )}
  />
)

NameHeader.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

NameHeader.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default LandingBio
