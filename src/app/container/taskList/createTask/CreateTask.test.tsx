import { shallow } from 'enzyme';
import * as React from 'react';

import CreateTask from './CreateTask';

it('matches snapshot', () => {
  const wrapper = shallow(
    <CreateTask onCreate={() => undefined} taskListId="task-list-id" />,
  );

  expect(wrapper).toMatchSnapshot();
});
