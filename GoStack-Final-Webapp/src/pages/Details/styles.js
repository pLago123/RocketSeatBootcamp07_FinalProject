import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  height: 100%;
  margin: 50px auto;
  padding: 0 5px;

  .loader {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Meetup = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    h1 {
      color: #333;
    }

    nav {
      display: flex;

      & > * {
        height: 42px;
        width: 116px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        transition: background 0.2s;

        svg {
          margin-right: 8px;
        }
      }

      button {
        margin-left: 15px;
        background-color: #f94d6a;

        &:hover {
          background-color: ${darken(0.08, '#f94d6a')};
        }
      }

      a {
        background-color: #4dbaf9;

        &:hover {
          background-color: ${darken(0.08, '#4dbaf9')};
        }
      }
    }
  }

  main {
    font-size: 16px;

    img {
      width: 100%;
      max-height: 300px;
      border-radius: 5px;
    }

    p {
      margin-top: 30px;
    }

    div.info {
      margin-top: 30px;
      display: flex;

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-right: 6px;
        }

        & + span {
          margin-left: 25px;
        }
      }
    }
  }
`;
