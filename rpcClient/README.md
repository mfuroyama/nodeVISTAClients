# RPC Interface Clients

Example clients that show how to use the nodeVISTA RPC interface.

These clients run on your __host__ machine (__not__ the nodeVISTA VM) and use _ES6 Promises_.

The first example client is _rpcProblemsClient.js_.

### Install Module Dependencies

__Note__: We assume that both _node_ and _npm_ are installed on your Machine.

Open a terminal window ...

```text
$ cd nodeVISTAClients/rpcClient
$ npm install
```

### Ensure the RPC Server is running (to be edited)

```text
$ curl http://10.2.2.100:9010
No authorization token was found  <-- This is the correct response and verifies that the RPC Interface is available
```

### Execute the rpcProblemsClient.js script

```text
$ node rpcProblemsClient.js
```
The resulting response should be:

```text
1
ONE,PATIENT A^M^2591003^543236666^^^^^0^^0^0^^^57^0
1
Stomach ulcer (SCT 73211009)
         SNOMED-CT: Diabetes mellitus
 Primary ICD-10-CM: R69.   [ILLNESS, UNSPECIFIED]
 
        Onset: 
       Status: ACTIVE
      SC Cond: UNKNOWN
     Exposure: None
 
     Provider: ALEXANDER,ROBERT
       Clinic: CLInicB
 
     Recorded: 3/20/17, by ALEXANDER,ROBERT
      Entered: 3/20/17, by ALEXANDER,ROBERT
      Updated: 3/20/17
 
----------- Audit History -----------
3/20/17: CLINIC changed by ALEXANDER,ROBERT from CLInicD to CLInicB
3/20/17: RESPONSIBLE PROVIDER changed by ALEXANDER,ROBERT from ALEXANDER,ROBERT to ALEXANDER,ROBERT
3/20/17: PROBLEM changed by ALEXANDER,ROBERT from PERMANENT to PERMANENT
3/20/17: PROBLEM changed by ALEXANDER,ROBERT from Stomach ulcer to Diabetes mellitus
3/20/17: STATUS changed by ALEXANDER,ROBERT from ACTIVE to ACTIVE
3/20/17: DIAGNOSIS changed by ALEXANDER,ROBERT from (ICD-10-CM R69.) to (ICD-10-CM R69.)
3/20/17: SNOMED CT CONCEPT changed by ALEXANDER,ROBERT from 397825006 to 73211009

1
0

OK: "\u0000\u00000\r\n\u0004", trying #BYE#
#BYE#


test1 SUCCESS!!!

```
