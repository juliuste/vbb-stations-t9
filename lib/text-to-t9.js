'use strict'

const sortBy = require('lodash/sortBy')
const keypad = require('telephone-keypads/language-independent/latin.json')

const characterMap = new Map()
Object.keys(keypad).forEach(number => {
	keypad[number].forEach((character, index) => {
		const existing = characterMap.get(character) || []
		characterMap.set(character, [
			...existing,
			{ number, index }
		])
	})
})

Array.from(characterMap.keys()).forEach(key => {
	const values = characterMap.get(key)
	const sorted = sortBy(values, v => v.index)
	if (sorted.length < 1) throw new Error('expected to find at least one entry for this character')
	characterMap.set(key, sorted[0].number)
})

const textToT9 = text => text
	.split('')
	.map(character => character.toLowerCase())
	.map(character => characterMap.get(character) || character)
	.join('')

module.exports = textToT9
