import urllib2, json, pymongo
from bs4 import BeautifulSoup

root = "https://creator.zohopublic.com/srm_university/attendance-2015-16/view-perma/Student_Status/H2rQs63qk22E9xdk1PAnBnNqzuFfgZMtD9yN5RkfuA7V6RsCdOfxxXeXjud80upTEZgQxjPJR3b0ffxU49rYOSr7fpaa9g1hRZmd/studentID="
studentID = 2727643000005459007
mongoURI = "mongodb://127.0.0.1:27017/zoho"

url = root + str(studentID)

connected = False
try:
	con = pymongo.MongoClient(host=mongoURI, port=27017)
	db = con['zoho']
	connected = True
except:
	print "[Error] Cannot connect with mongodb."
errorLogger = open('errLog.txt', 'a')

while True and connected:
	try:
		soup = BeautifulSoup(urllib2.urlopen(root + str(studentID)).read())
		table = soup.find_all('table')
		student = {}

		# For the credential of the student
		indexer = 1
		keyDict = {"Program/Dept": "dept", "Name of the Student": "name", "Registration Number": "_id", "Semester": "semester"}
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
		tableCol = {2: "title", 3: "faculty", 4: "ct1", 5: "ct2", 6: "qat", 7: "st", 8: "mt", 9: "pt", 10: "attendance", 11: "internal"}
		for td in table[0].find_all('td')[25:-5]:
			if indexer % 12 == 0:
				indexer = 1

			if indexer == 1:
				sCode = td.get_text()
				if sCode == '':
					continue
				student['course'][sCode] = {}
			elif td.get_text() != "":
				if (td.get_text() == '-') or (indexer == 2) or (indexer == 3):
					student['course'][sCode][tableCol[indexer]] = td.get_text()
				elif indexer == 10:
					student['course'][sCode][tableCol[indexer]] = float(td.get_text()[:-1])
				else:
					student['course'][sCode][tableCol[indexer]] = float(td.get_text())
			indexer = indexer + 1
		print "[Success] Scrapped " + student["name"] + " studentID= " + str(studentID)

		db.main.insert(student)
	except:
		print "[Error] Cannot scrap studentID: " + str(studentID)
		errorLogger.write("{\"studentID\": "+ str(studentID) +"}\n")
		
	studentID = studentID + 4
