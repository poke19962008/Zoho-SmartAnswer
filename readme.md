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


**NOTE:** This is available for only 2nd Year CSE students of SRM 
