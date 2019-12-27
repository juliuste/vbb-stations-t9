'use strict'

// adaptation based on https://github.com/derhuerst/vbb-stations-autocomplete/blob/master/build.js

const fs = require('fs')
const path = require('path')
const cleanStationName = require('db-clean-station-name')
const tokenizeVbbStation = require('vbb-tokenize-station')
const stations = require('vbb-stations')
const aliases = require('vbb-common-places/stations')
const buildIndex = require('synchronous-autocomplete/build')
const textToT9 = require('../lib/text-to-t9')

const writeJSON = (file, data, cb) => {
	fs.writeFile(path.join(__dirname, file), JSON.stringify(data), err => {
		if (!err) return
		console.error(err.stack)
		process.exit(1)
	})
}

console.info('Collecting search items.')

const tokenize = name => tokenizeVbbStation(name).map(textToT9)

const items = stations('all').map((station) => ({
	id: station.id,
	name: cleanStationName(station.name),
	weight: station.weight
}))

for (const alias of Object.keys(aliases)) {
	const id = aliases[alias]

	const [station] = stations(id)
	if (!station) {
		console.error(`Alias "${alias}" for unknown station ${id}.`)
		continue
	}

	items.push({
		id: station.id,
		name: cleanStationName(alias),
		weight: Math.ceil(station.weight / 2)
	})
}

console.info('Computing a search index.')

const {
	tokens, scores, weights, nrOfTokens, originalIds
} = buildIndex(tokenize, items)

console.info('Writing the index to disk.')

writeJSON('../indices/original-ids.json', originalIds)
writeJSON('../indices/tokens.json', tokens)
writeJSON('../indices/scores.json', scores)
writeJSON('../indices/weights.json', weights)
writeJSON('../indices/nr-of-tokens.json', nrOfTokens)
