import Image from 'next/image';
import Link from 'next/link';
import ParticleEffectButton from 'react-particle-effect-button';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { GameScoreContainer, Message } from '../styles/play-computer.styled';

const PlayComputer = () => {
  // variables and state
  const router = useRouter();
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [presentScore, setPresentScore] = useState('draw');
  const [imageSize, setImageSize] = useState(200);
  const [gameStarted, setGameStarted] = useState(false);
  const topMessages = {
    [wins > losses]: 'Doing Well',
    [losses > wins]: `Don't worry`,
    [losses === wins]: 'Keep Trying',
  };
  const message = gameStarted ? topMessages[true] : 'Start the Game';

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
        <Link href="/">
          <a>
            <FontAwesomeIcon icon={faHome} width={40} />
          </a>
        </Link>
        <Message>{message}</Message>
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
