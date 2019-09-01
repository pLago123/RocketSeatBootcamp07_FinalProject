import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function Loader() {
  return (
    <Container>
      <ActivityIndicator color="#fff" />
    </Container>
  );
}
