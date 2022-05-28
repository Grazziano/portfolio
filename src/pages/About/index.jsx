import React from 'react';
import { Section, Container, Grid, Left, Right, Button } from './style';
import profileImage from '../../images/profile.png';

export default function About() {
  return (
    <Section>
      <Container>
        <Grid>
          <Left>
            <img src={profileImage} alt="" />
          </Left>
          <Right>
            <h4>Hey There!</h4>
            <h1>I'm Bolby Doe</h1>
            <h3>Web Developer</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              debitis natus! Sapiente alias earum culpa velit voluptas
              consequatur explicabo, molestias voluptatem dolor. Magni obcaecati
              sint illo, cum dolorum iste sunt.
            </p>
            <Button href="#" className="btn">
              Hire Me
            </Button>
          </Right>
        </Grid>
      </Container>
    </Section>
  );
}
