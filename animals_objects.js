"use strict";

window.addEventListener("DOMContentLoaded", start);

const Animal = {
  name: "-default name",
  desc: "-no description",
  type: "-unknown-",
  age: 0,
};
const allAnimals = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObject(jsonData);
    });
}

function prepareObject(jsonData) {
  jsonData.forEach((jsonObject) => {
    // create new object
    const animal = Object.create(Animal);
    // extrat data from json Object

    const fullname = jsonObject.fullname;
    const animalName = fullname.substring("", fullname.indexOf(" ")).trim();
    const animalType = fullname.substring(fullname.lastIndexOf(" ")).trim();
    const animalDesc = fullname
      .substring(fullname.indexOf(" "), fullname.lastIndexOf(" "))
      .trim();
    console.log(animalDesc, animalName, animalType);

    // put cleaned data into newly created object
    animal.name = animalName;
    animal.desc = animalDesc;
    animal.type = animalType;
    animal.age = jsonObject.age;

    allAnimals.push(animal);

    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    // TODO: MISSING CODE HERE !!!
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
