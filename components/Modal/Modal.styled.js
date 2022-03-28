import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledIcon = styled(FontAwesomeIcon)`
  border-radius: 50%;
  background-color: rgba(23, 23, 23, 0.2);
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 8px;
  cursor: pointer;
  svg {
    stroke-width: 5;
  }
  aspect-ratio: 1/1;
`;
