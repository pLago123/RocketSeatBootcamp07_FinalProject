import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { MdEdit, MdDeleteForever, MdLocationOn } from 'react-icons/md';
import { IoMdCalendar } from 'react-icons/io';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Meetup } from './styles';

export default function Details({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`/hosting/${id}`);

        // Format the date.
        const date = format(
          parseISO(response.data.meetup.date),
          "dd 'de' MMMM",
          {
            locale: pt,
          }
        );

        // Do what date-fns should have done. (Uppercase the month's name)
        let dateArray = date.split(' ');
        dateArray[2] = dateArray[2].replace(
          dateArray[2].charAt(0),
          dateArray[2].charAt(0).toUpperCase()
        );
        dateArray = dateArray.join(' ');

        setMeetup({
          ...response.data.meetup,
          banner: response.data.banner.url,
          formattedDate: dateArray,
        });

        setLoading(false);
      } catch (error) {
        toast.error('Não foi possível encontrar');
        history.push('/');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleCancel() {
    try {
      await api.delete(`meetups/${id}`);
      toast.success('Meetup cancelado com sucesso!');
      history.push('/dashboard');
    } catch (err) {
      toast.error('Houve um problema ao cancelar, tente novamente mais tarde');
    }
  }

  return (
    <Container>
      {loading && (
        <div className="loader">
          <Loader type="TailSpin" color="#333" width={32} height={32} />
        </div>
      )}
      {!loading && (
        <Meetup>
          <header>
            <h1>{meetup.title}</h1>
            <nav>
              <Link to={`/edit/${meetup.id}`}>
                <MdEdit size={16} />
                Editar
              </Link>
              <button type="button" onClick={handleCancel}>
                <MdDeleteForever size={16} />
                Cancelar
              </button>
            </nav>
          </header>
          <main>
            <img src={meetup.banner} alt="" />
            <p>{meetup.description}</p>
            <div className="info">
              <span>
                <IoMdCalendar size={20} />
                {meetup.formattedDate}
              </span>
              <span>
                <MdLocationOn size={20} />
                {meetup.location}
              </span>
            </div>
          </main>
        </Meetup>
      )}
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
