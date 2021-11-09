import randomColor from "randomcolor";
import moment from 'moment';


export const generateRandomColor = () =>
  randomColor({
    luminosity: "dark",
  });

export const generateRandomArray = (length, max) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

export const generateRandomSeries = (dataLength, itemLength = -1) => {
  const names = ["Sean", "Ivan", "Brendan", "Matteo", "Joan", "Avinash"];

  return names.map(name => ({
    name,
    data: generateRandomArray(dataLength, 100),
    color: generateRandomColor()
  })).slice(0, itemLength);
};

export const generateLabels = length =>
  [...new Array(length)].map((_, i) => moment().month(i).format('MMM'));
