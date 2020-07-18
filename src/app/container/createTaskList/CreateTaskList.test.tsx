import { shallow } from 'enzyme';
import * as React from 'react';

import CreateTaskList from './CreateTaskList';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreateTaskList />,
  );

  expect(wrapper).toMatchSnapshot();
});
