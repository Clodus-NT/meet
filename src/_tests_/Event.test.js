import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe("<Event /> component", () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test("Event componet is rendered", () => {
    expect(EventWrapper).toHaveLength(1);
  });

  test("Event wrapping div is rendered", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  test("Event wrapping div just shows event__Overview", () => {
    expect(EventWrapper.find(".event").children()).toHaveLength(1);
  });

  test("Event__Overview is rendered", () => {
    expect(EventWrapper.find(".event__Overview")).toHaveLength(1);
  });

  test("Event__Overview children are rendered", () => {
    expect(EventWrapper.find(".event__Overview").children()).toHaveLength(4);
  });

  test("Event__Details children are rendered", () => {
    EventWrapper.setState({
      showDetails: true,
    });
    expect(EventWrapper.find(".event__Details--description")).toHaveLength(1);
  });

  test("Show/hide details button is rendered", () => {
    expect(EventWrapper.find(".event__Overview button")).toHaveLength(1);
  });

  test("click on button should show details", () => {
    EventWrapper.setState({
      showDetails: false,
    });
    EventWrapper.find(".event__Overview button").simulate("click");
    expect(EventWrapper.state("showDetails")).toBe(true);
  });
});