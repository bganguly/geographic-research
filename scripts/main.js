/**
 * Created by bikram on 1/30/17.
 */

/**
 * Returns an array of base 10 values, corresponding to the red,
 * green and blue parts of a valid 6 char hex str.
 * @param hexStr
 * @returns {Array}
 */
var getBase10ArrayFromHexStr = function(hexStr) {
    var regexToMatch = /.{1,2}/g;
    var rgbBase16Array = hexStr.match(regexToMatch);
    var rgbBase10Array = [];

    for (var i = 0; i < rgbBase16Array.length; i++) {
        rgbBase10Array.push(parseInt(rgbBase16Array[i], 16));
    }

    return rgbBase10Array;
};

/**
 * Returns a 6 char hex string, using the average of the red, green
 * and blue corresponding parts of two 6 char hex strings
 * @param hexStr1
 * @param hexStr2
 * @returns {string}
 */
var getAvgHexCode = function(hexStr1, hexStr2) {
    var rgbBase10Array1 = getBase10ArrayFromHexStr(hexStr1);
    var rgbBase10Array2 = getBase10ArrayFromHexStr(hexStr2);
    var avgRgbBase10Array = [];
    var avgRgbBase16Str = '';
    var eachRgbBase16Str;

    // for corresponding array elemnents just average and use
    // Math.ceil (Math.floor could alternatively also have been used)
    for (var i = 0; i < rgbBase10Array1.length; i++) {
        avgRgbBase10Array.push(
            Math.ceil((rgbBase10Array1[i] + rgbBase10Array2[i]) / 2));
    }

    // for the array containing avg rgb values in base 10, loop
    // through and build the corresponding hex code, with '0'
    // left padding if needed
    for (var element in avgRgbBase10Array) {
        eachRgbBase16Str = avgRgbBase10Array[element].toString(16);
        avgRgbBase16Str +=
            '00'.substring(0, 2 - eachRgbBase16Str.length) + eachRgbBase16Str;
    }

    return avgRgbBase16Str;
};

/**
 * sample tests
 */
// given 2 valid hex strings - the output is not null
console.log(typeof getAvgHexCode("ff0000", "ffffff") !== null);
// given 2 identical hex strings - the output equals either of them
console.log(getAvgHexCode("ffffff", "ffffff") === 'ffffff');
// given 2 hex srings , each individual string containing same rgb values,
// the output also has same rgb values
console.log(getAvgHexCode("ffffff", "000000") === '808080');
// when the avg of any of r/g/b is a whole number, that exact number is used
// avg of 80 and 20 is 50
console.log(getAvgHexCode("808080", "202020") === '505050');
// when the avg of any of r/g/b is fractional, its converted to its nearest
// whole number using Math.ceil(). avg of 81 and 20 is 50.5
console.log(getAvgHexCode("818181", "202020") === '515151');

