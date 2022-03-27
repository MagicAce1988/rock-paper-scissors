import Head from 'next/head';
import '../styles/globals.css';
import { gameChoices } from '../utils/constants';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          {gameChoices.map((current) => current.choice).join(' · ')}
        </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
