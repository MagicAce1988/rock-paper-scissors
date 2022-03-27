import Image from 'next/image';
import { gameChoices } from './../utils/constants';
import { getWindowDimensions } from './../utils/helpers';
import {
  Container,
  BorderRadiusAdjustment,
  ImagesContainer,
  ImageContainer,
} from './../styles/index.styled';
import { useEffect, useState } from 'react';

const Home = () => {
  const [imageSize, setImageSize] = useState(250);

  useEffect(() => {
    const { width } = getWindowDimensions();
    const size = Math.min((width * 80) / 100 / gameChoices.length, 250);
    setImageSize(size);
  }, []);

  return (
    <Container>
      <ImagesContainer>
        {gameChoices.map(({ id, image, choice }) => (
          <ImageContainer key={id} imageSize={imageSize}>
            <BorderRadiusAdjustment>
              <Image src={image} alt={choice} priority />
            </BorderRadiusAdjustment>
          </ImageContainer>
        ))}
      </ImagesContainer>
    </Container>
  );
};

export default Home;
