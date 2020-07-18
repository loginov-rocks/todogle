import { shallow } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import TaskList from './TaskList';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

it('matches snapshot', () => {
  const wrapper = shallow(
    <MemoryRouter
      initialEntries={[{ pathname: '/', key: 'permanent-test-key' }]}
    >
      <TaskList />
    </MemoryRouter>,
  );

  expect(wrapper).toMatchSnapshot();
});
