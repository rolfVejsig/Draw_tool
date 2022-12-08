"use strict";
const svg = document.getElementById("mySvg");
const pt = svg.createSVGPoint();
const listOfPoints = [];
const listOfVectors = [];
const angleOfVectors = [];

//function that converts screen pt to svg pt.
const calculateSVGPoints = (x, y) => {
  pt.x = event.clientX;
  pt.y = event.clientY;
  const svg_p = pt.matrixTransform(svg.getScreenCTM().inverse());
  return [svg_p.x, svg_p.y];
};

var list1 = [];
//function that
svg.addEventListener("click", (event) => {
  listOfPoints.push(calculateSVGPoints(event.clientX, event.clientY));
  createSVGPath(listOfPoints);

  //Laver vektorerne - ROLF
  const lastPointIndex = listOfPoints.length - 1;
  if (lastPointIndex >= 1) {
    const vectorPoints = vectorBetweenPoints(
      listOfPoints[lastPointIndex - 1],
      listOfPoints[lastPointIndex]
    );

    //Tilføjer vektor koordinaterne til listOfVectors - ROLF
    listOfVectors.push(vectorPoints);
    console.log(listOfVectors);

    //Laver radianer mellem vekotornen - ROlF
    const lastVectorIndex = listOfVectors.length - 1;
    if (lastVectorIndex >= 1) {
      const vectorAngle = angleBetweenVectors(
        listOfVectors[lastVectorIndex - 1],
        listOfVectors[lastVectorIndex]
      );

      //Omregner radianer til grader - ROLF
      const angleInDegrees = radiansToDegree(vectorAngle);
      //Tilføjer Vinklen af vektorerne til angleOfVectors - ROLF
      angleOfVectors.push(angleInDegrees);
      console.log(angleOfVectors);
    }
  }
});

const createSVGPath = (list) => {
  console.log(listOfPoints);
  document
    .querySelector("path")
    .setAttribute(
      "d",
      list.map((c, i) => (i ? `${c[0]} ${c[1]}` : `M${c[0]} ${c[1]}`)).join(" ")
    );
};

//Beregner lændge af vektor - ROLF
const lenOfVector = (vector) => {
  return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
};

//Beregner vinkel mellem to vektorer - ROLF
const angleBetweenVectors = (vector1, vector2) => {
  const cosV =
    (-vector1[0] * vector2[0] + -vector1[1] * vector2[1]) /
    (lenOfVector(vector1) * lenOfVector(vector2));
  return Math.acos(cosV);
};

//Beregner radianer til grader - ROLF
const radiansToDegree = (radians) => {
  return (radians * 180) / Math.PI;
};

//Beregner en vektor mellem to punkter - ROLF
const vectorBetweenPoints = (punkt1, punkt2) => {
  return [punkt2[0] - punkt1[0], punkt2[1] - punkt1[1]];
};
