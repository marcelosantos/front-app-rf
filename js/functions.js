/*
 * shuffle an array
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * verify is n is integer
 */
function isInt(n) {
    return typeof n === 'number' && n % 1 == 0;
}

function isFloat(n) {
    return n === +n && n !== (n | 0);
}

function isNatural(n) {
    return n >= 0 && Math.floor(n) === +n;
}

function isNotLoaded(obj) {
    return JSON.stringify(obj) === '{}'
}

function checkIfPropIsLoaded(obj, prop) {
    if (!obj.hasOwnProperty(prop)) {
        throw prop + ' não carregado';
        return false;
    }
    // console.debug(prop + ' loaded');
    return true;
}

function checkIfPropHasData(obj, prop) {
    if (!obj[prop]) {
        console.warn(prop + ' sem dados');
        return false;
    }
    // console.debug(prop + ' has data');
    return true;
}

function currencyFormat(number, decimalplaces, decimalcharacter,
    thousandseparater) {
    if (decimalplaces == null || decimalplaces == undefined) {
        decimalplaces = 2;
    }
    if (decimalcharacter == null || decimalcharacter == undefined) {
        decimalcharacter = ",";
    }
    if (thousandseparater == null || thousandseparater == undefined) {
        thousandseparater = ".";
    }

    number = parseFloat(number);
    var sign = number < 0 ? "-" : "";
    var formatted = new String(number.toFixed(decimalplaces));

    if (decimalcharacter.length && decimalcharacter != ".") {
        formatted = formatted.replace(/\./, decimalcharacter);
    }
    var integer = "";
    var fraction = "";
    var strnumber = new String(formatted);
    var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) :
        -1;
    if (dotpos > -1) {
        if (dotpos) {
            integer = strnumber.substr(0, dotpos);
        }
        fraction = strnumber.substr(dotpos + 1);
    } else {
        integer = strnumber;
    }
    if (integer) {
        integer = String(Math.abs(integer));
    }
    while (fraction.length < decimalplaces) {
        fraction += "0";
    }
    temparray = new Array();
    while (integer.length > 3) {
        temparray.unshift(integer.substr(-3));
        integer = integer.substr(0, integer.length - 3);
    }
    temparray.unshift(integer);
    integer = temparray.join(thousandseparater);
    return sign + integer + decimalcharacter + fraction;
}

function roundBigCurrency(n) {
    n = parseFloat(n);
    if (isFloat(n) || isInt(n)) {
        if (n >= 1000 && n < 999999) {
            value = (n / 1000);
            suffix = ' Mil';
        } else if (n >= 1000000 && n < 999999999) {
            value = (n / 1000000);
            suffix = ' Mi';
        } else if (n >= 1000000000 && n < 999999999999) {
            value = (n / 1000000000);
            suffix = ' Bi';
        } else {
            value = n;
            suffix = '';
        }

        if (isInt(value)) {
            return 'R$ ' + currencyFormat(value) + suffix;
        } else {
            return 'R$ ' + currencyFormat(value) + suffix;
        }
    }
}

function roundBigNumber(n) {
    n = parseInt(n);
    if (isInt(n)) {
        if (n >= 1000 && n < 999999) {
            value = (n / 1000);
            suffix = ' Mil';
        } else if (n >= 1000000 && n < 999999999) {
            value = (n / 1000000);
            suffix = ' Mi';
        } else if (n >= 1000000000 && n < 999999999999) {
            value = (n / 1000000000);
            suffix = ' Bi';
        } else {
            value = n;
            suffix = '';
        }

        if(n >= 1000){
            if (isInt(value)) {
                return currencyFormat(value) + suffix;
            } else {
                return currencyFormat(value) + suffix;
            }
        }else{
            return value + suffix;
        }

    }
}

/**
 * [dataPorExtenso description]
 * @param  {string} dataString string de data obtida do banco de dados no formato ISO 8601
 * @param  {string} timeString string de tempo obtida do banco de dados no formato ISO 8601
 * @return {string} string no formato extenso brasileiro
 */
function dataPorExtenso(dataString, timeString) {
    if (typeof(timeString) === 'undefined' || timeString === null) {
        var date = new Date(dataString);
    } else {
        // var timeString is set
        var date = new Date(dataString + 'T' + timeString + '-0300');
    }
    var options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    return date.toLocaleTimeString('pt-br', options);
}

function generateColorsForChart(chartType) {
    var colors = [];
    var arrayColors = [
        // "206, 120, 255",
        // "71, 160, 220",
        // "218, 255, 0",
        // "91, 200, 84",
        // "255, 194, 193",
        // "255, 66, 68",
        // "255, 231, 151",
        // "255, 167, 40",
        // "242, 218, 254",
        // "146, 101, 194",
        // "220, 220, 170",
        // "217, 129, 80"
        //
        "226, 136, 55",
        "221, 185, 82",
        "91, 170, 85",
        "83, 219, 193",
        "62, 154, 186",
        "102, 197, 255",
        "136, 62, 183",
        "188, 87, 142",
        "175, 53, 44",
        "130, 117, 74",
        "121, 121, 121",
        "197, 197, 209"
    ];
    var fillColor = "rgba(0,0,0,0)";

    // arrayColors = shuffleArray(arrayColors);
    for (var i = 0, countColors = arrayColors.length; i < countColors; i++) {
        var rgb = arrayColors[i];

        if (chartType === 'bar') {
            fillColor = "rgba(" + rgb + ",1)";
        }
        colors.push({
            'fillColor': fillColor,
            'strokeColor': "rgba(" + rgb + ",1)",
            'pointColor': "rgba(" + rgb + ",1)",
            'pointHighlightStroke': "rgba(" + rgb + ",0.8)",
            'pointStrokeColor': "#fff",
            'pointHighlightFill': "#fff"
        });
    }

    return colors;
}

function generateColorsForLineChart() {
    return generateColorsForChart('line');
}

function generateColorsForBarChart() {
    return generateColorsForChart('bar');
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://raw.githubusercontent.com/coolaj86/knuth-shuffle/master/index.js
function shuffleArray(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function notaIdeb(number) {
    var floatNumber = parseFloat(number);
    if(isNaN(floatNumber)) return 'sem nota';
    return currencyFormat(floatNumber);
}

function ucfirst(str) {
    var firstLetter = str.slice(0,1);
    return firstLetter.toUpperCase() + str.substring(1);
}

/**
 * Polyfill Array.prototype.findIndex
 * ECMAScript 6 (262)
 */
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
