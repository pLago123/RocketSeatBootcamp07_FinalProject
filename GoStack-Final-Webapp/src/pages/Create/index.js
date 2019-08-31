import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container } from './styles';

import api from '~/services/api';
import history from '~/services/history';
import BannerInput from '~/components/BannerInput';

export default function Create() {
  async function handleSubmit(data) {
    try {
      const response = await api.post('meetups', data);
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
      <Form schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="title" placeholder="Título do meetup" />
        <Input name="description" placeholder="Descrição completa" multiline />
        <Input name="date" type="date" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <FiPlusCircle size={20} />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}
