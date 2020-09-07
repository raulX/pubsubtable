import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Input from "./Input";

configure({ adapter: new Adapter() });

describe("<Button />", () => {
	it("Should render an input", () => {
		const wrapper = shallow(<Input text="Test" />);
		expect(wrapper.find(<input />));
	});
});
