import json, re, pymongo, os

try:
	con = pymongo.MongoClient(host="mongodb://127.0.0.1/zoho", port=27017)
	db = con['zoho']
except Exception, e:
	print "[ERROR] Cannot connect with Mongo"

data = {}

os.chdir('../')
log = open("queriesSearched.log").read()
for line in log.split('\n')[:-1]:
	id_ = re.search('(RA)(1411003010)[0-7][0-9]{2}', json.loads(line)['message']).group(0)
	name = db.main.find_one({'_id': id_}, {'name': True, '_id': False})['name']
	query = json.loads(line)['message'].split('query: ')[-1]
	
	if data.has_key(name):
		data[name].append(query)
	else:
		data[name] = []
		data[name].append(query)
print json.dumps(data, indent=2)
