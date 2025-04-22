function fibonacciSeries(n) {
    const series = [];
    let a = 0, b = 1;

    for (let i = 0; i < n; i++) {
        series.push(a);
        const next = a + b;
        a = b;
        b = next;
    }

    return series;
}

const primerosDiezFibonacci = fibonacciSeries(10);
console.log("Los primeros 10 números de la serie de Fibonacci son:", primerosDiezFibonacci);