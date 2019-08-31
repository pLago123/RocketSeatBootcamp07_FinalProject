import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FiPlusCircle } from 'react-icons/fi';
import { MdChevronRight } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import api from '~/services/api';

import { Container, Item, Navigation } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('hosting');

      const data = response.data.map(meetup => {
        // Format the date.
        const date = format(parseISO(meetup.date), "dd 'de' MMMM", {
          locale: pt,
        });

        // Do what date-fns should have done. (Uppercase the month's name)
        let dateArray = date.split(' ');
        dateArray[2] = dateArray[2].replace(
          dateArray[2].charAt(0),
          dateArray[2].charAt(0).toUpperCase()
        );
        dateArray = dateArray.join(' ');

        return {
          ...meetup,
          formattedDate: dateArray,
        };
      });

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/create">
          <FiPlusCircle />
          Novo meetup
        </Link>
      </header>

      <ul>
        {loading && (
          <div className="loader">
            <Loader type="TailSpin" color="#333" width={32} height={32} />
          </div>
        )}
        {!loading && !meetups.length && (
          <div className="empty">Você não tem meetups ainda.</div>
        )}
        {!loading &&
          meetups.map(meetup => (
            <Item key={meetup.id}>
              <strong>{meetup.title}</strong>
              <Navigation>
                <span>{meetup.formattedDate}</span>
                <Link to={`/details/${meetup.id}`}>
                  <MdChevronRight />
                </Link>
              </Navigation>
            </Item>
          ))}
      </ul>
    </Container>
  );
}
