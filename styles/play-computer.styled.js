import styled from 'styled-components';

export const TopSection = styled.div`
  width: 75vw;
`;

export const Wins = styled.p`
  color: rgb(54, 255, 73);
  margin: 0;
`;

export const Losses = styled.p`
  color: rgb(255, 13, 85);
  margin: 0;
`;

export const GameScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 5px;
  padding: 0 20px;
  height: 70px;
  a {
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
`;

export const ScoresContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 10px;
`;

export const Message = styled.h1`
  color: #fff;
  font-family: 'Merriweather', serif;
  font-size: calc(12px + 1.2vw);
  text-align: center;
  text-transform: capitalize;
`;

export const BottomMessage = styled.p`
  color: #fff;
  font-size: 1em;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.5;
`;
