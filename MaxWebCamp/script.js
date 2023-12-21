const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 20, value: "Poison" },
  { minDegree: 21, maxDegree: 40, value: "Fire" },
  { minDegree: 41, maxDegree: 60, value: "Flying" },
  { minDegree: 61, maxDegree: 80, value: "Water" },
  { minDegree: 81, maxDegree: 100, value: "Bug" },
  { minDegree: 101, maxDegree: 120, value: "Normal" },
  { minDegree: 121, maxDegree: 140, value: "Electric" },
  { minDegree: 141, maxDegree: 160, value: "Ground" },
  { minDegree: 161, maxDegree: 180, value: "Fighting" },
  { minDegree: 181, maxDegree: 200, value: "Physic" },
  { minDegree: 201, maxDegree: 220, value: "Rock" },
  { minDegree: 221, maxDegree: 240, value: "Steel" },
  { minDegree: 241, maxDegree: 260, value: "Ice" },
  { minDegree: 261, maxDegree: 280, value: "Dragon" },
  { minDegree: 281, maxDegree: 300, value: "Ghost" },
  { minDegree: 301, maxDegree: 320, value: "Dark" },
  { minDegree: 321, maxDegree: 340, value: "Fairy" },
  { minDegree: 341, maxDegree: 360, value: "Grass" },

];
//Size of each piece
const data = [1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1]; // equals to a total of 96
//background color for each piece
var pieColors = [
  "#00ff00",
  "#ff66ff",
  "#ff6600",
  "#66ccff",
  "#0000ff",
  "#009933",
  "#999966",
  "#ffff00",
  "#996600",
  "#993300",
  "#660066",
  "#cc6600",
  "#669999",
  "#00ffff",
  "#ccff33",
  "#9933ff",
  "#",
  "#ff6699",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["Grass", "Poison","Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Physic", "Rock", "Steel", "Ice", "Dragon", "Ghost", "Dark", "Fairy"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 11 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (361));
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});