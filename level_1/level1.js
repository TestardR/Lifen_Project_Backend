// import data.json
const data = require('./data.json');
const fs = require('fs');

// Constructor
function ShiftWorker(first_name, price_per_shift, id) {
  this.first_name = first_name;
  this.price_per_shift = price_per_shift;
  this.id = id;

  this.salary = () => {
    let count = 0;
    let salary = 0;
    for (let i = 0; i < data.shifts.length; i++) {
      if (data.shifts[i].user_id === this.id) {
        count++;
      }
      salary = count * this.price_per_shift;
    }
    return salary;
  };

  this.payment = () => {
    return `For this schedule, ${
      this.first_name
    } should be paid ${this.salary()} euros.`;
  };
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
const list = [];

for (let employee of employees) {
  list.push(employee.payment());
}

const writeToOutput = () => {
  fs.writeFile('output.json', JSON.stringify(list), err => {
    if (err) throw err;
    console.log('complete');
  });
};

writeToOutput();
