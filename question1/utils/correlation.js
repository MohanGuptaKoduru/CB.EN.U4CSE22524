exports.calculateAverage = (data) => {
    const prices = data.map(d => d.price);
    return prices.reduce((a, b) => a + b, 0) / prices.length;
};

exports.calculateCorrelation = (data1, data2) => {
    const len = Math.min(data1.length, data2.length);
    const x = data1.slice(0, len).map(d => d.price);
    const y = data2.slice(0, len).map(d => d.price);

    const meanX = x.reduce((a, b) => a + b) / len;
    const meanY = y.reduce((a, b) => a + b) / len;

    let numerator = 0, denomX = 0, denomY = 0;

    for (let i = 0; i < len; i++) {
        const dx = x[i] - meanX;
        const dy = y[i] - meanY;
        numerator += dx * dy;
        denomX += dx * dx;
        denomY += dy * dy;
    }

    return numerator / Math.sqrt(denomX * denomY);
};
