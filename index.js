const request = require('request');
const Twitter = require('twitter');

request('https://opendata-reunion.edf.fr/api/records/1.0/search/?dataset=prod-electricite-temps-reel&rows=1&sort=date&timezone=Indian%2FReunion'
, (error, response, body) => {
	if(error) {
		console.error(error)
		return;
	}
	if(!response || response.statusCode !== 200 ) {
		console.error(response, response.statusCode)
	}
	try {
		const { fields : { date, total, bagasse_charbon, biogaz, eolien, hydraulique, photovoltaique, photovoltaique_avec_stockage, thermique } } = JSON.parse(body).records[0]
		const time = new Date(date).toLocaleTimeString('fr-FR', { hour12: false })
		const enR = eolien + hydraulique + photovoltaique + photovoltaique_avec_stockage 
		const enF = bagasse_charbon + biogaz + thermique
		const txt = `Le saviez-vous ?
		\nLe "Mix Electrique" estimé de #LaRéunion est composé à ${time} :
		\n Energies renouvelables : ${(enR * 100 / total).toFixed(2)}% (${enR.toFixed(1)}MW)
		\n Energies fossiles :  ${(enF * 100 / total).toFixed(2)}% (${enF.toFixed(1)}MW)
		\n Source : https://opendata-reunion.edf.fr #EDF @EDF_Reunion #transitionénergétique`
		client = new Twitter({
			consumer_key: process.env.CONSUMER_KEY,
			consumer_secret: process.env.CONSUMER_SECRET,
			access_token_key: process.env.ACCESS_KEY,
  		access_token_secret: process.env.ACCESS_SECRET
		});
		client.post('statuses/update', { status: txt },  (error, tweet, response) => {
			if(error) throw error;
			console.info(tweet);  // Tweet body.
		});
	} catch (error) {
		console.error(error);
	}
});
