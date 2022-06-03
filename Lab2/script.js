let calcNumber = "";
let lastNumber = 0;
let state = false;
let count = 0;

function Numbers(result) {
    try {
        if (result == '+' || result == '-' || result == '*' || result == '/' || result == '/100*') {
            if (state) {
                count += 1;
                calcNumber += result;
                lastNumber = calcNumber.slice(-1);
                result = result == "/100*" ? "%" : result;
                result = result == "/" ? "÷" : result;
                document.getElementById('calc').innerHTML += `<span id="sum-${count}" style="color:#ff2525;margin:0 10px">${result}<span>`;
                state = false;
            }
        } else {
            if (document.getElementById('calc').innerHTML == '0') {
                document.getElementById('calc').innerHTML = '';
            }
            calcNumber += result;
            lastNumber = calcNumber.slice(-1);
            state = true;
            document.getElementById('calc').innerHTML += result;
            if (eval(calcNumber).toString().length >= 10) {
                document.getElementById('result').innerHTML = expo(eval(calcNumber), 2);
            } else {
                document.getElementById('result').innerHTML = eval(calcNumber);
            }
        }
    } catch (e) {
        console.log(e)
    }
}

document.getElementById('backspace').addEventListener('click', () => {
    if (lastNumber == '+' || lastNumber == '-' || lastNumber == '*' || lastNumber == '/') {
        calcNumber = calcNumber.slice(-5) == "/100*" ? calcNumber.slice(0, -5) : calcNumber.substring(0, calcNumber.length - 1);
        lastNumber = calcNumber.slice(-1);
        document.getElementById(`sum-${count}`).remove();
        count -= 1;
        if (eval(calcNumber).toString().length >= 10) {
            document.getElementById('result').innerHTML = expo(eval(calcNumber), 2);
        } else {
            document.getElementById('result').innerHTML = eval(calcNumber);
        }
        state = true;
    } else {
        calcNumber = calcNumber.substring(0, calcNumber.length - 1);
        lastNumber = calcNumber.slice(-1);
        values = document.getElementById('calc').innerHTML;
        values = values.substring(0, values.toString().length - 1);
        document.getElementById('calc').innerHTML = values;
    }
    if (calcNumber == "") {
        document.getElementById('calc').innerHTML = "0";
        result.innerHTML = 0;
        state = false;
        return;
    }
});

function calc() {
    document.getElementById('calc').innerHTML = document.getElementById('result').innerHTML;
    calcNumber = document.getElementById('result').innerHTML;
    state = true;
}

function clearButton() {
    document.getElementById('calc').innerHTML = "0";
    calcNumber = "";
    result.innerHTML = 0;
    state = false;
}

function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
}