const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const DB = require('../../lib/db')
const { SuccessResponse, ErrorResponse } = require('../../lib/helpers')

const db_name = process.env.DB_NAME || 'order_ms'
const users_tbl = `${db_name}.users`

/**
 * Admin create endpoint
 */
router.post('/create', (req, res) => {
	const passwd = bcrypt.hashSync(req.body.password, 10)

	let data = {
		username: req.body.username,
		email: req.body.email,
		password: passwd,
		role_id: 1,
		is_active: 1,
	}

	DB.query(`INSERT INTO ${users_tbl} SET ?;`, data, (err, results) => {
		if (err) {
			if (err.errno === 1062) {
				req.flash('error', 'email already exists')
				console.log(req.session)
				return res.redirect('/admin/create')
			} else throw err
		}

		req.flash('success', 'signup successful')
		return res.redirect('/admin/create')
	})
})

/**
 * Admin login endpoints
 */
router.post('/login', (req, res) => {
	const [email, password] = [req.body.email.trim(), req.body.password.trim()]

	DB.query(`SELECT * FROM ${users_tbl} WHERE email = ?;`, [email], (err, rows) => {
		if (err) throw err

		if (rows.length <= 0) return ErrorResponse(res, `no admin with ${email ?? 'that email'} found`)

		if (bcrypt.compareSync(password, rows[0].password)) {
			req.session.loggedIn = true
			return res.redirect('/admin')
		} else {
			req.session.loggedIn = false
			return res.redirect('/login')
		}
	})
})

module.exports = router
