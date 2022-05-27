import styled from 'styled-components';

export const Header = styled.header`
  align-items: start;
  background-color: #f9f9ff;
  box-sizing: border-box;
  color: #f9f9ff;
  display: flex;
  flex-direction: column;
  font-family: Rubik, sans-serif;
  font-size: 16px;
  height: 40rem;
  line-height: 1.7rem;
  min-height: 40rem;
  padding: 3rem 2.5rem 2.5rem;
  position: fixed;
  right: 45rem;
  text-align: left;
  text-decoration: none solid rgb(255,255,255);
  width: 18rem;
  word-spacing: 0;
  z-index: 1;
`;

export const BoxLogo = styled.div`
  cursor: pointer;
  display: inline;
  max-height: 30px;
`;

export const ImgLogo = styled.img`
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  border-style: none;
`;

export const Nav = styled.nav`
  box-sizing: border-box;
  display: block;
  height: 35.2rem;
  width: 10rem;
`;

export const Menu = styled.ul`
  list-style: none;
  margin-bottom: 130px;
  margin-top: 130px;
  padding: 0;
`;

export const Li = styled.li`
  bottom: 0;
  box-sizing: border-box;
  display: list-item;
  height: 43.1875px;
  left: 0;
  line-height: 1.7;
  list-style-position: outside;
  list-style-type: node;
  padding: 8px 0 8px 0;
  position: relative;
  right: 0;
  top: 0;
  width: 125.859;
`;

export const Active = styled.a`
  box-sizing: border-box;
  color: #353353;
  cursor: pointer;
  display: inline;
  font-weight: 700;
  position: relative;
  text-align: left;
  text-decoration: none solid rgb(254, 76,96);
  transition: all 0.3s ease-in-out 0;
  &:hover {
    color: #fe4c60;
  }
`;

export const Icon = styled.i`
  color: #fe4c60;
  margin-right: 20px;
`;

export const Footer = styled.footer`
  box-sizing: border-box;
  display: block;
  margin-top: auto;
`;

export const Copyright = styled.span`
  color: #9c9ab3;
  font-size: 14px;
`;