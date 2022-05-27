import React from 'react';
import Typical from 'react-typical';
import profileImg from '../../images/profile.png';
import {
  Button,
  DivBox,
  DivScrollDown,
  H1,
  Label,
  Image,
  Ul,
  Section,
} from './style';
import {
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  TwitterLogo,
} from 'phosphor-react';

export default function Home() {
  return (
    <Section>
      <DivBox>
        <Image src={profileImg} />
        <H1>Bolby Doe</H1>
        <Label>
          <Typical
            loop={Infinity}
            steps={['Front-End Dev', 2000, 'Back-End Dev', 2000]}
          />
        </Label>

        <Ul>
          <li>
            <LinkedinLogo size={32} />
          </li>
          <li>
            <GithubLogo size={32} />
          </li>
          <li>
            <InstagramLogo size={32} />
          </li>
          <li>
            <TwitterLogo size={32} />
          </li>
        </Ul>

        <Button>
          <span>
            <DownloadSimple size={32} />
          </span>
          <span>Get Resume</span>
        </Button>

        <DivScrollDown>
          <span>Scroll Down</span>
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_Rq8jJk.json"
            background="transparent"
            speed="1"
            style={{ width: '50px' }}
            loop
            autoplay
          ></lottie-player>
        </DivScrollDown>
      </DivBox>
    </Section>
  );
}
