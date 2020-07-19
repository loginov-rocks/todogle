import { shallow } from 'enzyme';
import * as React from 'react';

import TaskLists from './TaskLists';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => []),
}));

it('matches snapshot', () => {
  const wrapper = shallow(
    <TaskLists />,
  );

  expect(wrapper).toMatchSnapshot();
});
