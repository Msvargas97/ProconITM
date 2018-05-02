import realm, { ACCOUNT_SCHEMA } from "../config/database";
const ERROR_SERVER = "Falló la conexión con el servidor";

export const urlBase = (version, request) => `https://procontroles.com/report_manager/v${version}/${request}`;
const futch = (url, opts = {}, onProgress) => {
    console.log(url, opts)
    return new Promise((res, rej) => {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers || {})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        xhr.send(opts.body);
    });
}

const originalFetch = fetch
global.fetch = (url, opts) => {
    //  console.log(opts.onProgress)
    if (opts.onProgress && typeof opts.onProgress === 'function') {
        return futch(url, opts, opts.onProgress)
    } return originalFetch(url, opts)
}

function* requestLoginFromApi(payload) {
    const version = yield realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).version;
    let response = yield fetch(urlBase(version, 'login'), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    let responseJson = yield response.json()
    //yield alert(`response:${JSON.stringify(responseJson,null,2)} url:${urlBase(version, 'login')} status:${response.status}`)
    return yield response.status === 200 ? responseJson : {};
}
function* requestRegisterFromApi(payload) {
    const version = yield realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).version;
    const response = yield fetch(urlBase(version, 'register'), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    let responseJson = yield response.json();
    //responseJson
    //yield alert(`response:${JSON.stringify(responseJson,null,2)} url:${urlBase(version, 'register')} status:${response.status}`)
    return yield response.status === 200 ? responseJson : {};
    //  return yield (response.status === 200 || response.status === 201 || response.status == 400) ? JSON.parse(response._bodyInit) : {};
}

function* requestUpdatePhotoFromApi(payload, profile) {
    const account = yield realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0);
    const version = yield account.version;
    const data = yield new FormData();
    yield data.append('type', 'image_profile'); // get in $_REQUEST
    yield data.append('image', { //get in $_FILES
        uri: payload.uri,
        type: 'image/jpg', // or photo.type
        name: 'testPhotoName'
    });
    const response = yield fetch(urlBase(version, 'upload'), {
        method: 'POST',
        body: data,
        onProgress: (e) => {
            const progress = e.loaded / e.total;
            //console.log(progress);
            if (payload.onProgress) payload.onProgress(progress * 100);
        }
    });
    let responseJson = yield response.json();
    //yield alert(`response:${JSON.stringify(responseJson, null, 2)} url:${urlBase(version, 'upload')} status:${response.status}`)
    return (responseJson !== null) ? { uri: 'data:image/jpg;base64,' + response.data } : null;
}

/**
 * Upload file to server
 */
function* requestUploadFromApi(data) {
    yield console.log(`input: ${typeof data}`);

    const version = yield realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0).version;
    const response = yield fetch(urlBase(version, 'upload'), {
        method: 'POST',
        body: data,
        onProgress: (e) => {
            const progress = e.loaded / e.total;
            console.log(progress);
        }
    })
    const responseJson = yield response.json();
    yield console.log(responseJson)
   // yield alert(`response:${JSON.stringify(responseJson, null, 2)} url:${urlBase(version, 'upload')} status:${response.status}`);
    return responseJson;
}
export const Api = {
    requestLoginFromApi,
    requestRegisterFromApi,
    requestUpdatePhotoFromApi,
    requestUploadFromApi,
    urlBase
};

/* const data = new FormData();
              data.append('inputtest', 'asdasd'); // get in $_REQUEST
              data.append('image', { //get in $_FILES
                uri: response.uri,
                type: 'image/jpg', // or photo.type
                name: 'testPhotoName'
              });

              fetch("https://www.procontroles.com/report_manager/v1/upload", {
                method: 'POST',
                body: data,
                onProgress: (e) => {
                  const progress = e.loaded / e.total;
                  //console.log(progress);
                  this.setState({
                    progress: (progress < 1) ? progress * 100 : 'https://www.procontroles.com/report_manager/v1/image/1' + '?' +  Date.now()
                  });
                }
              }).then((res) => console.log(res), (e) => console.log(e))
              //then(res => res.json())
              //  .then(result => {
              //    alert(`${JSON.stringify(result)} `)
              //  });
              // You can also display the image using data:
              let source = { uri: 'data:image/jpeg;base64,' + response.data }; */