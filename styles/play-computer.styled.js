import styled from 'styled-components';

export const GameScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5vw;
  width: 75vw;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  a {
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
`;

export const Message = styled.h1`
  line-height: 20px;
  color: #fff;
  font-family: 'Merriweather', serif;
  font-size: calc(12px + 1.5vw);
  text-align: center;
  text-transform: capitalize;
`;
