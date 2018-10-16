import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoBanner from '../components/VideoBanner/VideoBanner';

configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('<VideoBanner />', () => {
  it('exists', () => {
    const wrapper = shallow(<VideoBanner />);
    expect(wrapper).to.have.length(1);
  });
});
