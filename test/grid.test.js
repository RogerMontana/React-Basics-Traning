/**
 * Created by artem on 10/5/16.
 */
import React from "react";

import { mount, shallow } from "enzyme";

import {expect} from "chai";

import Grid from "../components/grid";

describe("<TestComponent/>", function () {

    it("should have the span element", function () {

        const wrapper = mount(<Grid/>);

    });

});