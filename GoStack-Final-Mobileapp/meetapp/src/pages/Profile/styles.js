import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogOutButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
  background-color: #f94d6a;
`;

export const Line = styled.View`
  height: 3px;
  border-radius: 2px;
  background-color: rgba(155, 155, 155, 0.3);
  margin: 10px 0 20px 0;
`;
