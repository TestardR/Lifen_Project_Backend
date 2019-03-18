const data = require('./data.json');

module.exports = {
  // méthode de Linq en C#
  // return first item with desired value || null
  FirstOrDefault: function(items, propertyName, searchValue) {
    for (var i = 0; i < items.length; i++) {
      if (items[i][propertyName] === searchValue) return items[i];
    }
    return null;
  },

  count: id => {
    let count = 0;
    for (let i = 0; i < data.shifts.length; i++) {
      if (data.shifts[i].user_id === id) {
        if (
          new Date(data.shifts[i].start_date).getDay() % 6 === 0 ||
          new Date(data.shifts[i].start_date).getDay() % 0 === 0
        ) {
          count++;
        }
        count++;
      }
    }
    return count;
  },

  status: status => {
    let price_per_shift = 0;
    switch (status) {
      case 'medic':
        price_per_shift = 270;
        break;
      case 'interne':
        price_per_shift = 126;
        break;
      case 'interim':
        price_per_shift = 480;
    }
    return price_per_shift;
  }
};
