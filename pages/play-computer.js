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
import {
  BottomMessage,
  GameScoreContainer,
  Message,
  TopSection,
} from '../styles/play-computer.styled';

const PlayComputer = () => {
  // variables and state
  const router = useRouter();
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [yourChoice, setYourChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [currentResult, setCurrentResult] = useState('');
  const [imageSize, setImageSize] = useState(200);
  const [gameStarted, setGameStarted] = useState(false);
  const topMessages = {
    [wins > losses]: 'Doing Well',
    [losses > wins]: `Don't worry`,
    [losses === wins]: 'Keep Trying',
  };
  const message = gameStarted ? topMessages[true] : 'Start the Game';
  const bottomMessages =
    yourChoice && opponentChoice
      ? {
          draw: `You both have chosen ${yourChoice.choice}. No winner this time.`,
          win: `${yourChoice.choice} beats ${opponentChoice.choice}. You win!!`,
          loss: `${opponentChoice.choice} beats ${yourChoice.choice}. You lose :(`,
        }
      : {};

  // handlers and functions

  const playAgainHandler = () => {
    setYourChoice(null);
    setOpponentChoice(null);
    setCurrentResult('');
  };

  const choiceHandler = (id) => {
    const gameChoice = gameChoices.find((choice) => choice.id === id);
    setYourChoice(gameChoice);

    setTimeout(() => {
      setOpponentChoice(gameChoices[1]);
    }, 2000);
  };

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

  useEffect(() => {
    if (yourChoice && opponentChoice) {
      if (!gameStarted) setGameStarted(true);
      if (yourChoice.choice === opponentChoice.choice) {
        setCurrentResult('draw');
      } else if (yourChoice.beats.includes(opponentChoice.choice)) {
        setWins(wins + 1);
        setCurrentResult('win');
      } else {
        setLosses(losses + 1);
        setCurrentResult('loss');
      }
    }
  }, [yourChoice, opponentChoice, gameStarted]);

  return (
    <Container>
      <TopSection>
        <GameScoreContainer>
          <Link href="/">
            <a>
              <FontAwesomeIcon icon={faHome} width={40} />
            </a>
          </Link>
          <Message>{message}</Message>
          <div>
            <div>Wins: {wins}</div>
            <div>Losses: {losses}</div>
          </div>
        </GameScoreContainer>
        {!!yourChoice && !!opponentChoice && (
          <BottomMessage>{bottomMessages[currentResult]}</BottomMessage>
        )}
        {!opponentChoice && (
          <BottomMessage>
            {yourChoice ? 'Waiting for the opponent...' : 'Make your move...'}
          </BottomMessage>
        )}
      </TopSection>
      <ImagesContainer withWrap={true}>
        {gameChoices.map(({ id, image, choice }) => (
          <ImageContainer
            onClick={() => !yourChoice && choiceHandler(id)}
            key={id}
            imageSize={imageSize}
            withPointer={!yourChoice}
          >
            <BorderRadiusAdjustment>
              <Image src={image} alt={choice} priority />
            </BorderRadiusAdjustment>
          </ImageContainer>
        ))}
      </ImagesContainer>
      <button onClick={playAgainHandler}>Play Again</button>
      <Footer />
    </Container>
  );
};

export default PlayComputer;
