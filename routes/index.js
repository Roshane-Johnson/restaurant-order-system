const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	// const categories = ['Breakfast', 'Lunch', 'Dinner']
	// const menuItems = [
	// 	{ name: 'Egg & Bread', type: categories[0] },
	// 	{ name: 'Rice & Peas', type: categories[2] },
	// 	{ name: 'Crackers & Chocolate', type: categories[0] },
	// 	{ name: 'Vegetable Mix', type: categories[1] },
	// 	{ name: 'Lasagna', type: categories[2] },
	// ]

	// categories.forEach((category) => {
	// 	console.log()
	// 	console.log(category)

	// 	menuItems.forEach((menuItem) => {
	// 		if (menuItem.type == category) {
	// 			console.log('- ', menuItem.name)
	// 		}
	// 	})
	// })

	res.render('index', { page_title: 'Home' })
})

module.exports = router
