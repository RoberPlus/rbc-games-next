export const ENV = {
  SERVER_HOTS: 'http://localhost:1337',
  API_URL: 'http://localhost:1337/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: 'auth/local/register',
      LOGIN: 'auth/local',
    },
    USER_ME:"users/me"
  },
  TOKEN: 'token',
};

export const INPUTS = {
  REGISTER: {
    username: {
      label: 'Username',
      type: 'text',
      name: 'username',
      placeholder: 'gamer249',
    },
    names: {
      label: 'Name & Last Name',
      type: 'text',
      name: 'names',
      placeholder: 'Jonh Doe',
    },
    email: {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'email@email.com',
    },
    password: {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: '',
    },
  },
  LOGIN: {
    identifier: {
      label: 'Email',
      type: 'email',
      name: 'identifier',
      placeholder: 'email@email.com',
    },
    password: {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: '',
    },
  },
};
