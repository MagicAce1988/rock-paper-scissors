import { useRef } from 'react';
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
  Button,
} from './../styles/index.styled';
import { useEffect, useState } from 'react';
import Footer from './../components/Footer/Footer';
import {
  BottomMessage,
  GameScoreContainer,
  Losses,
  Message,
  ScoresContainer,
  TopSection,
  Wins,
} from '../styles/play-computer.styled';

const PlayComputer = () => {
  // variables and state
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [yourChoice, setYourChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [currentResult, setCurrentResult] = useState('');
  const [currentScaledCircle, setCurrentScaledCircle] = useState(0);
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

  const animateInterval = useRef();

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
      clearInterval(animateInterval.current);
      setCurrentScaledCircle(0);
      setOpponentChoice(
        gameChoices[Math.floor(Math.random() * gameChoices.length)]
      );
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

  const animateCircles = () => {
    animateInterval.current = setInterval(() => {
      setCurrentScaledCircle((current) =>
        current + 1 > gameChoices.length ? 1 : current + 1
      );
    }, 300);
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
    } else if (yourChoice) {
      animateCircles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yourChoice, opponentChoice]);

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
          <ScoresContainer>
            <Wins>Wins: {wins}</Wins>
            <Losses>Losses: {losses}</Losses>
          </ScoresContainer>
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
            scaled={id === currentScaledCircle}
            yourChoice={id === yourChoice?.id}
            opponentChoice={id === opponentChoice?.id}
            onClick={() => !yourChoice && choiceHandler(id)}
            key={id}
            imageSize={imageSize}
            withPointer={!yourChoice}
            withWrap={true}
          >
            <BorderRadiusAdjustment>
              <Image src={image} alt={choice} priority />
            </BorderRadiusAdjustment>
          </ImageContainer>
        ))}
      </ImagesContainer>
      <ParticleEffectButton
        canvasPadding={0}
        duration={400}
        color="#034a96"
        hidden={!yourChoice || !opponentChoice}
        style="fill"
      >
        <Button onClick={playAgainHandler}>Play Again</Button>
      </ParticleEffectButton>
      <Footer />
    </Container>
  );
};

export default PlayComputer;
