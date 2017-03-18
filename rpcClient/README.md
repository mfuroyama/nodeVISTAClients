# RPC Interface Clients

Example rpcProblemsClient.js clients that show how to use the nodeVISTA problem RPC service interface.

These clients run on your __host__ machine (__not__ the nodeVISTA VM) and use _ES6 Promises_.

### Install Module Dependencies

__Note__: We assume that both _node_ and _npm_ are installed on your Machine.

Open a terminal on your host machine.

```text
$ cd nodeVISTAClients/rpcClient
$ npm install
```

### Start  the RPC Server
SSH into the __nodeVISTA__ guest virtual machine
```text
$ ssh vagrant@10.2.2.100
$ password: vagrant
$ su vdp -l
$ Password: vdp
$ cd nodevista
$ git pull
$ cd rpcServer
$ npm install
$ node rpcServer.js
{"name":"rpcServer","hostname":"addgene-ubuntu-1604-vbox","pid":17213,"level":30,
    "msg":"Capture file ./log/capture.txt opened for writing","time":"2017-03-18T03:16:57.504Z","v":0}
```

### Ensure the RPC Server is running (to be edited)
Install CPRS by following the instructions "CPRS / RPC Server Installation" provided at http://vistadataproject.info/demo/
On the host terminal:
```text
$ cd nodeVISTAClients/rpcClient
$ curl http://10.2.2.100:9010
No authorization token was found  <-- This is the correct response and verifies service is available
```

### Execute the rpcProblemsClient.js script
On the host terminal:
```text
$ cd nodeVISTAClients/rpcClient
$ node rpcProblemsClient.js
```
The resulting response should be:

