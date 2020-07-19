import { shallow } from 'enzyme';
import * as React from 'react';

import DrawerContent from './DrawerContent';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

it('matches snapshot', () => {
  const wrapper = shallow(
    <DrawerContent />,
  );

  expect(wrapper).toMatchSnapshot();
});
