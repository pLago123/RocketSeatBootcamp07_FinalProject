import React, { useState, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import { pt } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Arrow from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Nav, Text, Button, Meetups } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Loader from '~/components/Loader';

function formatDate(date) {
  const dateFormatted = format(date, "d 'de' MMMM", { locale: pt });

  let dateArray = dateFormatted.split(' ');
  dateArray[2] = dateArray[2].replace(
    dateArray[2].charAt(0),
    dateArray[2].charAt(0).toUpperCase()
  );
  dateArray = dateArray.join(' ');

  return dateArray;
}

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const dateFormatted = useMemo(() => formatDate(date), [date]);

  async function loadMeetups() {
    if (done) return;

    const inputDate = format(date, 'yyyy-MM-dd');
    const response = await api.get(`/meetups?date=${inputDate}&page=${page}`);

    if (!response.data.length) {
      setLoading(false);
      setDone(true);
      return;
    }

    setMeetups([...meetups, ...response.data]);
    setLoading(false);
  }

  function handlePrevDate() {
    setDate(subDays(date, 1));
    setMeetups([]);
    setDone(false);
    setPage(1);
  }

  function handleNextDate() {
    setDate(addDays(date, 1));
    setMeetups([]);
    setDone(false);
    setPage(1);
  }

  function handleLoadMore() {
    if (done) return;

    setPage(page + 1);
  }

  useEffect(() => {
    if (!done) {
      setLoading(true);
      loadMeetups();
    }
  }, [date, page]);

  async function handleSubscribe(id) {
    try {
      await api.post(`/meetups/${id}/subscriptions`);
      Alert.alert('Pronto!', 'As pessoas vão estar te esperando!');
    } catch (err) {
      const message = err.response.data.error;
      Alert.alert('Erro', message);
    }
  }

  return (
    <Background>
      <Header />
      <Nav>
        <Button onPress={handlePrevDate}>
          <Arrow name="chevron-left" size={30} color="white" />
        </Button>
        <Text>{dateFormatted}</Text>
        <Button onPress={handleNextDate}>
          <Arrow name="chevron-right" size={30} color="white" />
        </Button>
      </Nav>
      {(!loading || !done) && (
        <Meetups
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item}
              handleSubscribe={() => handleSubscribe(item.id)}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
      {loading && <Loader />}
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list-ul" size={20} color={tintColor} />
  ),
};
