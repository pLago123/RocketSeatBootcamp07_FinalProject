import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { FiPlusCircle } from 'react-icons/fi';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Container } from './styles';

import api from '~/services/api';
import history from '~/services/history';
import BannerInput from '~/components/BannerInput';

export default function Edit({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`/hosting/${id}`);

        setMeetup({
          ...response.data.meetup,
          banner: response.data.banner,
          date: format(parseISO(response.data.meetup.date), 'yyyy-MM-dd'),
          description: response.data.meetup.description,
        });

        setLoading(false);
      } catch (error) {
        toast.error('Não foi possível encontrar');
        history.push('/');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      const response = await api.put(`/meetups/${id}`, data);
      toast.success('Meetup criada com sucesso!');
      history.push(`/details/${response.data.id}`);
    } catch (err) {
      toast.error('Falha ao criar. Verifique seus dados ou tente mais tarde');
    }
  }

  const schema = Yup.object().shape({
    file_id: Yup.string().required('Campo Obrigatório'),
    title: Yup.string().required('Campo Obrigatório'),
    description: Yup.string().required('Campo Obrigatório'),
    date: Yup.string().required('Campo Obrigatório'),
    location: Yup.string().required('Campo Obrigatório'),
  });

  return (
    <Container>
      {loading && (
        <div className="loader">
          <Loader type="TailSpin" color="#333" width={32} height={32} />
        </div>
      )}
      {!loading && (
        <Form schema={schema} onSubmit={handleSubmit} initialData={meetup}>
          <BannerInput name="file_id" />
          <Input name="title" placeholder="Título do meetup" />
          <Input
            name="description"
            placeholder="Descrição completa"
            multiline
          />
          <Input name="date" type="date" />
          <Input name="location" placeholder="Localização" />
          <button type="submit">
            <FiPlusCircle size={20} />
            <span>Salvar meetup</span>
          </button>
        </Form>
      )}
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
