// import fetch from "node-fetch"
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require("./lib/shapes");
const { writeFile } = require("fs/promises");
const SVGwrapper = require("./lib/svg");

const perams = () => {return inquirer.prompt([
    {
        name: "text",
        type: "input",
        message:
          "Enter text for the logo. (cannot be more than 3 characters.)",
        validate: (text) =>
          text.length <= 3 ||
          "The Logo cannot not have more than 3 characters",
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a Shape you want to use',
        choices: ["Square", "Circle", "Triangle"] ,
      },
      {
        name: "textColor",
        type: "input",
        message: "Enter a text color",
      },
      {
        name: "shapeColor",
        type: "input",
        message: "Enter a shape color",
      },
]).then(({text, shape, textColor, shapeColor})=>{
  let newshape
    switch (shape){
        case "Square":
            console.log("square")
           newshape = new Square()
            break;
        case "Circle":
            console.log("Circle")
            newshape = new Circle()
            break;
        case "Triangle":
            console.log("Triangle")
            newshape = new Triangle()
             break;
        }
        newshape.setColor(shapeColor);

        const svg = new SVGwrapper();
          svg.setText(text, textColor);
          svg.setShape(newshape);
        return writeFile("logo.svg", svg.render());
        })
        .then(() => {
          console.log("Generated logo.svg");
        })
        .catch((error) => {
          console.log(error);
          console.log("Error, Something went wrong.");
    });
}


perams();
