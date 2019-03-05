let functions = require("./functions");
let mockStorage = require("./data");

test("copy allLanguages List into filteredList on component mount", () => {
  let func = jest.fn(functions.componentDidMount);
  let data = mockStorage.allLanguages;
  let newData = func(data);
  expect(newData).toEqual(data);
  mockStorage.filteredItems = newData;
  expect(func).toHaveBeenCalledWith(data);
  expect(newData).toEqual(data);
  expect(func).toHaveBeenCalledTimes(1);
});

test("List should display ", () => {
  let func = jest.fn(functions.onFocusHandler);
  let data = mockStorage.showList;
  expect(func(data)).toBeTruthy();
  mockStorage.showList = true;
  expect(func).toHaveBeenCalledTimes(1);
});

test("List should hide ", () => {
  let func = jest.fn(functions.onBlurHandler);
  let data = mockStorage.showList;
  let newData = func(data, "");
  expect(newData.showList).toBeFalsy();
  expect(newData.highlightedValue).toBe("");
  mockStorage.showList = newData.showList;
  mockStorage.highlightedValue = newData.highlightedValue;
  expect(func).toHaveBeenCalledTimes(1);
});

test("Handle onclick update selectedItems List", () => {
  let func = jest.fn(functions.onClickHandler);
  let data = mockStorage.selectedItems;
  let newData = func(data, "ajax");
  expect(newData).toEqual({
    highlightedValue: "ajax",
    selectedItems: data.concat("ajax")
  });
  mockStorage.highlightedValue = newData.highlightedValue;
  mockStorage.selectedItems = newData.selectedItems;
  expect(func).toHaveBeenCalledTimes(1);
});

test("Search an language", () => {
  let func = jest.fn(functions.onChangeHandler);
  let data = mockStorage.allLanguages;
  let newData = func(data, "a");
  expect(newData).toEqual({
    filteredItems: ["angular", "react", "firebase", "ajax"],
    searchInput: "a"
  });
  mockStorage.filteredItems = newData.filteredItems;
  mockStorage.searchInput = newData.searchInput;
  expect(func).toHaveBeenCalledWith(data, "a");

  newData = func(data, "m");
  expect(newData).toEqual({
    filteredItems: ["mongo", "mysql"],
    searchInput: "m"
  });
  mockStorage.filteredItems = newData.filteredItems;
  mockStorage.searchInput = newData.searchInput;
  expect(func).toHaveBeenCalledWith(data, "m");

  newData = func(data, "a..");
  expect(newData).toEqual({
    filteredItems: [],
    searchInput: "a.."
  });
  mockStorage.filteredItems = newData.filteredItems;
  mockStorage.searchInput = newData.searchInput;
  expect(func).toHaveBeenCalledWith(data, "a..");

  newData = func(data, "kk");
  expect(newData).toEqual({
    filteredItems: [],
    searchInput: "kk"
  });
  mockStorage.filteredItems = newData.filteredItems;
  mockStorage.searchInput = newData.searchInput;
  expect(func).toHaveBeenCalledWith(data, "kk");
  expect(func).toHaveBeenCalledTimes(4);
});

test("update view on scroll", () => {
  let func = jest.fn(functions.onKeyDownHandler);
  let data = mockStorage.allLanguages;
  let selectedItems = mockStorage.selectedItems;
  let newData = func(38, data, "vue", selectedItems);
  expect(newData).toEqual({
    highlightedValue: "react"
  });

  newData = func(40, data, "node", selectedItems);
  expect(newData).toEqual({
    highlightedValue: "mongo"
  });

  newData = func(38, data, "angular", selectedItems);
  expect(newData).toEqual({});

  newData = func(13, data, "express", selectedItems);
  let newList = selectedItems.concat("express");
  expect(newData).toEqual({
    highlightedValue: "express",
    selectedItems: newList
  });
  expect(func).toHaveBeenCalledTimes(4);
});
