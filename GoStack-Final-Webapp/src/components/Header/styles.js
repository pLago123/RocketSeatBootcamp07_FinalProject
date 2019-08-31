import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background-color: #fff;
  padding: 0 30px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      height: 40px;
    }

    a {
      font-weight: bold;
      color: #7159c1;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin: 0 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
`;

export const Exit = styled.button`
  width: 71px;
  height: 42px;
  font-weight: bold;
  color: #fff;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  background-color: #f94d6a;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background-color: ${darken(0.08, '#f94d6a')};
  }
`;
