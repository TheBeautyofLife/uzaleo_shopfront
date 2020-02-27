'use strict'

const express = require('express')
const DB = require('./db')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const db = new DB('sqlitedb')
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')

  next()
}

app.use(allowCrossDomain)

router.post('/register', function (req, res) {
  db.insert([
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    bcrypt.hashSync(req.body.password, 6)
  ],
  function (err) {
    if (err) return res.status(500).send('There was a problem registering the user.')
    db.selectByEmail(req.body.email, (err, user) => {
      if (err) return res.status(500).send('There was a problem getting user')
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token, user: user })
    })
  })
})

router.post('/register-admin', function (req, res) {
  db.insertAdmin([
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    bcrypt.hashSync(req.body.password, 6)
  ],
  function (err) {
    if (err) return res.status(500).send('There was a problem registering the user.')
    db.selectByEmail(req.body.email, (err, user) => {
      if (err) return res.status(500).send('There was a problem getting user')
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token, user: user })
    })
  })
})

router.get('/me', function (req, res) {
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

    res.status(200).send(decoded)
  })
})

router.post('/login', (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token, user: user })
  })
})

app.use(router)

const port = process.env.PORT || 3000

const server = app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
