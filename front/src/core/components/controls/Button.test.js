import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Button from "./Button";

configure({ adapter: new Adapter() });

describe("<Button />", () => {
	it("Should render a button", () => {
		const wrapper = shallow(<Button text="Test" />);
		expect(wrapper.find(<button>text</button>));
	});

	it("Should render a link", () => {
		const wrapper = shallow(<Button text="Test" to="/" />);
		expect(wrapper.find(<a href="/">text</a>));
	});
});
