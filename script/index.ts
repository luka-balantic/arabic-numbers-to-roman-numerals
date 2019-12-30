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

  const arabicNumerals: Array<string> = Object.keys(arabicToRomanNumeralMapping).reverse();

  let arabicNumeralLeftOverToProcess: number = number;
  let index: number = 0;
  let romanNumeral: string = '';

  while (arabicNumeralLeftOverToProcess !== 0) {
    const currentArabicNumeral: number = Number(arabicNumerals[index]);

    // Check for "n less than m" (compressed numerals), for example IV, IX, XC, XL etc..
    // We verify that with dividing the "number left to be processed" with currentArabicNumeral (1, 5, 10, 50...)
    // and result should be more than 80% for numerals close to 5 (IV, XL...)
    // or more than 90% for numerals close to 10 (IX, XC, CM)
    const percentageAgainstCurrentArabicNumeral: number = arabicNumeralLeftOverToProcess / currentArabicNumeral;
    const firstDigitOfArabicNumeral: number = Number(String(arabicNumeralLeftOverToProcess).split('')[0]);
    const percentageLimit: number = firstDigitOfArabicNumeral < 5 ? 0.80 : 0.90;

    if (percentageAgainstCurrentArabicNumeral >= percentageLimit && percentageAgainstCurrentArabicNumeral < 1) {
      const numeralLessThanCurrent: number = currentArabicNumeral / 10;
      const numeralLessThanCurrentWithFallback: number = numeralLessThanCurrent >= 1 ? numeralLessThanCurrent : 1;
      const romanNumeralLessThanCurrent: string = arabicToRomanNumeralMapping[numeralLessThanCurrentWithFallback];
      const currentRomanNumeral: string = arabicToRomanNumeralMapping[currentArabicNumeral];

      romanNumeral = `${romanNumeral}${romanNumeralLessThanCurrent}${currentRomanNumeral}`;

      // When current number is processed, we have to remove the correct amount from "left over" amount
      // which will be processed in the next iteration, but we have to make sure we don't remove the remainder as well,
      // so we floor .99 percentages down to .90 and then multiply it with numeralLessThanCurrent, which is the indicator
      // in roman numeral (1 less than 10 is IX, or 100 less than 1000 is CM)
      // and in the example of 990, CM will be written, and 90 will be left for another iteration
      // .99 * 10 will be 9.9 and using floor() function we remove the remainder, so we are left with 9 which we again
      // divide by 10 and we get the percentage indicator without the remainder of (0.9), which is then used to deduct
      // from the leftover amount
      const flooredNumeralWithoutRemainder: number = Math.floor(percentageAgainstCurrentArabicNumeral * 10) / 10;
      arabicNumeralLeftOverToProcess -= (flooredNumeralWithoutRemainder * numeralLessThanCurrent * 10);
    } else if (arabicNumeralLeftOverToProcess - currentArabicNumeral >= 0) {
      // check if leftover is high enough for current numeral that can be mapped
      // if yes, add the mapped roman numeral to the string
      romanNumeral = `${romanNumeral}${arabicToRomanNumeralMapping[currentArabicNumeral]}`;
      arabicNumeralLeftOverToProcess -= currentArabicNumeral;

      // if no, continue with next roman letters in mapping (from highest to lowest)
    } else {
      index += 1;
    }
  }

  return romanNumeral;
};
