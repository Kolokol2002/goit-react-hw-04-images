import styled from 'styled-components';

export const ButtonLoad = styled.button`
  display: block;
  margin: 20px auto;
  padding: 0.8em 1.8em;
  border: 2px solid #17c3b2;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.3s;
  z-index: 1;
  font-family: inherit;
  color: #17c3b2;
  cursor: pointer;

  ::before {
    content: '';
    width: 0;
    height: 300%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #17c3b2;
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }

  :hover::before {
    width: 105%;
  }

  :hover {
    color: #111;
  }
`;
