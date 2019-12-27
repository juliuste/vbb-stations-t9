'use strict'

const tape = require('tape')
const get = require('lodash/get')

const search = require('./lib')
const textToT9 = require('./lib/text-to-t9')

tape('text to t9', async t => {
	t.equals(textToT9('Münchener Straße 61a'), '686243637 787273 612')
	t.end()
})

tape('t9 search', async t => {
	const parkRuhwaldResults = search(textToT9('Park0Ruhwald'))
	t.equals(get(parkRuhwaldResults, '[0].id'), '900000025253')

	const zooResults = search('966')
	t.equals(get(zooResults, '[0].id'), '900000023201')

	const alexResults = search(textToT9('Axelanderplatz'))
	t.equals(get(alexResults, '[0].id'), '900000100003')

	const platzDerLuftbrückeResults = search(textToT9('luftbrücke'))
	t.equals(get(platzDerLuftbrückeResults, '[0].id'), '900000017102')

	const karlBonhoefferResults = search(textToT9('karl-Bonhoeffer'))
	t.equals(karlBonhoefferResults.length, 1)
	t.equals(get(karlBonhoefferResults, '[0].id'), '900000096458')

	t.end()
})
