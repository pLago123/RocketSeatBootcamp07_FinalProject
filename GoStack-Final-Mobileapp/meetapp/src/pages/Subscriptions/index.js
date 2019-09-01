import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';

import { Meetups } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Loader from '~/components/Loader';

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadMeetups() {
    const response = await api.get('/subscriptions');

    setMeetups(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadMeetups();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`/subscriptions/${id}`);
      Alert.alert('Cancelado!', 'Melhor avisar do que dar bolo');
      loadMeetups();
    } catch (err) {
      const message = err.response.data.error;
      Alert.alert('Erro', message);
    }
  }

  return (
    <Background>
      <Header />
      {!loading && (
        <Meetups
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup data={item} handleCancel={() => handleCancel(item.id)} />
          )}
        />
      )}
      {loading && <Loader />}
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tag" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
