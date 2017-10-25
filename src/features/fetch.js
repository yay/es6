/*

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

An alternative to XMLHttpRequest.

- Promise returned from fetch() won’t reject on HTTP error status.
- By default, fetch won't send or receive any cookies from the server.

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

*/

let url = 'img/dots.jpg';

function createImage() {
    let img = document.createElement('img');
    document.body.appendChild(img);
    return img;
}

// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
function simpleFetch() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Request
    let request = new Request(url);

    console.log(`url: ${request.url}`);
    console.log(`method: ${request.method}`);
    console.log(`credentials: ${request.credentials}`);
    console.log(`bodyUsed: ${request.bodyUsed}`);

    // Can pass 'request' instead of 'url' to 'fetch'.

    fetch(url).then((response) => {
        return response.blob();
    }).then((blob) => {
        let url = URL.createObjectURL(blob);
        createImage().src = url;

        console.log(url, blob);

        // URL.revokeObjectURL(url); // no image shown
        //
        // setTimeout(function () {
        //     URL.revokeObjectURL(url); // image is still shown
        // }, 1);
    }).catch(e => console.log('Something went wrong =>', e));
}

function xhrFetch() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob'; // arraybuffer, document, json, text, ...

    xhr.onload = function (progressEvent) {
        if (xhr.status === 200) {
            // xhr.response is a Blob(19263) {size: 19263, type: "image/jpeg"}
            createImage().src = URL.createObjectURL(xhr.response);
        }
    };

    // xhr.responseType = 'arraybuffer';
    // xhr.onload = function (progressEvent) {
    //     if (xhr.status === 200) {
    //         let blob = new Blob([xhr.response], {type: "image/jpeg"});
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

    fetch('flowers.jpg', init).then(function(response) {
        return response.blob();
    }).then(function(blob) {
        createImage().src = URL.createObjectURL(blob);
    });
}

window.addEventListener('load', () => {
    simpleFetch();
    xhrFetch();
});

/*

Object URL looks something like this:
blob:http://localhost/a51144e6-6cae-4b41-b921-2d5ec0bb6e7c
The new object URL represents the specified File object or Blob object.

Each time you call createObjectURL(), a new object URL is created,
even if you've already created one for the same object.
Each of these must be released by calling URL.revokeObjectURL()
when you no longer need them.

Browsers will release these automatically when the document is unloaded;
however, for optimal performance and memory usage, if there are safe times
when you can explicitly unload them, you should do so.

*/