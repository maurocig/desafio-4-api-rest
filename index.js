const express = require('express');
const appRouters = require('./routers/app.routers');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // permite parsear keys como objetos y arrays (ej. phone[number] | phone[ext] => phone: {number: '239487', ext: '293'})
app.use(express.static('public'));
app.use('/api', appRouters);

const connectedServer = app.listen(PORT, () => {
	console.log(`Server up and running on port ${PORT}`);
})
connectedServer.on('error', (error) => {
	console.error(error);
})

