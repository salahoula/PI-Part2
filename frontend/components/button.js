import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? '#0070f3' : '#eaeaea')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ children, onClick, primary }) => {
  return <StyledButton onClick={onClick} primary={primary}>{children}</StyledButton>;
};

export default Button;
