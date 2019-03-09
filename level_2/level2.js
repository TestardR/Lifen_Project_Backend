// import data.json
const data = require('./data.json');
const fs = require('fs');

// Constructor
function ShiftWorker(first_name, status, id) {
  this.first_name = first_name;
  this.status = status;
  this.id = id;

  this.salary = () => {
    let count = 0;
    let price_per_shift = 0;
    for (let i = 0; i < data.workers.length; i++) {
      if (data.shifts[i].user_id === this.id) {
        count++;
      }
      data.workers[i].status === 'medic'
        ? (price_per_shift = 270)
        : (price_per_shift = 126);
      return count * price_per_shift;
    }
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
      data.workers[i].status,
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
