import urllib2, json, pymongo
from bs4 import BeautifulSoup

root = "https://creator.zohopublic.com/srm_university/attendance-2015-16/view-perma/Student_Status/H2rQs63qk22E9xdk1PAnBnNqzuFfgZMtD9yN5RkfuA7V6RsCdOfxxXeXjud80upTEZgQxjPJR3b0ffxU49rYOSr7fpaa9g1hRZmd/studentID="
studentID = 2727643000005459007
mongoURI = "mongodb://127.0.0.1:27017/zoho"

url = root + str(studentID)

connected = False
try: 
	con = pymongo.Connect(host=mongoURI, port=27017)
	db = con['zoho']
	connected = True
except: 
	print "[Error] Cannot connect with mongodb."


while True and connected:
	soup = BeautifulSoup(urllib2.urlopen(root + str(studentID)).read())
	table = soup.find_all('table')
	student = {}

	# For the credential of the student
	indexer = 1
	keyDict = {"Program/Dept": "dept", "Name of the Student": "name", "Registration Number": "_id"}
	for td in table[0].find_all('td')[2:14]:
		if indexer % 4 == 0:
			indexer = 1
			student[key] = val

		if indexer == 1:
			key = keyDict[td.get_text()]
		elif indexer == 3:
			val = td.get_text()
		
		indexer = indexer + 1

	if student['dept'] != "B.Tech Computer Science and Engineering":
		break

	indexer = 1
	student['course'] = {}
	tableCol = {2: "tile", 3: "faculty", 4: "ct1", 5: "ct2", 6: "qat", 7: "st", 8: "mt", 9: "pt", 10: "attendance", 11: "internal"}
	for td in table[0].find_all('td')[25:-5]:
		if indexer % 12 == 0:
			indexer = 1

		if indexer == 1:
			sCode = td.get_text()
			student['course'][sCode] = {}
		elif td.get_text() != "":
			student['course'][sCode][tableCol[indexer]] = td.get_text()

		indexer = indexer + 1
	print "[Success] Scrapped " + student["Name of the Student"]

	db.main.insert(student)
	studentID = studentID + 4



