import { shallow } from 'enzyme';
import * as React from 'react';

import taskLists from '../../../services/gapi/__fixtures__/taskLists.json';

import TaskLists from './TaskLists';

it('matches snapshot', () => {
  const wrapper = shallow(
    <TaskLists areLoaded onClick={() => undefined} taskLists={taskLists} />,
  );

  expect(wrapper).toMatchSnapshot();
});
