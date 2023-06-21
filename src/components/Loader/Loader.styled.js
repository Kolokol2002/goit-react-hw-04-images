import styled from 'styled-components';

export const LoaderContaner = styled.div`
  --dim: 3rem;
  width: var(--dim);
  height: var(--dim);
  position: relative;
  animation: spin988 2s linear infinite;
  margin: 20px auto;

  div {
    --color: #333;
    --dim: 1.2rem;
    width: var(--dim);
    height: var(--dim);
    background-color: var(--color);
    border-radius: 50%;
    position: absolute;
  }

  div:nth-child(1) {
    top: 0;
    left: 0;
  }

  div:nth-child(2) {
    top: 0;
    right: 0;
  }

  div:nth-child(3) {
    bottom: 0;
    left: 0;
  }

  div:nth-child(4) {
    bottom: 0;
    right: 0;
  }

  @keyframes spin988 {
    0% {
      transform: scale(1) rotate(0);
    }

    20%,
    25% {
      transform: scale(1.3) rotate(90deg);
    }

    45%,
    50% {
      transform: scale(1) rotate(180deg);
    }

    70%,
    75% {
      transform: scale(1.3) rotate(270deg);
    }

    95%,
    100% {
      transform: scale(1) rotate(360deg);
    }
  }
`;