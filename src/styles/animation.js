import { keyframes } from 'styled-components';

export const MotionBlur = keyframes`
  50% {
    filter: brightness(1.5);
    opacity: .75;
  }
`;

export const OpacityFade = keyframes`
  50% {
    opacity: .75;
  }
`;
