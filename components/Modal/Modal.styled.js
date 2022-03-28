import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
  border-radius: 50%;
  background-color: gray;
  color: black;
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 10px;
  cursor: pointer;
  svg {
    stroke-width: 5;
  }
`;
