const express = require('express');
const fs = require('fs/promises')
const Container = require('../../Container');

const router = express.Router();
const products = new Container('data.json');

const assignId = async () => {
	await products.assignId();
}

// routes

router.get('/', async (req, res) => {
	try {
		await assignId();
		res.json(await products.getAll());
	} catch (error) {
		console.log(error)
	}
})

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const foundItem = await products.getById(id);
		if (foundItem) {
			res.json(foundItem);
		} else {
			res.json({ error: 'Producto no encontrado.' })
		}
	} catch (error) {
		console.log(error);
	}
})

router.post('/', async (req, res) => {
	const { title, price, thumbnail } = req.body;
	if (!title || !price || !thumbnail) {
		return res.status(400).json({ success: false, error: 'Wrong body format' });
	}
	try {
		const newProduct = {
			title,
			price: +price,
			thumbnail
		}
		await products.save(newProduct);
		res.json(newProduct);
	} catch (error) {
		console.log(error)
	}
})

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	if (await products.getById(id)) {
		const { title, price, thumbnail } = req.body;
		if (!title || !price || !thumbnail) {
			return res.status(400).json({ success: false, error: 'Wrong body format' });
		}
		try {
			const newProduct = {
				title,
				price: +price,
				thumbnail
			}
			await products.save(newProduct);
			res.json(newProduct);
			await products.deleteById(id);
		}
		catch (error) {
			console.log(error)
		}
	} else {
		res.json({ error: "Item not found." })
	}

})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const foundProduct = await products.getById(id);
		products.deleteById(id);
		res.json(foundProduct);
	}
	catch (error) {
		console.log(error);
	}
})

module.exports = router;