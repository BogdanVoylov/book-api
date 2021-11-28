export const slowFunction = (baseNumber: number) => {
  let result = 0;
  for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
  return result;
};

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
