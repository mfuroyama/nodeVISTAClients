# Event Listener View

... taken from nodeVISTA Management Client

In a terminal window ...

> node prettyPrintEvents.js 

```text
WebSocket: mvdmEvents Event Handler is connected...
WebSocket: rpcEvents Event Handler is connected...
```

In a different terminal window, run the rpcProblemsClient

> node rpcProblemsClient.js

then back in this terminal windows you will see the trace as events are received ...

```text

 rpcEvents {"type":"socketMessage_RPC","eventCategory":"RPC","data":{"type":"rpcCall","transactionId":"3049e8df-00e8-4c91-b762-0ac64d42e2e6","ipAddress":"::ffff:10.2.2.1","timestamp":"2017-03-28T18:11:40.903Z","runner":"server","rpcName":"TCPConnect","rpcObject":{"name":"TCPConnect","args":["10.2.2.1","0","hello"],"to":"server","rpc":"[XWB]10304\nTCPConnect5000810.2.2.1f00010f0005hellof\u0004","response":"\u0000\u0000accept\u0004","from":"CPRS","timeStamp":"2017-03-28T18:11:40.903Z"},"request":{"args":["10.2.2.1","0","hello"]},"response":"\u0000\u0000accept\u0004","user":{"id":"200-NaN"},"facility":{"id":"4-undefined"}}} 

...

```

