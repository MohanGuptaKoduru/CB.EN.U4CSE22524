// question1/index.js
const express = require('express');
const cors = require('cors'); 
const app = express();
const stockRoutes = require('./routes/stockRoutes');

app.use(cors()); 




app.use(express.json());

app.use('/stocks', stockRoutes);
app.use('/stockcorrelation', stockRoutes);


const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
