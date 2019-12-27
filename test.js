'use strict'

const tape = require('tape')

const boilerplate = require('.')

tape('boiler-plate', async t => {
	t.ok(boilerplate)
	t.end()
})
