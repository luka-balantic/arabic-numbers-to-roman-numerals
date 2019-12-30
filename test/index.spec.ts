import { expect } from 'chai';
import arabicToRoman from '../script/index';

describe('arabic to roman numerals converter function', () => {
  const invalidInputErrorMessage: string = 'Invalid input! Please only use integers bigger or equal than 1 and lower or equal than 3999';

  describe('when invalid input is passed', () => {
    const scenarios = [
      {
        title: 'and the input is incorrect type',
        input: 'some non-integrer string',
      },
      {
        title: 'and the input is integer smaller than 1',
        input: 0,
      },
      {
        title: 'and the input is integer bigger than 3999',
        input: 4000,
      },
      {
        title: 'and the input is float number',
        input: 1.3333323,
      },
    ];

    scenarios.forEach(({ title, input }) => {
      describe(title, () => {
        it('should throw correct error message', () => {
          // @ts-ignore
          expect(arabicToRoman(input)).to.throw(invalidInputErrorMessage);
        });
      });
    });
  });

  describe('when valid input is passed', () => {
    const scenarios = [
      {
        input: 1,
        expectedOutput: 'I',
      },
      {
        input: 2,
        expectedOutput: 'II',
      },
      {
        input: 3,
        expectedOutput: 'III',
      },
      {
        input: 4,
        expectedOutput: 'IV',
      },
      {
        input: 5,
        expectedOutput: 'V',
      },
      {
        input: 8,
        expectedOutput: 'VIII',
      },
      {
        input: 9,
        expectedOutput: 'IX',
      },
      {
        input: 10,
        expectedOutput: 'X',
      },
      {
        input: 11,
        expectedOutput: 'XI',
      },
      {
        input: 14,
        expectedOutput: 'XIV',
      },
      {
        input: 15,
        expectedOutput: 'XV',
      },
      {
        input: 19,
        expectedOutput: 'XIX',
      },
      {
        input: 22,
        expectedOutput: 'XXII',
      },
      {
        input: 36,
        expectedOutput: 'XXXVI',
      },
      {
        input: 1000,
        expectedOutput: 'M',
      },
      {
        input: 1001,
        expectedOutput: 'MI',
      },
      {
        input: 1990,
        expectedOutput: 'MCMXC',
      },
      {
        input: 1776,
        expectedOutput: 'MDCCLXXVI',
      },
      {
        input: 2007,
        expectedOutput: 'MMVII',
      },
      {
        input: 2008,
        expectedOutput: 'MMVIII',
      },
    ];

    scenarios.forEach(({ input, expectedOutput }) => {
      it(`should convert arabic numeral ${input} to roman numeral string ${expectedOutput}`, () => {
        expect(arabicToRoman(input)).to.equal(expectedOutput);
      });
    });
  });
});
