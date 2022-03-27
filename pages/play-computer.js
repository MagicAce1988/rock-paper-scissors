import Image from 'next/image';
import ParticleEffectButton from 'react-particle-effect-button';
import { gameChoices } from './../utils/constants';
import { getWindowDimensions } from './../utils/helpers';
import {
  Container,
  BorderRadiusAdjustment,
  ImagesContainer,
  ImageContainer,
} from './../styles/index.styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from './../components/Footer/Footer';
import { GameScoreContainer } from '../styles/play-computer.styled';

const PlayComputer = () => {
  // variables and state
  const router = useRouter();
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [presentScore, setPresentScore] = useState('draw');
  const [imageSize, setImageSize] = useState(200);

  // handlers and functions
  const updateSize = () => {
    const { width, height } = getWindowDimensions();
    const size = Math.min(
      (width * 80) / 100 / gameChoices.length,
      (height * 80) / 100 / gameChoices.length,
      200
    );
    setImageSize(size);
  };

  // effects
  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Container>
      <GameScoreContainer>
        <p>HomeIcon</p>
        <div>
          <div>Wins: ${wins}</div>
          <div>Losses: ${losses}</div>
        </div>
      </GameScoreContainer>
      <ImagesContainer withWrap={true}>
        {gameChoices.map(({ id, image, choice }) => (
          <ImageContainer key={id} imageSize={imageSize} withPointer={true}>
            <BorderRadiusAdjustment>
              <Image src={image} alt={choice} priority />
            </BorderRadiusAdjustment>
          </ImageContainer>
        ))}
      </ImagesContainer>
      <Footer />
    </Container>
  );
};

export default PlayComputer;
