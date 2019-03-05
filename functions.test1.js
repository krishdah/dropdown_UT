let functions = require("./functions");
let localStorage = require("./localStorage");

jest.useFakeTimers();

test("waits 1 second ", () => {
  const timer = require("./timer");
  timer();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test("copy allLanguages List into filteredList", () => {
  let func = jest.fn(functions.componentDidMount);
  let data = localStorage.getItem("allLanguages");
  let newData = func(data);
  expect(newData).toEqual(data);
  localStorage.setItem("filteredItems", newData);
  expect(func).toHaveBeenCalledWith(data);
  expect(func).toHaveBeenCalledTimes(1);
});

test("List should display if its hidden or vice versa", () => {
  let func = jest.fn(functions.handleFocusAndBlur);
  let data = localStorage.getItem("showList");
  expect(func(data)).toBeTruthy();
  localStorage.setItem("showList", true);
  expect(func).toHaveBeenCalledTimes(1);
});

test("Search an language", () => {
  let func = jest.fn(functions.handleOnSearch);
  let data = localStorage.getItem("allLanguages");
  let newData = func(data, "a");
  expect(newData).toEqual({
    filteredItems: ["angular", "react", "firebase", "ajax"],
    showList: true
  });
  localStorage.setItem("showList", newData.showList);
  localStorage.setItem("filteredItems", newData.filteredItems);
  expect(func).toHaveBeenCalledWith(data, "a");

  newData = func(data, "m");
  expect(newData).toEqual({
    filteredItems: ["mongo", "mysql"],
    showList: true
  });
  localStorage.setItem("filteredItems", newData.filteredItems);
  localStorage.setItem("showList", newData.showList);
  expect(func).toHaveBeenCalledWith(data, "m");

  newData = func(data, "a..");
  expect(newData).toEqual({
    showList: true,
    filteredItems: []
  });
  localStorage.setItem("filteredItems", newData.filteredItems);
  localStorage.setItem("showList", newData.showList);
  expect(func).toHaveBeenCalledWith(data, "a..");

  newData = func(data, "kk");
  expect(newData).toEqual({
    showList: true,
    filteredItems: []
  });
  localStorage.setItem("filteredItems", newData.filteredItems);
  localStorage.setItem("showList", newData.showList);
  expect(func).toHaveBeenCalledWith(data, "kk");
  expect(func).toHaveBeenCalledTimes(4);
});

test("Handle onclick update selectedValue and hide List", () => {
  let func = jest.fn(functions.handleOnClick);
  let newData = func("mysql");
  expect(newData).toEqual({ selectedValue: "mysql", showList: false });
  localStorage.setItem("selectedValue", newData.selectedValue);
  localStorage.setItem("showList", newData.showList);
  expect(func).toHaveBeenCalledWith("mysql");
  expect(func).toHaveBeenCalledTimes(1);
});

test("update view on scroll", () => {
  let func = jest.fn(functions.updateViewOnScroll);
  let data = localStorage.getItem("allLanguages");
  let newData = func(0, data);
  expect(newData).toBe("angular");
  newData = func(5, data);
  expect(newData).toBe("mongo");
  expect(func).toHaveBeenCalledTimes(2);
});
