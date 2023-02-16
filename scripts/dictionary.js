const axios = require('axios');

async function getDefinition(word) {
	const app_id = '74dd4ba1';
	const app_key = 'dcf385fd5faf9ad372ae9bfd19dd45e2';
	const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`;

	try {
		//Access Oxford Dictionaries API 
		const { data } = await axios.get(url, {
			headers: {
				app_id: app_id,
				app_key: app_key,
			},
		});
		//Obtains the word, definition, audio, phonetics and etymology from the API
		return (wordInfo = {
			word: data.results[0].word,
			phonetics:
				data.results[0].lexicalEntries[0].entries[0].pronunciations[0]
					.phoneticSpelling,
			audio:
				data.results[0].lexicalEntries[0].entries[0].pronunciations[0]
					.audioFile,
			definition:
				data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],
			etymology: data.results[0].lexicalEntries[0].entries[0].etymologies[0],
		});
	} catch (error) {
		console.error(
			error.response !== undefined ? error.response.data.error : 'Error',
			`for ${word}`
		);
	}
}

module.exports = { getDefinition };
