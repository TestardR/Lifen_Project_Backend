const data = require('./data.json');
module.exports = {
  pricePerShift: () => {
    let price_per_shift = 0;
    switch (this.status) {
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
