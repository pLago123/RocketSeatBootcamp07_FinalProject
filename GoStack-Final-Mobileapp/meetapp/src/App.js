import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const isSigned = useSelector(state => state.auth.signed);

  const Routes = createRouter(isSigned);

  return <Routes />;
}
