import Link from 'next/link';
import { gameChoices } from '../utils/constants';
import { FooterContainer } from './Footer.styled';

const Footer = () => {
  return (
    <FooterContainer>
      <p>{gameChoices.map((current) => current.choice).join(' · ')} Game</p>
      <Link href="https://github.com/MagicAce1988">
        <a>
          <p> ©2022 - Marian-Silviu Talmacel</p>
        </a>
      </Link>
    </FooterContainer>
  );
};

export default Footer;
