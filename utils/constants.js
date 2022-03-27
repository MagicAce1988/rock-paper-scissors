import Rock from './../public/rock.png';
import Paper from './../public/paper.png';
import Scissors from './../public/scissors.png';

export const githubLink = 'https://github.com/MagicAce1988';

export const gameChoices = [
  {
    id: 1,
    choice: 'rock',
    image: Rock,
    sound: './../public/rock.mp3',
    beats: ['scissors'],
  },
  {
    id: 2,
    choice: 'paper',
    image: Paper,
    sound: './../public/paper.mp3',
    beats: ['rock'],
  },
  {
    id: 3,
    choice: 'scissors',
    image: Scissors,
    sound: './../public/scissors.mp3',
    beats: ['paper'],
  },
];
