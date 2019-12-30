# Arabic to Roman numerals converter
A script that converts Arabic to Roman numerals. Script uses standard substractive format, so make sure you only pass
integers between 1 and 3999. See [Wikipedia page](https://en.wikipedia.org/wiki/Roman_numerals) for more information.

### Initialise project
Run `npm install`

### Run eslint
Run `npm run lint`

### Run mocha tests
Run `npm run test:mocha`

### Run mocha eslint and tests
Run `npm run test`

### Run locally
1. Build with running `tsc`

2. Run script with `node script/arabicToRoman.js <integer>`

#### How it works

1. Scripts starts the while loop with highest Arabic numeral of Roman mapping and throughout iterations continues from highest
down numeral down towards the last one (1000, 500, 100... 1)
    - _While loop runs until Arabic numeral is completely depleted_
2. It takes the Arabic numeral, and checks if the next Roman numeral is "n less than m"  IV (4), IX (9), XC (90), CM (900), 
which means "One less than five", "One less than ten", "Ten less than one hundred", "One hundred less than thousand" and so on
    - This is done with math calculation, that divides the passed numeral (in each iteration) with a current mapping numeral.
    _For example `990 / 1000`_. If the percentage result is more than 80% (for numerals close to 5) or 90% (for numerals close to 10),
    it means that it should indeed use the "subtractive" notation (IV, IX...)
3. In the same step, math calculation is used to subtract the correct amount from the amount that will be used in the next iteration
    - For example, `990` should first output `CM` and continue with left over amount `90` in the next iteration loop. Math calculation
    uses the percentage from the previous step (which would be `.99`) in this case, it multiplies it by 10, so and then floors the result,
    which gives us `9`. This is then multiplied with either `1`, `10`, `100`, `1000` - depending on the Roman mapping match. The result  
    (in this case `900`) is then deducted from the current left over amount `990` and leaves us with `90` - to be processed in the next iteration
4. If the next numeral shouldn't be written in "subtractive" notation, it just maps the number (for example `1000`) and adds correct Roman numeral to the string
 and after that deducts the current numeral (for example `1000`) from the left over amount, which can then be correctly used in the next iteration.
5. If none of these two cases are matched, the script continues to the next Roman numeral mapping (for example, from 1000 to 500 and then to 100 etc..)
