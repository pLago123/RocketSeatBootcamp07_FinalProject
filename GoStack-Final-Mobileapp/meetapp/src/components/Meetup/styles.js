import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
`;

export const Banner = styled.Image`
  height: 160px;
`;

export const Info = styled.View`
  margin: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Text = styled.Text`
  font-size: 14px;
  margin-left: 6px;
  color: #888;
`;

export const ActionButton = styled(Button)`
  margin-top: 10px;
  background-color: #f94d6a;
`;
