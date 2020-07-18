import { shallow } from 'enzyme';
import * as React from 'react';

import CreateTask from './CreateTask';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreateTask taskListId="task-list-id" />,
  );

  expect(wrapper).toMatchSnapshot();
});
