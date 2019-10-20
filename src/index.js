function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, "");

    var array = expr.split("");
    if(array.includes("(") || array.includes(")")) {
        let balans = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] == "(") {
                balans++;
            } else if (array[i] == ")") {
                balans--;
            }
            if (balans < 0) {
                throw("ExpressionError: Brackets must be paired");
                return;
            }
        }
        if (balans != 0) {
            throw("ExpressionError: Brackets must be paired");
            return;
        }

        while(expr.indexOf("(")!=-1){
            let str = expr.concat().match(/\([^()]+\)/)[0];
            let strEsear = getSolution(str.match(/[^()]+/)[0]);
            if(strEsear<0){
                strEsear = "Q" + strEsear;
            }
            expr = expr.replace( str , strEsear);
        }
    }
    let solution = getSolution(expr);

    return solution;
}

function getSolution(arrayTime){

    let arrayN = arrayTime.match(/Q-\d+\.*\d*|\d+\.*\d*/g);
    let arrayP = arrayTime.split(/Q-\d+\.*\d*|\d+\.*\d*/g);
    arrayP = arrayP.join().replace(/,/g,'').split('');

    for(let i=0;i<arrayN.length;i++) {
     if(arrayN[i].indexOf("Q")!=-1){
         arrayN[i] = arrayN[i].replace(/Q/,'');
     }
  }

    while(arrayP.indexOf("*")!=-1||arrayP.indexOf("/")!=-1) {
        for (let i = 0; i < arrayP.length; i++) {
            if (arrayP[i] == "/") {
                if(arrayN[i+1]!="0"){
                    arrayN[i] = Number(arrayN[i]) / Number(arrayN[i + 1]);
                    arrayN.splice(i + 1, 1);
                    arrayP.splice(i, 1);
                    i--;
                }
                else {
                    throw("TypeError: Division by zero.");
                    return;
                }

            } else if (arrayP[i] == "*") {
                arrayN[i] = Number(arrayN[i]) * Number(arrayN[i + 1]);
                arrayN.splice(i + 1, 1);
                arrayP.splice(i, 1);
                i--;
            }
        }
    }
    arrayP.forEach(function (element) {
        if (element == "-") {
            arrayN[0] = Number(arrayN[0]) - Number(arrayN[1]);
            arrayN.splice(1, 1);
        } else if (element == "+") {
            arrayN[0] = Number(arrayN[0]) + Number(arrayN[1]);
            arrayN.splice(1, 1);
        }
    });

    return arrayN[0];
}

module.exports = {
    expressionCalculator
}