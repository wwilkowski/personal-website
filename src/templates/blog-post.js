import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Prism from "prismjs";
import ReactMarkdown from "react-markdown";

require("prismjs/components/prism-javascript");
require("prismjs/components/prism-haml");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-json");
require("prismjs/components/prism-graphql");


const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const MarkedHeader = styled.h1`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

const HeaderDate = styled.h3`
  margin-top: 10px;
  color: #606060;
`

const StyledImage = styled.img`
  padding: 3rem 0;
`;

const StyledQuote = styled.blockquote`
  color: #777;
  margin: 1.5rem 0;
  padding: 0.5rem 0 0.5rem 1rem;
  position: relative;
  border-left: 0.25em solid #ddd;
`;


const StyledCode = styled.code`
  background: #f1f1f1;
  padding: 0.3rem;
  margin: 0 0.2rem 0 0;
`;


function image(props) {
  return (
    <StyledImage src={props.src} alt="">
      {props.children}
    </StyledImage>
  );
}

function blockquote(props) {
  return <StyledQuote>{props.children}</StyledQuote>;
}

function paragraph(props) {
  return <p>{props.children}</p>;
}

function inlineCode(props) {
  return <StyledCode>{props.children}</StyledCode>;
}

function code(props) {
  if (!props.language) {
    return (
      <pre>
        <code dangerouslySetInnerHTML={{ __html: props.value }} />
      </pre>
    );
  } else {
    const html = Prism.highlight(props.value, Prism.languages[props.language]);
    const cls = "language-" + props.language;
    return (
      <pre className={cls}>
        <code dangerouslySetInnerHTML={{ __html: html }} className={cls} />
      </pre>
    );
  }
}


export default ({ data }) => {
  const post = data.datoCmsArticle
  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.description}
      />
      <Content>
        <MarkedHeader>{post.title}</MarkedHeader>
        <HeaderDate>
          {post.date} - NONE
        </HeaderDate>
        <ReactMarkdown
          source={post.content}
          renderers={{
            image: image,
            code: code,
            blockquote: blockquote,
            paragraph: paragraph,
            inlineCode: inlineCode
          }}
        />
      </Content>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    datoCmsArticle(slug: { eq: $slug }) {
      id
      title
      date(formatString: "DD MMMM YYYY", locale: "pl-PL")
      description
      content
      tags
      slug
    }
  }
`;

