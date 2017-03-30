## nodeVISTA Manager Client

This client works in conjunction witht the [rpcServer](https://github.com/vistadataproject/nodeVISTA/tree/master/rpcServer).

The RPC Server must be running in order for the client to properly function. 

The nodeVISTA VM should have a version of the RPC Server running on ports 9010 & 9020 (9010 is used to process RPC requests and 9020 handles web and web-socket requests).

**Configure the nodeVISTA Manager Client**

Install the bower components. If you don't have bower installed, you can do so via npm.
```text
$ npm install bower -g <-- Only perform this step if you don't have bower installed on your system.
$ bower install
```

Modify the config.js to your desired settings:

```javascript
const config = {
    httpProtocol: 'http',
    host: '10.2.2.100',
    port: 9020,
};
```

**Launch nodeVISTA Manager**

You can run the nodeVISTA Manager in single page mode by opening the index.html file. 

If you're using chrome, you must open the application and enable file access. This can be done via a terminal.

Assuming macOS:
```text
$ open /Applications/Google\ Chrome.app --args --allow-file-access-from-files
```

Once the browser launches, navigate to File->Open File... and select nodeVISTAManager/index.html

![](https://github.com/vistadataproject/nodeVISTA/blob/master/rpcServer/screenshots/singlePageApp.jpeg)





