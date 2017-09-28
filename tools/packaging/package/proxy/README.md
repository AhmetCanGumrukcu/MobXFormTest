## b-proxy
This is BOA Proxy framework for service calls.

### Installation
```
npm install --save-dev b-proxy
```

### Usage
```
import {proxyCall} from 'b-proxy'
var request = {
    url: '',
    data: {},
    dataType: 'json',
    headers: {},
    method: 'POST'
};
var promise = proxyCall(request);
```