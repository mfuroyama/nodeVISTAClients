# RPC Interface Clients

Example clients that show how to use the nodeVISTA RPC interface. Review equivalent clients in _services_ to see how much easier the services interface is.

These clients run on your __host__ machine (__not__ the nodeVISTA VM) and use _ES6 Promises_.

The first example client is _rpcProblemsClient.js_.

### Install Module Dependencies

__Note__: We assume that both _node_ and _npm_ are installed on your Machine.

Open a terminal window ...

```text
$ cd nodeVISTAClients/rpcClient
$ npm install
```

### Ensure the RPC Server is running
Please refer to https://github.com/vistadataproject/nodeVISTA/tree/master/rpcServer
```text
$ curl http://10.2.2.100:9010
```

### Execute the rpcProblemsClient.js script

```text
$ node rpcProblemsClient.js
```
The resulting response should be:

```text
TCP Connect Success

Setup Signon (XUS SIGNON SETUP) Success

Authenticate 'User Robert' (XUS AV CODE) Success

Get User Info (XUS GET USER INFO) Success - IEN of user with access/verify used to Authenticate is 62:
	62
	ALEXANDER,ROBERT
	Robert Alexander
	1^SOFTWARE SERVICE^050
	
	IRM
	
	300
	
	
 


Create Context (XWB CREATE CONTEXT) <OR CPRS GUI CHART> Success

Select Patient (ORWPT SELECT) Success - name of patient with IEN '25' is CARTER,DAVID:
	CARTER,DAVID^M^2810302^000000113^^^^^0^^0^0^^^36^0
 


Create Problem (ORQQPL ADD SAVE) Success - but see how complicated the arguments were:
	{"key":"1","value":"GMPFLD(.01)=\"521774^R69.\""}
	{"key":"2","value":"GMPFLD(.03)=\"0^\""}
	{"key":"3","value":"GMPFLD(.05)=\"^Diabetes mellitus\""}
	{"key":"4","value":"GMPFLD(.08)=\"3170316\""}
	{"key":"5","value":"GMPFLD(.12)=\"A^ACTIVE\""}
	{"key":"6","value":"GMPFLD(.13)=\"^\""}
	{"key":"7","value":"GMPFLD(1.01)=\"7130783^\""}
	{"key":"8","value":"GMPFLD(1.02)=\"P\""}
	{"key":"9","value":"GMPFLD(1.03)=\"62^ALEXANDER,ROBERT\""}
	{"key":"10","value":"GMPFLD(1.04)=\"62^ALEXANDER,ROBERT\""}
	{"key":"11","value":"GMPFLD(1.05)=\"62^ALEXANDER,ROBERT\""}
	{"key":"12","value":"GMPFLD(1.06)=\"^\""}
	{"key":"13","value":"GMPFLD(1.07)=\"^\""}
	{"key":"14","value":"GMPFLD(1.08)=\"3^VISTA HEALTH CARE\""}
	{"key":"15","value":"GMPFLD(1.09)=\"3170316\""}
	{"key":"16","value":"GMPFLD(1.1)=\"^Unknown\""}
	{"key":"17","value":"GMPFLD(1.11)=\"0^NO\""}
	{"key":"18","value":"GMPFLD(1.12)=\"0^NO\""}
	{"key":"19","value":"GMPFLD(1.13)=\"0^NO\""}
	{"key":"20","value":"GMPFLD(1.14)=\"@^\""}
	{"key":"21","value":"GMPFLD(1.15)=\"0^NO\""}
	{"key":"22","value":"GMPFLD(1.16)=\"0^NO\""}
	{"key":"23","value":"GMPFLD(1.17)=\"0^NO\""}
	{"key":"24","value":"GMPFLD(1.18)=\"0^NO\""}
	{"key":"25","value":"GMPFLD(80001)=\"73211009\""}
	{"key":"26","value":"GMPFLD(80002)=\"121589010\""}
	{"key":"27","value":"GMPFLD(80101)=\"^\""}
	{"key":"28","value":"GMPFLD(80102)=\"^\""}
	{"key":"29","value":"GMPFLD(80201)=\"3170316\""}
	{"key":"30","value":"GMPFLD(80202)=\"10D^ICD-10-CM\""}
	{"key":"31","value":"GMPFLD(10,0)=\"0\""}
 

Get Problem Detail (ORQQPL DETAIL) Success:
	Diabetes mellitus (SCT 73211009)
	         SNOMED-CT: Diabetes mellitus
	 Primary ICD-10-CM: R69.   [ILLNESS, UNSPECIFIED]
	 
	        Onset: 
	       Status: ACTIVE
	      SC Cond: UNKNOWN
	     Exposure: None
	 
	     Provider: ALEXANDER,ROBERT
	       Clinic: VISTA HEALTH CARE
	 
	     Recorded: 3/29/17, by ALEXANDER,ROBERT
	      Entered: 3/29/17, by ALEXANDER,ROBERT
	      Updated: 3/29/17
	 
	 
	
 

Update Problem (ORQQPL EDIT SAVE) Success - setting problem to INACTIVE (I) means resetting every property in the problem!:
	{"key":"1","value":"GMPFLD(.01)=\"521774^R69.\""}
	{"key":"2","value":"GMPFLD(.03)=\"0^\""}
	{"key":"3","value":"GMPFLD(.05)=\"^Diabetes mellitus\""}
	{"key":"4","value":"GMPFLD(.08)=\"3170316\""}
	{"key":"5","value":"GMPFLD(.12)=\"I^INACTIVE\""}
	{"key":"6","value":"GMPFLD(.13)=\"^\""}
	{"key":"7","value":"GMPFLD(1.01)=\"7130783^\""}
	{"key":"8","value":"GMPFLD(1.02)=\"P\""}
	{"key":"9","value":"GMPFLD(1.03)=\"62^ALEXANDER,ROBERT\""}
	{"key":"10","value":"GMPFLD(1.04)=\"62^ALEXANDER,ROBERT\""}
	{"key":"11","value":"GMPFLD(1.05)=\"62^ALEXANDER,ROBERT\""}
	{"key":"12","value":"GMPFLD(1.06)=\"^\""}
	{"key":"13","value":"GMPFLD(1.07)=\"^\""}
	{"key":"14","value":"GMPFLD(1.08)=\"3^VISTA HEALTH CARE\""}
	{"key":"15","value":"GMPFLD(1.09)=\"3170316\""}
	{"key":"16","value":"GMPFLD(1.1)=\"^Unknown\""}
	{"key":"17","value":"GMPFLD(1.11)=\"0^NO\""}
	{"key":"18","value":"GMPFLD(1.12)=\"0^NO\""}
	{"key":"19","value":"GMPFLD(1.13)=\"0^NO\""}
	{"key":"20","value":"GMPFLD(1.14)=\"@^\""}
	{"key":"21","value":"GMPFLD(1.15)=\"0^NO\""}
	{"key":"22","value":"GMPFLD(1.16)=\"0^NO\""}
	{"key":"23","value":"GMPFLD(1.17)=\"0^NO\""}
	{"key":"24","value":"GMPFLD(1.18)=\"0^NO\""}
	{"key":"25","value":"GMPFLD(80001)=\"73211009\""}
	{"key":"26","value":"GMPFLD(80002)=\"121589010\""}
	{"key":"27","value":"GMPFLD(80101)=\"^\""}
	{"key":"28","value":"GMPFLD(80102)=\"^\""}
	{"key":"29","value":"GMPFLD(80201)=\"3170316\""}
	{"key":"30","value":"GMPFLD(80202)=\"10D^ICD-10-CM\""}
	{"key":"31","value":"GMPFLD(10,0)=\"0\""}
	{"key":"32","value":"GMPORIG(.01)=\"521774^R69.\""}
	{"key":"33","value":"GMPORIG(.03)=\"0^\""}
	{"key":"34","value":"GMPORIG(.05)=\"^Diabetes mellitus\""}
	{"key":"35","value":"GMPORIG(.08)=\"3170316\""}
	{"key":"36","value":"GMPORIG(.12)=\"A^ACTIVE\""}
	{"key":"37","value":"GMPORIG(.13)=\"^\""}
	{"key":"38","value":"GMPORIG(1.01)=\"7130783^\""}
	{"key":"39","value":"GMPORIG(1.02)=\"P\""}
	{"key":"40","value":"GMPORIG(1.03)=\"62^ALEXANDER,ROBERT\""}
	{"key":"41","value":"GMPORIG(1.04)=\"62^ALEXANDER,ROBERT\""}
	{"key":"42","value":"GMPORIG(1.05)=\"62^ALEXANDER,ROBERT\""}
	{"key":"43","value":"GMPORIG(1.06)=\"^\""}
	{"key":"44","value":"GMPORIG(1.07)=\"^\""}
	{"key":"45","value":"GMPORIG(1.08)=\"3^VISTA HEALTH CARE\""}
	{"key":"46","value":"GMPORIG(1.09)=\"3170316\""}
	{"key":"47","value":"GMPORIG(1.1)=\"^Unknown\""}
	{"key":"48","value":"GMPORIG(1.11)=\"0^NO\""}
	{"key":"49","value":"GMPORIG(1.12)=\"0^NO\""}
	{"key":"50","value":"GMPORIG(1.13)=\"0^NO\""}
	{"key":"51","value":"GMPORIG(1.14)=\"@^\""}
	{"key":"52","value":"GMPORIG(1.15)=\"0^NO\""}
	{"key":"53","value":"GMPORIG(1.16)=\"0^NO\""}
	{"key":"54","value":"GMPORIG(1.17)=\"0^NO\""}
	{"key":"55","value":"GMPORIG(1.18)=\"0^NO\""}
	{"key":"56","value":"GMPORIG(10,0)=\"0^\""}
	{"key":"57","value":"GMPORIG(80001)=\"73211009\""}
	{"key":"58","value":"GMPORIG(80002)=\"121589010\""}
	{"key":"59","value":"GMPORIG(80101)=\"^\""}
	{"key":"60","value":"GMPORIG(80102)=\"^\""}
	{"key":"61","value":"GMPORIG(80201)=\"3170316\""}
	{"key":"62","value":"GMPORIG(80202)=\"10D^ICD-10-CM\""}
 

Get Problem Detail (ORQQPL DETAIL) Success. Notice that the update created an audit: 
	Diabetes mellitus (SCT 73211009)
	         SNOMED-CT: Diabetes mellitus
	 Primary ICD-10-CM: R69.   [ILLNESS, UNSPECIFIED]
	 
	        Onset: 
	       Status: INACTIVE
	      SC Cond: UNKNOWN
	     Exposure: None
	 
	     Provider: ALEXANDER,ROBERT
	       Clinic: VISTA HEALTH CARE
	 
	     Recorded: 3/29/17, by ALEXANDER,ROBERT
	      Entered: 3/29/17, by ALEXANDER,ROBERT
	      Updated: 3/29/17
	 
	----------- Audit History -----------
	3/29/17: STATUS changed by ALEXANDER,ROBERT from ACTIVE to INACTIVE
	
 

List Problems (ORQQPL PROBLEM LIST) Success - notice 'I' for INACTIVE due to UPDATE:
	1
	1^I^Diabetes mellitus (SCT 73211009)^R69.^^00329^^^P^3;VISTA HEALTH CARE^C^62;ALEXANDER,ROBERT^^^0^3170316^^^^10D
	
 

#BYE#
```
