import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Precisamos algunas cositas para testar
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe(<BurgerBuilder />, () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallow( <BurgerBuilder onInitIngredients={() => {}} /> );
    });

    it('Should render BuildControls when receiving ingredients', () => {
        wrapper.setProps({ ings: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

});