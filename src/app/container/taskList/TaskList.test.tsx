import { shallow } from 'enzyme';
import * as React from 'react';

import taskList from '../../../services/gapi/__fixtures__/taskList.json';

import TaskList from './TaskList';

it('matches snapshot', () => {
  const wrapper = shallow(
    <TaskList onDelete={() => undefined} taskList={taskList} />,
  );

  expect(wrapper).toMatchSnapshot();
});
