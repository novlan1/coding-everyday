jest 中mock axios

```ts
import http from '../../../src/http';
// import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

const mockHttp = new MockAdapter(http);// 或者  new MockAdapter(axios)

mockHttp.reset();
mockHttp.onPost(`/openapi/smartbook/v2/files/${fileID}/sheets`).reply(200, mockResponse);
```
