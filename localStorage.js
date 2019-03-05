let mockStorage = {
  allLanguages: [
    "angular",
    "react",
    "vue",
    "express",
    "node",
    "mongo",
    "firebase",
    "mysql",
    "jquery",
    "ajax"
  ],
  searchInput: "",
  showList: false,
  filteredItems: [],
  selectedValue: ""
};

module.exports = window.localStorage = {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: key => mockStorage[key],
  clear: () => (mockStorage = {})
};
