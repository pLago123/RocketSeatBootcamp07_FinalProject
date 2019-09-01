import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Banner,
  Info,
  InfoItem,
  Title,
  Text,
  ActionButton,
} from './styles';

function formatDate(date) {
  const dateFormatted = format(parseISO(date), "d 'de' MMMM", { locale: pt });

  let dateArray = dateFormatted.split(' ');
  dateArray[2] = dateArray[2].replace(
    dateArray[2].charAt(0),
    dateArray[2].charAt(0).toUpperCase()
  );
  dateArray = dateArray.join(' ');

  return dateArray;
}

export default function Meetup({ data, handleSubscribe, handleCancel }) {
  return (
    <Container>
      <Banner
        source={{
          uri: data.File.url,
        }}
      />
      <Info>
        <Title>{data.title}</Title>
        <InfoItem>
          <Icon name="md-calendar" size={15} color="#888" />
          <Text>{formatDate(data.date)}</Text>
        </InfoItem>
        <InfoItem>
          <Icon name="md-pin" size={15} color="#888" />
          <Text>{data.location}</Text>
        </InfoItem>
        <InfoItem>
          <Icon name="md-person" size={15} color="#888" />
          <Text>{data.User.name}</Text>
        </InfoItem>
        {handleSubscribe && (
          <ActionButton onPress={handleSubscribe}>
            Realizar inscrição
          </ActionButton>
        )}
        {handleCancel && (
          <ActionButton onPress={handleCancel}>Cancelar inscrição</ActionButton>
        )}
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    File: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSubscribe: PropTypes.func,
  handleCancel: PropTypes.func,
};

Meetup.defaultProps = {
  handleSubscribe: null,
  handleCancel: null,
};
