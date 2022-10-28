let i = Math.random();
let calcCount = 0

function timedCount() {
    i += 1;
    calcCount ++
    for (let v = 0; v < 1000 * 1000 * 100; v++) {
        i =
            Math.pow(Math.atan(i) * Math.tan(i), 8) /
            Math.pow(Math.cos(i) * Math.tan(i), 6);
    }

    postMessage(calcCount);
    setTimeout("timedCount()", 0);
}

timedCount();
