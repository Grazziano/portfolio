import styled from 'styled-components';

export const Section = styled.section`
  width: 100vw;
  height: 100vh;
  background: #353353;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

export const DivBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50%;
  max-width: 540px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const Div = styled.div``;

export const Image = styled.img`
  border-style: none;
  vertical-align: middle;
  width: 250px;

  @media (max-width: 1366px) {
    width: 100px;
  }
`;

export const Button = styled.button`
  align-items: center;
  background-color: #ff4c60;
  border-radius: 30px;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  line-height: 1;
  padding: 12px 32px;

  @media (max-width: 1366px) {
    font-size: 12px;
    margin-bottom: 50px;
  }

  @media (max-width: 1024px) {
    font-size: 12px;
    margin-bottom: 80px;
  }
`;

export const H1 = styled.h1`
  color: #fff;
  font-family: 'Rubik', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 43.2px;
  margin: 20px 0;
  text-decoration: none solid rgb(255, 255, 255);
  text-align: center;

  @media (max-width: 1366px) {
    font-size: 25px;
  }

  @media (max-width: 1024px) {
    font-size: 25px;
  }
`;

export const Label = styled.label`
  color: #fff;
  font-family: 'Rubik', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 43.2px;
  margin: 20px 0;
  text-decoration: none solid rgb(255, 255, 255);
  text-align: center;
`;

export const Ul = styled.ul`
  margin: 0 25px 15px 0;

  li {
    color: #fff;
    cursor: pointer;
    display: inline-block;
    margin-right: 5px;
  }
`;

export const DivScrollDown = styled.div`
  align-items: center;
  color: #fff;
  bottom: 40px;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1;

  @media (max-width: 1366px) {
    font-size: 10px;
  }
`;
