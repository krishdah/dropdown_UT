const functions = {
  componentDidMount: allLanguages => {
    return [...allLanguages];
  },

  handleFocusAndBlur: truthvalue => !truthvalue,

  handleOnSearch: (allLanguages, searchPattern) => {
    let obj = {};
    obj.showList = true;
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

  handleOnClick: item => {
    let obj = { selectedValue: item, showList: false };
    return obj;
  },

  updateViewOnScroll: (itemIndex, allLanguages) => {
    let selectedValue = allLanguages[itemIndex];
    return selectedValue;
  }
};

module.exports = functions;
