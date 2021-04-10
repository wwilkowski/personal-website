import { Link } from "gatsby"
import styled from "@emotion/styled"
import React from "react"
import Switch from "react-switch"
import sunIcon from "../images/sun-icon.svg"
import moonIcon from "../images/moon-icon.svg"

const Content = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
`

const NavLink = styled(Link)`
  color: black;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const HomeLink = styled(NavLink)`
  margin-left: 0;
  font-size: 19px;
  font-weight: bold;
`

const SiteHeader = styled.header`
  background: transparent;
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;

  @media (min-width: 900px) {
    padding: 2rem 0;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Nav = styled.nav`
  display: flex;
`

const StyledSwitch = styled(Switch)`
  margin: 0 2rem;
`

const Title = styled.h1`
  margin: 0;
`

const Header = ({ siteTitle, theme }) => (
  <SiteHeader>
    <Content>
      <Container>
        <Title>
          <HomeLink to="/">
            wwilkowski
          </HomeLink>
        </Title>
        <Nav>
          <StyledSwitch
            onChange={() => theme.updateTheme(theme.name === "light" ? "dark" : "light")}
            checked={theme.name === "dark"}
            onColor="#222"
            offColor="#333"
            checkedIcon={<img src={moonIcon} alt="moon icon" />}
            uncheckedIcon={<img src={sunIcon} alt="sun icon" />}
          />
        </Nav>
      </Container>
    </Content>
  </SiteHeader>
)

export default Header
