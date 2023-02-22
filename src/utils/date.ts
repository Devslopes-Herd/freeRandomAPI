const randomMonthAndNumber = (): number[] => {
  const not30 = [0, 2, 4, 6, 7, 9, 11];
  const month = Math.floor(Math.random() * 12);
  const day = not30.includes(month)
    ? Math.floor(Math.random() * 31)
    : month === 1
    ? Math.floor(Math.random() * 28)
    : Math.floor(Math.random() * 30);
  return [month, day];
};

export const subtractYears = (numOfYears: number): Date => {
  const monthDay = randomMonthAndNumber();
  const newYear = new Date(Date.now()).getFullYear() - numOfYears;
  return new Date(newYear, monthDay[0], monthDay[1]);
};

module.exports = subtractYears;
