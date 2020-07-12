import { shallow } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import taskLists from '../../../services/gapi/__fixtures__/taskLists.json';

import TaskList from './TaskList';

it('matches snapshot', () => {
  const wrapper = shallow(
    <MemoryRouter
      initialEntries={[{ pathname: '/', key: 'permanent-test-key' }]}
    >
      <TaskList onDelete={() => undefined} taskLists={taskLists} />
    </MemoryRouter>,
  );

  expect(wrapper).toMatchSnapshot();
});