```text
[ { key: '1', value: 'GMPFLD(.01)="521774^R69."' },
  { key: '2', value: 'GMPFLD(.03)="0^"' },
  { key: '3', value: 'GMPFLD(.05)="^Stomach ulcer"' },
  { key: '4', value: 'GMPFLD(.08)="3170316"' },
  { key: '5', value: 'GMPFLD(.12)="A^ACTIVE"' },
  { key: '6', value: 'GMPFLD(.13)="^"' },
  { key: '7', value: 'GMPFLD(1.01)="7805405^Stomach ulcer"' },
  { key: '8', value: 'GMPFLD(1.02)="P"' },
  { key: '9', value: 'GMPFLD(1.03)="62^Alexander,Robert"' },
  { key: '10', value: 'GMPFLD(1.04)="62^Alexander,Robert"' },
  { key: '11', value: 'GMPFLD(1.05)="62^Alexander,Robert"' },
  { key: '12', value: 'GMPFLD(1.06)="^"' },
  { key: '13', value: 'GMPFLD(1.07)="^"' },
  { key: '14', value: 'GMPFLD(1.08)="10^Clinicd"' },
  { key: '15', value: 'GMPFLD(1.09)="3170316"' },
  { key: '16', value: 'GMPFLD(1.1)="^Unknown"' },
  { key: '17', value: 'GMPFLD(1.11)="0^NO"' },
  { key: '18', value: 'GMPFLD(1.12)="0^NO"' },
  { key: '19', value: 'GMPFLD(1.13)="0^NO"' },
  { key: '20', value: 'GMPFLD(1.14)="@^"' },
  { key: '21', value: 'GMPFLD(1.15)="0^NO"' },
  { key: '22', value: 'GMPFLD(1.16)="0^NO"' },
  { key: '23', value: 'GMPFLD(1.17)="0^NO"' },
  { key: '24', value: 'GMPFLD(1.18)="0^NO"' },
  { key: '25', value: 'GMPFLD(80001)="397825006^397825006"' },
  { key: '26', value: 'GMPFLD(80002)="1785985013^1785985013"' },
  { key: '27', value: 'GMPFLD(80101)="^"' },
  { key: '28', value: 'GMPFLD(80102)="^"' },
  { key: '29', value: 'GMPFLD(80201)="3170316"' },
  { key: '30', value: 'GMPFLD(80202)="10D^ICD-10-CM"' },
  { key: '31', value: 'GMPFLD(10,0)="0"' } ]
20011025GMPFLD(.01)="521774^R69."t0012016GMPFLD(.03)="0^"t0013028GMPFLD(.05)="^Stomach ulcer"t0014021GMPFLD(.08)="3170316"t0015022GMPFLD(.12)="A^ACTIVE"t0016015GMPFLD(.13)="^"t0017036GMPFLD(1.01)="7805405^Stomach ulcer"t0018016GMPFLD(1.02)="P"t0019034GMPFLD(1.03)="62^Alexander,Robert"t00210034GMPFLD(1.04)="62^Alexander,Robert"t00211034GMPFLD(1.05)="62^Alexander,Robert"t00212016GMPFLD(1.06)="^"t00213016GMPFLD(1.07)="^"t00214025GMPFLD(1.08)="10^Clinicd"t00215022GMPFLD(1.09)="3170316"t00216022GMPFLD(1.1)="^Unknown"t00217019GMPFLD(1.11)="0^NO"t00218019GMPFLD(1.12)="0^NO"t00219019GMPFLD(1.13)="0^NO"t00220017GMPFLD(1.14)="@^"t00221019GMPFLD(1.15)="0^NO"t00222019GMPFLD(1.16)="0^NO"t00223019GMPFLD(1.17)="0^NO"t00224019GMPFLD(1.18)="0^NO"t00225035GMPFLD(80001)="397825006^397825006"t00226037GMPFLD(80002)="1785985013^1785985013"t00227017GMPFLD(80101)="^"t00228017GMPFLD(80102)="^"t00229023GMPFLD(80201)="3170316"t00230029GMPFLD(80202)="10D^ICD-10-CM"t00231016GMPFLD(10,0)="0"f
TCPConnect OK, trying XUS SIGNON SETUP
XUS SIGNON SETUP OK, trying XWB CREATE CONTEXT DVBA CAPRI GUI
XUS AV CODE OK: "\u0000\u000062\r\n0\r\n0\r\n\r\n0\r\n0\r\n\r\nGood evening ALEXANDER,ROBERT\r\n     You last signed on today at 22:25\r\n\u0004", trying XWB CREATE CONTEXT: "OR CPRS GUI CHART"
1
SEVEN,PATIENT G^M^2450502^656771234^^^^^0^^0^0^^^71^0
1
Stomach ulcer (SCT 397825006)
         SNOMED-CT: Gastric ulcer
 Primary ICD-10-CM: R69.   [ILLNESS, UNSPECIFIED]
 
        Onset: 
       Status: ACTIVE
      SC Cond: UNKNOWN
     Exposure: None
 
     Provider: ALEXANDER,ROBERT
       Clinic: CLInicD
 
     Recorded: 3/17/17, by ALEXANDER,ROBERT
      Entered: 3/17/17, by ALEXANDER,ROBERT
      Updated: 3/17/17
 
 



Execution time: 297 ms


OK: "\u0000\u0000Stomach ulcer (SCT 397825006)\r\n         SNOMED-CT: Gastric ulcer\r\n Primary ICD-10-CM: R69.   [ILLNESS, UNSPECIFIED]\r\n \r\n        Onset: \r\n       Status: ACTIVE\r\n      SC Cond: UNKNOWN\r\n     Exposure: None\r\n \r\n     Provider: ALEXANDER,ROBERT\r\n       Clinic: CLInicD\r\n \r\n     Recorded: 3/17/17, by ALEXANDER,ROBERT\r\n      Entered: 3/17/17, by ALEXANDER,ROBERT\r\n      Updated: 3/17/17\r\n \r\n \r\n\u0004", trying #BYE#
#BYE#


test1 SUCCESS!!!

```
