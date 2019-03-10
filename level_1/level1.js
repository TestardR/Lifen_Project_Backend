// import data.json
const data = require('./data.json');
const fs = require('fs');

// Constructor
class ShiftWorker {
  constructor(first_name, price_per_shift, id) {
    this.first_name = first_name;
    this.price_per_shift = price_per_shift;
    this.id = id;
  }

  salary() {
    let count = 0;
    let salary = 0;
    for (let i = 0; i < data.shifts.length; i++) {
      if (data.shifts[i].user_id === this.id) {
        count++;
      }
      salary = count * this.price_per_shift;
    }
    return salary;
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
      data.workers[i].first_name,
      data.workers[i].price_per_shift,
      data.workers[i].id
    )
  );
}

// Write to output.json
const list = {};
const key = 'workers';
list[key] = [];

for (let employee of employees) {
  list[key].push(employee.jsonify());
}

const writeToOutput = () => {
  fs.writeFile('output.json', JSON.stringify(list), err => {
    if (err) throw err;
    console.log('complete');
  });
};

writeToOutput();
