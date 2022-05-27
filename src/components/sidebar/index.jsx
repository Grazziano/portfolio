import React from 'react';
import logo from '../../assets/bolb.svg';
import { House, User, Code, Desktop, ChatsCircle } from 'phosphor-react';
import { Active, BoxLogo, Copyright, Footer, Header, Icon, ImgLogo, Li, Menu, Nav } from './style';

export default function Sidebar() {
  return (
    <Header>
      <BoxLogo>
        <Active href='/'>
          <ImgLogo src={logo} alt='logo'></ImgLogo>
        </Active>
      </BoxLogo>
      <Nav>
        <Menu>
          <Li >
            <Active href='/'>
              <Icon class='icon-home'>
                <House />
              </Icon>
                Home
            </Active>
          </Li>
          <Li>
            <Active href='/about'>
              <Icon class='icon-user'>
                <User />
              </Icon>
                About
            </Active>
          </Li>
          <Li>
            <Active href='/tecnologies'>
              <Icon class='icon-code'>
                <Code />
              </Icon>
                Tecnologies
            </Active>
          </Li>
          <Li>
            <Active href='/projects'>
              <Icon class='icon-desktop'>
                <Desktop />
              </Icon>
                Projects
            </Active>
          </Li>
          <Li>
            <Active href='/contact'>
              <Icon class='icon-chat-circle'>
                <ChatsCircle />
              </Icon>
                Contact
            </Active>
          </Li>
        </Menu>
      </Nav>
      <Footer>
        <Copyright>
          Feito com ♥ © 2022 AGRS
        </Copyright>
      </Footer>
    </Header>
  )
}
