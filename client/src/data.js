// eslint-disable-next-line import/no-anonymous-default-export
export default {
  users: [
    {
      id: 1,
      first_name: 'Jhon',
      last_name: 'Doe',
      email: 'jhon@doe.com',
      gender: 'Male',
      password: '123456',
      role: 'ADMIN',
    },
    {
      id: 2,
      first_name: 'Conni',
      last_name: 'Fresson',
      email: 'cfresson1@jiathis.com',
      gender: 'Non-binary',
      password: '123456',
      role: 'USER',
    },
    {
      id: 3,
      first_name: 'Sanderson',
      last_name: 'Ridgeway',
      email: 'sridgeway2@rakuten.co.jp',
      gender: 'Genderfluid',
      password: '123456',
      role: 'USER',
    },
    {
      id: 4,
      first_name: 'Flem',
      last_name: 'Thoresby',
      email: 'fthoresby3@irs.gov',
      gender: 'Polygender',
      password: '123456',
      role: 'USER',
    },
    {
      id: 5,
      first_name: 'Dede',
      last_name: 'Collin',
      email: 'dcollin4@hao123.com',
      gender: 'Genderfluid',
      password: '123456',
      role: 'USER',
    },
  ],
  todos: [
    {
      id: 1,
      user: 1,
      name: "Read alice's adventures in wonderland",
    },
    {
      id: 2,
      user: 1,
      name: 'Study english for one hour',
    },
    {
      id: 3,
      user: 1,
      name: 'Go to bed before 11PM',
    },
    {
      id: 3,
      user: 5,
      name: 'Make coffe at 2PM to keep me awake',
    },
  ],
};
