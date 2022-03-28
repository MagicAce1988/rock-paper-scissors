import Link from 'next/link';
import { gameChoices, githubLink } from '../../utils/constants';
import { FooterContainer } from './Footer.styled';

const Footer = () => {
  return (
    <FooterContainer>
      <p>{gameChoices.map((current) => current.choice).join(' · ')} Game</p>
      <Link href={githubLink}>
        <a>
          <p>Made with ♥ by Marian-Silviu Talmacel</p>
        </a>
      </Link>
    </FooterContainer>
  );
};

export default Footer;
