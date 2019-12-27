'use strict'

const create = require('synchronous-autocomplete')
const tokenize = require('vbb-tokenize-station')

const tokens = require('../indices/tokens.json')
const scores = require('../indices/scores.json')
const weights = require('../indices/weights.json')
const nrOfTokens = require('../indices/nr-of-tokens.json')
const originalIds = require('../indices/original-ids.json')

const autocompleteWithOptions = create(tokens, scores, weights, nrOfTokens, originalIds, tokenize)
const autocomplete = (text, results) => {
	// @todo: make this less hacky, replaces 0 with spaces
	const formattedText = text.split('0').join(' ')

	// always set fuzzy: true, completion: true
	return autocompleteWithOptions(formattedText, results, true, true)
}

module.exports = autocomplete
