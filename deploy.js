const fs = require('fs');
const axios = require('axios');

function deploy_file(filepath, id) {
	const data = fs.readFileSync(filepath).toString();
   var postData = {'body' : data};

// const AIDBOX_URL = 'http://localhost:8765';
const AIDBOX_URL = 'https://fhirquiz.edge.aidbox.app';

axios.put(
	AIDBOX_URL + '/Static/' + id,
    postData,
    {headers: {"content-type": "application/json"}})
.then(data => console.log(id + " deployed"));
}

deploy_file('target/main.js', "main.js");
deploy_file('target/main.css', "main.css");
deploy_file('build/manifest.json', "manifest.json");
