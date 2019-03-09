/*
We are building an online night-shift manager. Let's call it Planning de Garde :)
Here is our plan:

    a hospital schedule shifts for all their plannings
    shift workers manage their shifts

Level 1
Once the hospital has scheduled all shifts, it want to know how much each shift worker is supposed to be paid. Each shift is paid according to the worker assigned to the shift.
Write code that generates output.json from data.json
*/

// import data.json
const data = require('./data.json');

// Constructor
function ShiftWorker(first_name, status, id) {
  this.first_name = first_name;
  this.status = status;
  this.id = id;

  this.salary = () => {
    let count = 0;
    let salary = 0;
    for (let i = 0; i < data.shifts.length; i++) {
      if (data.shifts[i].user_id === this.id) {
        count++;
      }
    }
    for (let i = 0; i < data.workers.length; i++) {
      if (data.workers[i].status === 'medic') {
        salary = 270;
      }
    }
    return salary * count;
  };

  this.payment = () => {
    return `For this schedule, ${
      this.first_name
    } should be paid ${this.salary()} euros.`;
  };

  // List that will be parsed to JSON and written to output.json
  this.addToList = () => {
    list.push(this.payment());
  };
}

// Constructor instanciation for Julie
const Julie = new ShiftWorker(
  data.workers[0].first_name,
  data.workers[0].status,
  data.workers[0].id
);

// Constructor instanciation for Marc
const Marc = new ShiftWorker(
  data.workers[1].first_name,
  data.workers[1].status,
  data.workers[1].id
);

// Constructor instanciation for Antoine
const Antoine = new ShiftWorker(
  data.workers[2].first_name,
  data.workers[2].status,
  data.workers[2].id
);

// Write to output.json
const list = [];
Marc.addToList();
Julie.addToList();
Antoine.addToList();

const obj = {
  list
};

const addToOuput = () => {
  const fs = require('fs');
  fs.writeFile('output.json', JSON.stringify(obj), err => {
    if (err) throw err;
    console.log('complete');
  });
};

addToOuput();
