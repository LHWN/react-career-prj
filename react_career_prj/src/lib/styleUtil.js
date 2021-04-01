import { css, keyframes } from 'styled-components';

export const sizes = {
  wide: '1200px',
  desktop: '992px',
  tablet: '768px',
  phone: '376px'
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const transitions = {
  shake: keyframes`
        0% {
            transform: translate(-30px);
        }
        25% {
            transform: translate(15px);
        }
        50% {
            transform: translate(-10px);
        }
        75% {
            transform: translate(5px);
        }
        100% {
            transform: translate(0px);
        }
    `
};
