import { shallow } from 'enzyme';
import * as React from 'react';

import Container from './Container';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

it('matches snapshot', () => {
  const wrapper = shallow(
    <Container />,
  );

  expect(wrapper).toMatchSnapshot();
});
