// import data.json
const data = require('./data.json');
const fs = require('fs');
const helpers = require('./helpers');

// Constructor
class ShiftWorker {
  constructor(id, first_name, status) {
    this.id = id;
    this.first_name = first_name;
    this.status = status;
  }

  salary() {
    let count = 0;
    for (let i = 0; i < data.shifts.length; i++) {
      if (data.shifts[i].user_id === this.id) {
        if (
          new Date(data.shifts[i].start_date).getDay() % 6 === 0 ||
          new Date(data.shifts[i].start_date).getDay() % 0 === 0
        ) {
          count++;
        }
        count++;
      }
    }
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
    return count * price_per_shift;
  }

  // Calculate fees and interim_shifts
  commission() {
    let count = 0;
    for (let i = 0; i < data.shifts.length; i++) {
      if (data.shifts[i].user_id === this.id) {
        if (
          new Date(data.shifts[i].start_date).getDay() % 6 === 0 ||
          new Date(data.shifts[i].start_date).getDay() % 0 === 0
        ) {
          count++;
        }
        count++;
      }
    }
    let price_per_shift = 0;
    let fee = 0;
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
    return (fee = count * price_per_shift * 0.05);
  }

  jsonify() {
    const myJSON = `{"id": ${this.id}, "price": ${this.salary()}}`;
    return JSON.parse(myJSON);
  }
}

const employees = [];
for (let i = 0; i < data.workers.length; i++) {
  employees.push(
    new ShiftWorker(
      data.workers[i].id,
      data.workers[i].first_name,
      data.workers[i].status
    )
  );
}

// Calculate the commission
// 1.Calculte the total of 0.05%
let totalRegularFee = 0;
for (let employee of employees) {
  totalRegularFee += employee.commission();
}

// 2. Calculte the extra 80$ for the interim shifts
function interimShifts() {
  let interim_shifts = 0;

  data.shifts.forEach(shift => {
    var shiftWorker = helpers.FirstOrDefault(data.workers, 'id', shift.user_id);
    // take into account edge cases
    if (
      shiftWorker != undefined &&
      shiftWorker != null &&
      shiftWorker.status === 'interim'
    )
      interim_shifts++;
  });

  return interim_shifts;
}

function extraFee() {
  const extrafee = 80;
  let totalExtraFee = 0;
  return (totalExtraFee = interimShifts() * extrafee);
}

// Add up 1. and 2. and prepare for JSON
let totalFee = totalRegularFee + extraFee();
function jsonify() {
  const myJSON = `{"pdg_fee": ${totalFee}, "interim_shifts": ${interimShifts()}}`;
  return JSON.parse(myJSON);
}
jsonify();

// Write to output.json
const list = {};
const workers = 'workers';
const commission = 'commission';
list[workers] = [];
list[commission] = jsonify();

// Write price and id
for (let employee of employees) {
  list[workers].push(employee.jsonify());
}

// Write commission and number of interim_shifts

const writeToOutput = () => {
  fs.writeFile('output.json', JSON.stringify(list), err => {
    if (err) throw err;
    console.log('complete');
  });
};

writeToOutput();
