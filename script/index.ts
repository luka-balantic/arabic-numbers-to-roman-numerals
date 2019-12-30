const arabicToRomanNumeralMapping: { [key: number]: string } = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M',
};

export default (number: number): string => {
  if (!Number.isInteger(number) || number < 1 || number > 3999) {
    throw new Error('Invalid input! Please only use integers bigger or equal than 1 and lower or equal than 3999');
  }

  return String(arabicToRomanNumeralMapping[number]);
};
