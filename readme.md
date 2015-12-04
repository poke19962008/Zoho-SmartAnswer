# Smart Internal Checker

Search engine for checking your internal marks for SRMites. It includes complex query analysis like 'What is my attendance marks in micro??'. It is cuurently available for only CSE students. Entire database has been made by crawling [Zoho](https://creator.zohopublic.com/srm_university/attendance-2015-16/view-perma/Student_Status/H2rQs63qk22E9xdk1PAnBnNqzuFfgZMtD9yN5RkfuA7V6RsCdOfxxXeXjud80upTEZgQxjPJR3b0ffxU49rYOSr7fpaa9g1hRZmd/studentID=2727643000005460843) on MongoDB.

![image] (https://raw.githubusercontent.com/poke19962008/Zoho-SmartAnswer/master/git-res/s1.png)

## How to run

### Setting up MongoDB

Delete the lock file present in `./data`. And run:

```
$ sudo mongod --dbpath ./data
```

### Setting up node servers

This will start the servers on `http://localhost:3000`


```
$ node index.js
```

## Queries It Can Answer

Regexes of all the queries are stored inside `./routes/regexStore.js`.

### Score in one subject. 

-  How much i scored in dcf?
-  Score in dcf?

### Score in multiple subjects.

- How much i scored in dcf, oops and micro??
- My scores in dcf, oops and micro?

### Failed Subjects

- In how many subjects i failed?
- Subjects in which i failed?


### Overall Students Passed in One Subject

- How many students passed in maths?
- Overall students passed in maths?

### Overall Students Failed in One Subject

- How many students failed in electrical?
- Overall students failed in electrical?

### Marks of Other Student in All Subject

- overall performance of RA141100301048?
- complete scores of ra1411003010485

### Marks of other student in one subject

- What are the marks of ra1411003010485 in maths??
- How ra1411003010485 performed in maths??

### Compare with other students

- compare me with ra1411003010485
- Compare my performance with ra1411003010485

## Database Schema

```javascript
{
	_id: "RA1411003010***",
	name: "Sayan Das",
	dept: "B.tech Computer Science and Engineering",
	course: {
		MA1003: {
			title: String,
			faculty: "",
			ct1: Int,
			ct2: Int,
			qat: "-",
			st: Int,
			pt: Int,
			attendance: Int,
			internals: Int,
		},
 		EE1053: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },
 		PD1003: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },
 		CS1003: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },

		 CS1005: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },

 		CS1007: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },
 		CS1009: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },
		CS1033: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },
 		CS1031: {
                        title: String,
                        faculty: String,
                        ct1: Int,
                        ct2: Int,
                        qat: "-",
                        st: Int,
                        pt: Int,
                        attendance: Int,
                        internals: Int,
                },
	}
}
```


**NOTE:** This is available for only 2nd Year CSE students of SRM KTR Campus.


## LICENSE

Copyright © 2015 SAYAN DAS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
