import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 5%;
  padding-top: 0;
  justify-content: space-between;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const GameTitle = styled.h1`
  color: #fff;
  font-family: 'Merriweather', serif;
  font-size: calc(12px + 3vw);
  text-align: center;
  text-transform: capitalize;
`;

export const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: ${({ withWrap }) => (withWrap ? 'wrap' : 'no-wrap')};
  justify-content: center;
`;

export const ImageContainer = styled.div`
  width: ${({ imageSize }) => `${imageSize}px`};
  cursor: ${({ withPointer }) => (withPointer ? 'pointer' : 'default')};
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border: 1vw solid rgba(43, 87, 99, 0.88);
  margin: 1vw 2vw;
  opacity: 0.85;
  user-select: none;
  min-width: 120px;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

export const BorderRadiusAdjustment = styled.div`
  width: 70%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: #c4c2fc;
  color: #000;
  font-size: 1.2rem;
  border: 0;
  padding: 1.1rem 3rem;
  border-radius: 5;
  cursor: pointer;
  margin: 1vh 1vw;
  min-width: 225px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.05);
  }
`;
