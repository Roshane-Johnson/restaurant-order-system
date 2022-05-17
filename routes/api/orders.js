const express = require('express')
const router = express.Router()
const DB = require('../../lib/db')

/**
 * Orders endpoint
 */
router.get('/', (req, res) => {
	DB.query(`SELECT * FROM orders;`, (err, rows) => {
		if (err) throw err

		res.render('orders', { layout: 'layouts/layout', page_title: 'Orders' })
	})
})

module.exports = router
