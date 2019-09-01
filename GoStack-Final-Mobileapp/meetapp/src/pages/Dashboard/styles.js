import styled from 'styled-components/native';

export const Nav = styled.View`
  height: 50px;
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 20;
  margin: 0 20px;
`;

export const Button = styled.TouchableOpacity``;

export const Meetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;
