const functions = {
  componentDidMount: allLanguages => {
    return [...allLanguages];
  },

  onFocusHandler: truthvalue => !truthvalue,

  onBlurHandler: (truthvalue, highlightedValue) => {
    return { showList: !truthvalue, highlightedValue: highlightedValue };
  },

  onChangeHandler: (allLanguages, searchPattern) => {
    let obj = {};
    obj.searchInput = searchPattern;
    if (searchPattern.indexOf(".") !== -1) {
      obj.filteredItems = [];
      return obj;
    } else {
      let newList = allLanguages.filter(list => {
        let item = list.toLowerCase().search(searchPattern.toLowerCase());
        if (item !== -1) {
          return list;
        }
      });
      obj.filteredItems = newList;
      return obj;
    }
  },

  onClickHandler: (arr, highlightedValue) => {
    let obj = {
      highlightedValue: highlightedValue,
      selectedItems: arr.concat(highlightedValue)
    };
    return obj;
  },

  onKeyDownHandler: (
    keycode,
    allLanguages,
    highlightedValue,
    selectedItems
  ) => {
    let obj = {};
    let index =
      highlightedValue === "" ? -1 : allLanguages.indexOf(highlightedValue);
    if (keycode === 38 && index > 0) {
      obj.highlightedValue = allLanguages[index - 1];
    } else if (keycode === 40 && index < allLanguages.length - 1) {
      obj.highlightedValue = allLanguages[index + 1];
    } else if (keycode === 13) {
      obj.highlightedValue = highlightedValue;
      obj.selectedItems = selectedItems.includes(highlightedValue)
        ? selectedItems.filter(item => {
            return item !== highlightedValue;
          })
        : selectedItems.concat(highlightedValue);
    }
    return obj;
  }
};

module.exports = functions;
