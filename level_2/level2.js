// import data.json
const data = require('./data.json');
const fs = require('fs');

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
        count++;
      }
    }
    let price_per_shift = 0;
    this.status === 'medic' ? (price_per_shift = 270) : (price_per_shift = 126);
    return count * price_per_shift;
  }

  payment() {
    return `For this schedule, ${
      this.first_name
    } should be paid ${this.salary()} euros.`;
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
