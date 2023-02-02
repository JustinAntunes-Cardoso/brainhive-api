const axios = require('axios');

async function getDefinition(word) {
	const app_id = '07e94716';
	const app_key = '74cbfce53979d0731c95af98f0085f40';
	const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`;

	try {
		const { data } = await axios.get(url, {
			headers: {
				app_id: app_id,
				app_key: app_key,
			},
		});
		// take out brackets and word use kingdom
		//Check for errors
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
