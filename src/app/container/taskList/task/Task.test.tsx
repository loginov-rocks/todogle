import { shallow } from 'enzyme';
import * as React from 'react';

import task from '../../../../services/gapi/__fixtures__/task.json';
import taskList from '../../../../services/gapi/__fixtures__/taskList.json';

import Task from './Task';

it('matches snapshot', () => {
  const wrapper = shallow(
    <Task onDelete={() => undefined} task={task} taskList={taskList} />,
  );

  expect(wrapper).toMatchSnapshot();
});
