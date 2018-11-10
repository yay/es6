/*

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

An alternative to XMLHttpRequest.

- Promise returned from fetch() won’t reject on HTTP error status.
- By default, fetch won't send or receive any cookies from the server.

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

*/

const url = 'img/logo.png';

function createImage() {
    const img = document.createElement('img');
    document.body.appendChild(img);
    return img;
}

// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
function simpleFetch() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    const request = new Request(url);

    console.log(`url: ${request.url}`);
    console.log(`method: ${request.method}`); // GET
    console.log(`credentials: ${request.credentials}`); // same-origin
    console.log(`bodyUsed: ${request.bodyUsed}`); // false

    // Can pass 'request' instead of 'url' to 'fetch'.

    fetch(url)
        .then(response => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            createImage().src = url;

            console.log(url, blob);
            // blob:http://localhost/a9ba3899-15fa-4a23-b72b-718008260e52
            // Blob { size: 3207, type: 'image/png' }

            // URL.revokeObjectURL(url); // no image shown
            // setTimeout(function () {
            //     URL.revokeObjectURL(url); // image is still shown
            // }, 1);

            // Browsers will release object URLs automatically when the document
            // is unloaded; however, for optimal performance and memory usage,
            // if there are safe times when you can explicitly unload them,
            // you should do so.
        }).catch(e => console.log('Something went wrong =>', e));
}

function xhrFetch() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // async = true, username/password params omitted

    xhr.responseType = 'blob'; // arraybuffer, document, json, text, ...
    xhr.onload = function (progressEvent) {
        if (xhr.status === 200) {
            // xhr.response is a Blob { size: 3207, type: 'image/png' }
            createImage().src = URL.createObjectURL(xhr.response);
        }
    };

    // xhr.responseType = 'arraybuffer';
    // xhr.onload = function (progressEvent) {
    //     if (xhr.status === 200) {
    //         let blob = new Blob([xhr.response], {type: 'image/png'});
    //         createImage().src = URL.createObjectURL(blob);
    //     }
    // };

    xhr.onerror = function () {
        console.log('XHR failed.');
    };

    xhr.send();
}

function customFetch() {
    let headers = new Headers();

    let init = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    let img = document.createElement('img');
    document.body.appendChild(img);

    fetch('flowers.jpg', init)
        .then(response => response.blob())
        .then(blob => {
            createImage().src = URL.createObjectURL(blob);
        });
}

simpleFetch();
xhrFetch();