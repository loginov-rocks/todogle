import { shallow } from 'enzyme';
import * as React from 'react';

import Task from './Task';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Task />,
  );

  expect(wrapper).toMatchSnapshot();
});
