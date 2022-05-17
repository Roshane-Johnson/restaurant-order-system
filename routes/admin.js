const express = require('express')
const router = express.Router()
const DB = require('../lib/db')

/**
 * Admin index view
 */
router.get('/', (req, res) => {
	if (req.session.loggedIn === true) {
		DB.query(`SELECT * FROM orders;`, (err, rows) => {
			if (err) throw err

			return res.render('admin/index', { layout: 'layouts/admin', page_title: 'Admin Dashboard', orders: rows })
		})
	} else {
		return res.redirect('/admin/login')
	}
})

/**
 * Admin create view
 */
router.get('/create', (req, res) => {
	res.render('admin/create', { layout: 'layouts/layout', page_title: 'Admin Create', email: '', username: '' })
})

/**
 * Admin login view
 */
router.get('/login', (req, res) => {
	res.render('admin/login', { layout: 'layouts/layout', page_title: 'Admin Login' })
})

/**
 * Admin logout
 */
router.get('/logout', (req, res) => {
	req.session.destroy()
	return res.redirect('/')
})
module.exports = router
