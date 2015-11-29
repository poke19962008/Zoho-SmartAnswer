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

## Database Schema

```javascript
{
	_id: "RA1411003010***",
	name: "Sayan Das",
	dept: "B.tech Computer Science and Engineering",
	course: {
		MA1003: {
			title: "",
			faculty: "",
			ct1: "",
			ct2: "",
			qat: "",
			st: "",
			pt: "",
			attendance: "",
			internals: "",
		},
 		EE1053: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
                },
 		PD1003: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
                },
 		CS1003: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
                },

		 CS1005: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
                },

 		CS1007: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
                },
 		CS1009: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
                },
		CS1033: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
                },
 		CS1031: {
                        title: "",
                        faculty: "",
                        ct1: "",
                        ct2: "",
                        qat: "",
                        st: "",
                        pt: "",
                        attendance: "",
                        internals: "",
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
