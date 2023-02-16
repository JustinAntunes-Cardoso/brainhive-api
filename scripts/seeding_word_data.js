const { open } = require('node:fs/promises');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const { getDefinition } = require('./dictionary');

// const fileEasy = './seed_data/SpellingOneBee.json';
const fileMedium = './seed_data/SpellingTwoBee.json';
//const fileHard = './seed_data/SpellingThreeBee.json';

const toJSON = (wordInfo, file) => {
	fs.readFile(file, 'utf-8', (err, data) => {
		if (err) throw err;

		let jsonData = JSON.parse(data);
		jsonData = [...jsonData, wordInfo];

		fs.writeFile(file, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
			if (err) throw err;
			console.log('Data was appended to file');
		});
	});
};

//read word from file
const getWordsFromTextFile = async (path, level) => {
	try {
		const textFile = await open(path);
		const words = [];

		for await (const line of textFile.readLines()) words.push(line);

		for (let i = 0; i < words.length; i++) {
			setTimeout(() => {
				try {
					getDefinition(words[i]).then((data) => {
						if (data !== undefined) {
							data = { id: uuid(), ...data, level: level };
							toJSON(data, fileMedium);
						}
					});
				} catch (error) {
					console.error('Not found: ', error);
				}
			}, 2000 * (i + 1));
		}
	} catch (error) {
		console.error('Cannot Read File: ', error);
		return [];
	}
};

//getWordsFromTextFile('./text_files/WordsOfTheChampsOneBee.txt', 'Easy');
getWordsFromTextFile('./text_files/WordsOfTheChampsTwoBee.txt', 'Medium');
//getWordsFromTextFile('./text_files/WordsOfTheChampsThreeBee.txt', 'Hard');

module.exports = { getWordsFromTextFile };
