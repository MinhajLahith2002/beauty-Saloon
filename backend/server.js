const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const { errorHandler, notFound} = require('./middlewares/errorMiddleware')


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const services = require('./routes/serviceRoutes');
const bookings =  require('./routes/bookingRoutes');

app.use('/api/v1', services);
app.use('/api/v1', bookings);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT , () =>  console.log(`Server listening on port: ${PORT}`));
