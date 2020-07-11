import { shallow } from 'enzyme';
import * as React from 'react';

import CreateTaskList from './CreateTaskList';

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreateTaskList onCreate={() => undefined} />,
  );

  expect(wrapper).toMatchSnapshot();
});
