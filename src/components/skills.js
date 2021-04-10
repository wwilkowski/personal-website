import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

const Container = styled.div`
`

const Title = styled.h2`
    font-size: 19px;
`

const SkillName = styled.h3`
    font-weight: 500;
    font-size: 16px;
    margin: 0;
    margin-bottom: 0.3rem;
`

const SkillDescription = styled.p`
    font-size: 16px;
    margin: 0;
    padding: 0;
    font-weight: 300;
`

const SkillList = styled.ul`
    list-style-type: none;
    margin: 0;
`

const SkillItem = styled.li`
    position: relative;
    padding-left: 1.45rem;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background-color: #7C7C7C;
        border-radius: 50px;
    }

    &::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 50%;
        width: 1px;
        height: 120%;
        background-color: #7C7C7C;
    }

    &:last-of-type {
        /* display: none; */
        &::after {
            content: '';
            position: absolute;
            left: 3px;
            top: 50%;
            width: 1px;
            height: 0;
            background-color: #7C7C7C;
        }
    }
`

const SkillDate = styled.p`
    font-weight: 300;
    font-size: 14px;
`

const Skills = () => (
    <StaticQuery
        query={graphql`
            query SkillsQuery {
                allDatoCmsCareerInfo {
                    edges {
                        node {
                            title
                            experience {
                                startDate
                                endDate
                                title
                                company
                                description
                                technologies
                                resource
                            }
                        }
                    }
                }
            }
        `}
        render={data => (
            <Container>
                <Title>{data.allDatoCmsCareerInfo.edges[0].node.title}</Title>
                <SkillList>
                    {data.allDatoCmsCareerInfo.edges[0].node.experience.map(ex => {
                        return (
                            <SkillItem>
                                <SkillName>{ex.title}</SkillName>
                                <SkillDescription>{ex.description}</SkillDescription>
                                <SkillDate>{ex.startDate} - {ex.endDate || "obecnie"}</SkillDate>
                            </SkillItem>
                        )
                    })}

                </SkillList>
            </Container>
        )}
    />
)

export default Skills
