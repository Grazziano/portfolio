import styled from 'styled-components';

export const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  /* background: #101010; */
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div`
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
`;

export const Right = styled.div`
  > * {
    margin-bottom: 1.1rem;
    /* color: #fff; */
  }

  h4 {
    font-weight: 500;
    background: #ff4c60;
    display: inline-block;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 4px;
  }

  h1 {
    font-size: 2rem;
    font-weight: 800;
  }

  p {
    text-align: justify;
  }
`;

export const Button = styled.a`
  text-decoration: none;
  display: inline-block;
  padding: 10px 25px;
  border: 2px solid #ff4c60;
  border-radius: 5px;
  position: relative;
  z-index: 1;

  ::after {
    content: '';
    background: #ff4c60;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    z-index: 1;
    transition: width 0.5s ease;
  }

  :hover::after {
    width: 100%;
  }
`;
