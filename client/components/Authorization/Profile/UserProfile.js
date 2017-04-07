import React, { PropTypes } from 'react';
import { Container, Label } from 'semantic-ui-react';
import ProfileFormContainer from '../../../containers/Authorization/Profile/ProfileForm';
import ChangePasswordContainer from '../../../containers/Authorization/Profile/ChangePassword';
import { Translate } from 'react-i18nify';

const UserProfile = ({ user }) => (
  <div>
    <Container className="user-profile">
      <div className="user-profile">
        <h2 className="ui header">{user.username}</h2>
        {user.roles.map(role => <Label key={role} color="blue">{role}</Label>)}

        <h4 className="ui dividing header "><Translate value="profile" /></h4>
        <ProfileFormContainer />
        <h4 className="ui dividing header "><Translate value="change_password" /></h4>
        <ChangePasswordContainer />
      </div>
    </Container>
  </div>);

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;
