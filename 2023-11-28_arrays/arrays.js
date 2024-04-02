
let myArray = [1, 2, 3, 4, 5];

// indexOf
console.log("indexOf:", myArray.indexOf(3)); // Ausgabe: 2

// push
myArray.push(6);
console.log("push:", myArray); // Ausgabe: [1, 2, 3, 4, 5, 6]

// pop
let poppedElement = myArray.pop();
console.log("pop:", poppedElement); // Ausgabe: 6

// unshift
myArray.unshift(0);
console.log("unshift:", myArray); // Ausgabe: [0, 1, 2, 3, 4, 5]

// shift
let shiftedElement = myArray.shift();
console.log("shift:", shiftedElement); // Ausgabe: 0

// includes
console.log("includes:", myArray.includes(3)); // Ausgabe: true

// slice
let slicedArray = myArray.slice(1, 4);
console.log("slice:", slicedArray); // Ausgabe: [1, 2, 3]

// splice
myArray.splice(1, 2, 10, 11);
console.log("splice:", myArray); // Ausgabe: [0, 10, 11, 4, 5]

// of / in (for...of loop)
console.log("for...of:");
for (let element of myArray) {
  console.log(element);
}

// map
let mappedArray = myArray.map(w => `Hallo ${w}`);
console.log("map:", mappedArray); // Ausgabe: ["Hallo 0", "Hallo 10", "Hallo 11", "Hallo 4", "Hallo 5"]

// filter
let filteredArray = myArray.filter(element => element > 5);
console.log("filter:", filteredArray); // Ausgabe: [10, 11]

// string - split / join
let myString = "1,2,3,4,5";
let splitString = myString.split(",");
console.log("split:", splitString); // Ausgabe: ["1", "2", "3", "4", "5"]

let joinedArray = splitString.join("-");
console.log("join:", joinedArray); // Ausgabe: "1-2-3-4-5"

// some
console.log("some:", myArray.some(element => element > 10)); // Ausgabe: true

// reverse
myArray.reverse();
console.log("reverse:", myArray); // Ausgabe: [5, 4, 11, 10, 0]

// reduce
let sum = myArray.reduce((accumulator, currentElement) => accumulator + currentElement, 0);
console.log("reduce:", sum); // Ausgabe: 30

// a = [...arr]
let newArrayCopy = [...myArray];
console.log("Array Copy:", newArrayCopy); // Ausgabe: [5, 4, 11, 10, 0]
