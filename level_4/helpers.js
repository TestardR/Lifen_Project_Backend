module.exports = {
  FirstOrDefault: function(items, propertyName, searchValue) {
    for (var i = 0; i < items.length; i++) {
      if (items[i][propertyName] === searchValue) return items[i];
    }
    return null;
  }
};
