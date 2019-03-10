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
    this.status === 'medic' ? (price_per_shift = 270) : (price_per_shift = 126);
    return count * price_per_shift;
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
