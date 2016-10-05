/**
 * Created by artem on 10/5/16.
 */
import React from 'react';

import { mount, shallow } from 'enzyme';

import {expect} from "chai";

const wrapper = mount(<TestComponent text="Hello World"/>);

expect(wrapper.props().text).to.equal("Hello World");


export class TestComponent extends React.Component {

    render(){

        return <div><span>Test Component</span></div>

    }

}

describe("<TestComponent/>", function () {

    it("should have the span element", function () {

        const wrapper = shallow(<TestComponent text="dsfsdf"/>);

        expect(wrapper.find("span")).to.have.length(1);

    });

});