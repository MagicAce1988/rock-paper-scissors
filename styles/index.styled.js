import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
`;

export const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  width: ${({ imageSize }) => `${imageSize}px`};
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border: 1vw solid rgba(43, 87, 99, 0.88);
  margin-left: 1vw;
  margin-right: 1vw;
  opacity: 0.85;
  user-select: none;
`;

export const BorderRadiusAdjustment = styled.div`
  width: 70%;
`;
