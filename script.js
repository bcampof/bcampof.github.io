document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculate");
    const nInput = document.getElementById("n");
    const pInput = document.getElementById("p");
    const xInput = document.getElementById("x");
    const resultSpan = document.getElementById("result");
    const calculateButton1 = document.getElementById("calculate1");
    const dataInput = document.getElementById("data");
    const meanSpan = document.getElementById("mean");
    const medianSpan = document.getElementById("median");
    const modeSpan = document.getElementById("mode");
    const calculateButton2 = document.getElementById("calculate2");
    const pInput2 = document.getElementById("pe");
    const xInput2 = document.getElementById("xs");
    const resultSpan2 = document.getElementById("result2");
    const calculateButton3 = document.getElementById("calculate3");
    const dataInput2 = document.getElementById("dataa");
    const varianceSpan = document.getElementById("variance");
    const stdDeviationSpan = document.getElementById("stdDeviation");

    calculateButton.addEventListener("click", function() {
        const n = parseInt(nInput.value);
        const p = parseFloat(pInput.value);
        const x = parseInt(xInput.value);

        if (n >= 0 && x >= 0 && p >= 0 && p <= 1) {
            const binomialProbability = calculateBinomialProbability(n, p, x);
            resultSpan.textContent = `P(X = ${x}) = ${binomialProbability.toFixed(4)}`;
        } else {
            resultSpan.textContent = "Por favor, ingrese valores válidos.";
        }
    });

    function calculateBinomialProbability(n, p, x) {
        const q = 1 - p;
        const binomialCoefficient = calculateBinomialCoefficient(n, x);
        const probability = binomialCoefficient * Math.pow(p, x) * Math.pow(q, n - x);
        return probability;
    }

    function calculateBinomialCoefficient(n, k) {
        if (k === 0) {
            return 1;
        }
        return (calculateBinomialCoefficient(n, k - 1) * (n - k + 1)) / k;
    }

    calculateButton1.addEventListener("click", function() {
        const data = dataInput.value
            .split(',')
            .map(val => parseFloat(val.trim()))
            .filter(val => !isNaN(val));

        if (data.length > 0) {
            const mean = calculateMean(data);
            const median = calculateMedian(data);
            const mode = calculateMode(data);

            meanSpan.textContent = `Media: ${mean.toFixed(2)}`;
            medianSpan.textContent = `Mediana: ${median.toFixed(2)}`;
            modeSpan.textContent = `Moda: ${mode}`;
        } else {
            meanSpan.textContent = "No se ingresaron datos válidos.";
            medianSpan.textContent = "";
            modeSpan.textContent = "";
        }
    });

    function calculateMean(data) {
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / data.length;
    }

    function calculateMedian(data) {
        const sortedData = data.sort((a, b) => a - b);
        const middle = Math.floor(data.length / 2);
        if (data.length % 2 === 0) {
            return (sortedData[middle - 1] + sortedData[middle]) / 2;
        } else {
            return sortedData[middle];
        }
    }

    function calculateMode(data) {
        const counts = {};
        let maxCount = 0;
        let mode = [];

        data.forEach(val => {
            if (counts[val] === undefined) {
                counts[val] = 0;
            }
            counts[val]++;
            if (counts[val] > maxCount) {
                maxCount = counts[val];
                mode = [val];
            } else if (counts[val] === maxCount && !mode.includes(val)) {
                mode.push(val);
            }
        });

        return mode.join(', ');
    }

    calculateButton2.addEventListener("click", function() {
        const pe = parseFloat(pInput2.value);
        const xs = parseInt(xInput2.value);

        if (pe >= 0 && pe <= 1 && xs >= 0 && xs <= 1) {
            const bernoulliProbability = calculateBernoulliProbability(pe, xs);
            resultSpan2.textContent = `P(X = ${xs}) = ${bernoulliProbability.toFixed(4)}`;
        } else {
            resultSpan2.textContent = "Por favor, ingrese valores válidos.";
        }
    });

    function calculateBernoulliProbability(pe, xs) {
        if (xs === 1) {
            return pe;
        } else if (xs === 0) {
            return 1 - pe;
        }
        return 0;
    }

    calculateButton3.addEventListener("click", function() {
        const dataa = dataInput2.value
            .split(',')
            .map(val => parseFloat(val.trim()))
            .filter(val => !isNaN(val));

        if (dataa.length > 1) {
            const variance = calculateVariance(dataa);
            const stdDeviation = Math.sqrt(variance);

            varianceSpan.textContent = `Varianza: ${variance.toFixed(4)}`;
            stdDeviationSpan.textContent = `Desviacion estandar: ${stdDeviation.toFixed(4)}`;
        } else {
            varianceSpan.textContent = "Se requieren al menos dos datos validos.";
            stdDeviationSpan.textContent = "";
        }
    });

    function calculateVariance(dataa) {
        const mean = dataa.reduce((acc, val) => acc + val, 0) / dataa.length;
        const squaredDifferences = dataa.map(val => Math.pow(val - mean, 2));
        const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / (dataa.length - 1);
        return variance;
    }

});
