import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  height: 100%;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin: 0 5px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.6);
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(0, 0, 0, 0.2);
      margin: 10px 0 20px;
    }

    button {
      width: 162px;
      height: 42px;
      font-weight: bold;
      color: #fff;
      font-family: 'Roboto', Arial, Helvetica, sans-serif;
      font-size: 15px;
      background-color: #f94d6a;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${darken(0.08, '#f94d6a')};
      }

      span {
        margin-left: 10px;
        margin-bottom: 0;
        color: #fff;
      }
    }
  }
`;
