import styled from 'styled-components';

export const Container = styled.div`
  align-self: stretch;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 940px;
    height: 300px;
    background: #aaa;
    border-radius: 4px;
    position: relative;

    .camera-icon {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      opacity: 0.6;

      strong {
        font-size: 16px;
      }
    }

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 100%;
      border-radius: 4px;
    }

    input {
      display: none;
    }
  }
`;
