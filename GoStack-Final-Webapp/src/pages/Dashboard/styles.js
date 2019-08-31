import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;
  padding: 0 5px;
  height: 100%;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    h1 {
      color: #333;
    }

    a {
      width: 162px;
      height: 42px;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      background-color: #f94d6a;
      border-radius: 4px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${darken(0.08, '#f94d6a')};
      }

      svg {
        margin-right: 6px;
      }
    }
  }

  ul {
    text-align: center;
  }
`;

export const Item = styled.li`
  list-style: none;
  height: 62px;
  width: 100%;
  color: #333;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-left: 30px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    text-decoration: none;
    color: #333;
  }
`;
