import { shallow } from 'enzyme';
import * as React from 'react';

import task from '../../../../services/gapi/__fixtures__/task.json';

import Task from './Task';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

it('matches snapshot', () => {
  const wrapper = shallow(
    <Task task={task} taskListId="task-list-id" />,
  );

  expect(wrapper).toMatchSnapshot();
});
