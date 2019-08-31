import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile, Exit } from './styles';
import Logo from '~/assets/logo.svg';
import Notifications from '~/components/Notifications';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  // Read the profile picture if there is one.
  const profilePic = profile.avatar ? profile.avatar.url : null;
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={Logo} alt="Meetapp logo" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profilePic ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="User Profile"
            />
          </Profile>
          <Exit onClick={handleSignOut}>Sair</Exit>
        </aside>
      </Content>
    </Container>
  );
}
