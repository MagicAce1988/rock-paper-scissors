import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ParticleEffectButton from 'react-particle-effect-button';
import { gameChoices } from './../utils/constants';
import { getWindowDimensions } from './../utils/helpers';
import {
  Container,
  BorderRadiusAdjustment,
  ImagesContainer,
  ImageContainer,
  GameTitle,
  TopSection,
  ButtonsContainer,
  Button,
} from './../styles/index.styled';
import RulesModal from './../components/RulesModal/RulesModal';
import Footer from './../components/Footer/Footer';

const Home = () => {
  // variables and state
  const router = useRouter();
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [imageSize, setImageSize] = useState(200);
  const [buttons, setButtons] = useState([
    {
      text: 'Play Computer',
      hidden: false,
      action: () => router.push('./play-computer'),
    },
    {
      text: 'Rules',
      hidden: false,
      action: () => {
        setRulesModalOpen(true);
        setButtons((currentButtons) =>
          currentButtons.map((button) =>
            button.text === 'Rules' ? { ...button, hidden: false } : button
          )
        );
      },
    },
  ]);
  const gameName = gameChoices.map((current) => current.choice).join(' · ');

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

  const buttonHandler = (buttonIndex) => {
    setButtons((buttons) =>
      buttons.map((button, index) =>
        index === buttonIndex ? { ...button, hidden: true } : button
      )
    );
  };

  // effects
  useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <RulesModal
        isOpen={rulesModalOpen}
        offSwitch={() => setRulesModalOpen(false)}
      />

      <Container>
        <TopSection>
          <GameTitle>{gameName}</GameTitle>
          <ImagesContainer>
            {gameChoices.map(({ id, image, choice }) => (
              <ImageContainer key={id} imageSize={imageSize}>
                <BorderRadiusAdjustment>
                  <Image src={image} alt={choice} priority />
                </BorderRadiusAdjustment>
              </ImageContainer>
            ))}
          </ImagesContainer>
        </TopSection>

        <ButtonsContainer>
          {buttons.map((button, index) => (
            <ParticleEffectButton
              key={button.text}
              canvasPadding={0}
              duration={400}
              color="#034a96"
              hidden={button.hidden}
              style="fill"
              onComplete={button.action}
            >
              <Button onClick={() => buttonHandler(index)}>
                {button.text}
              </Button>
            </ParticleEffectButton>
          ))}
        </ButtonsContainer>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
