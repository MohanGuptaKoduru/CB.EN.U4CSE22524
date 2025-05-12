#q1 stock average & correlation microservices

##How to run

```bash
cd question1
npm install
node index.js
```
Server runs at http://localhost:8000

### Average Stock Price
GET /stocks/NVDA?minutes=30&aggregation=average


### Correlation Between Two Stocks

GET /stockcorrelation?minutes=m&ticker=NVDA&ticker=PYPL

screenshots are presnt in the screenshots folder
