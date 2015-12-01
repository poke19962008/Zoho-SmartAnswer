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

  ```
 /((how much i )|(what(\'?s) my ))?(scored?|marks?|got)( in )?((math|maths|ma1003)|((electrical)|(electric)|(ee)|(eee)|ee1053)|((digital computer fundamentals)|dcf|d.c.f|d.c.f.|cs1003)|((object oriented programming)|oops?|o.o.p(.s)?(.)?)|((microprocessor and interfacing)|micro|microprocessor|cs1007)|((object oriented analysis and design)|ooad|oad|o.o.a.d.|o.o.a.d|o.a.d.|o.a.d|cs1009)|(((object oriented programming)|oops?|o.o.p(.s)?(.)?) (lab|laboratory)|cs1031)|(((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033))( ??)?$/g 
 ```

  ```
 /((how much i )|(what(\'?s) my ))?(scored?|marks?|got)( in)? (((((math|maths|ma1003)|((electrical)|(electric)|(ee)|(eee)|ee1053)|((digital computer fundamentals)|dcf|d.c.f|d.c.f.|cs1003)|((object oriented programming)|oops?|o.o.p(.s)?(.)?)|((microprocessor and interfacing)|micro|microprocessor|cs1007)|((object oriented analysis and design)|ooad|oad|o.o.a.d.|o.o.a.d|o.a.d.|o.a.d|cs1009)|(((object oriented programming)|oops?|o.o.p(.s)?(.)?) (lab|laboratory)|cs1031)|(((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033))( ?,? ?)){2,}( ?(and|&) ((math|maths|ma1003)|((electrical)|(electric)|(ee)|(eee)|ee1053)|((digital computer fundamentals)|dcf|d.c.f|d.c.f.|cs1003)|((object oriented programming)|oops?|o.o.p(.s)?(.)?)|((microprocessor and interfacing)|micro|microprocessor|cs1007)|((object oriented analysis and design)|ooad|oad|o.o.a.d.|o.o.a.d|o.a.d.|o.a.d|cs1009)|(((object oriented programming)|oops?|o.o.p(.s)?(.)?) (lab|laboratory)|cs1031)|(((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033)))?))|(((math|maths|ma1003)|((electrical)|(electric)|(ee)|(eee)|ee1053)|((digital computer fundamentals)|dcf|d.c.f|d.c.f.|cs1003)|((object oriented programming)|oops?|o.o.p(.s)?(.)?)|((microprocessor and interfacing)|micro|microprocessor|cs1007)|((object oriented analysis and design)|ooad|oad|o.o.a.d.|o.o.a.d|o.a.d.|o.a.d|cs1009)|(((object oriented programming)|oops?|o.o.p(.s)?(.)?) (lab|laboratory)|cs1031)|(((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033)) (and|&) ((math|maths|ma1003)|((electrical)|(electric)|(ee)|(eee)|ee1053)|((digital computer fundamentals)|dcf|d.c.f|d.c.f.|cs1003)|((object oriented programming)|oops?|o.o.p(.s)?(.)?)|((microprocessor and interfacing)|micro|microprocessor|cs1007)|((object oriented analysis and design)|ooad|oad|o.o.a.d.|o.o.a.d|o.a.d.|o.a.d|cs1009)|(((object oriented programming)|oops?|o.o.p(.s)?(.)?) (lab|laboratory)|cs1031)|(((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033)))/g 
 ```


 ```
 /((in)? (what|which|(how many)) )?(subjects?|courses?|subs?) ((i (have)?)|(i))? ((failed(ed)?)|(drop(p?ed)?))( ?\?)?$/g 
 ```

```
 ((how many )|overall |all ?)?( the ?)?students? pass(ed)? (in )?((math|maths|ma1003)|((electrical)|(electric)|(ee)|(eee)|ee1053)|((digital computer fundamentals)|dcf|d.c.f|d.c.f.|cs1003)|((object oriented programming)|oops?|o.o.p(.s)?(.)?)|((microprocessor and interfacing)|micro|microprocessor|cs1007)|((object oriented analysis and design)|ooad|oad|o.o.a.d.|o.o.a.d|o.a.d.|o.a.d|cs1009)|(((object oriented programming)|oops?|o.o.p(.s)?(.)?) (lab|laboratory)|cs1031)|(((microprocessor and interfacing)|micro|microprocessor) (lab|laboratory)|cs1033)) 
 ```

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
