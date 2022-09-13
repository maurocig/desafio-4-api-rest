const express = require('express');
// const fs = require('fs');
const fs = require('fs/promises');
const appRouters = require('./routers/app.routers');
const data = 'data.json';


const app = express();

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use('/', appRouters);

// routes


const getProducts = async () => {
	try {
		const file = await fs.readFile(data, 'utf-8');
		const products = JSON.parse(file);
		return products;
	}
	catch (error) {
		console.log(error)
	}
}

// routes
app.get('/', async (req, res, next) => {
	res.json(await getProducts());
})

const connectedServer = app.listen(PORT, () => {
	console.log(`Server up and running on port ${PORT}`);
})
connectedServer.on('error', (error) => {
	console.error(error);
})

