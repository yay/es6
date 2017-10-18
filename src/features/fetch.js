/*

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

An alternative to XMLHttpRequest.

- Promise returned from fetch() won’t reject on HTTP error status.
- By default, fetch won't send or receive any cookies from the server.
 */

// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
function simpleFetch() {
    let img = document.createElement('img');
    document.body.appendChild(img);

    fetch('img/dots.jpg').then((response) => {
        return response.blob();
    }).then((blob) => {
        let url = URL.createObjectURL(blob);
        console.log(url);
        img.src = url;

        // URL.revokeObjectURL(url); // no image shown
        //
        // setTimeout(function () {
        //     URL.revokeObjectURL(url); // image is still shown
        // }, 1);
    });
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
        let objectURL = URL.createObjectURL(blob);
        img.src = objectURL;
    });
}

window.addEventListener('load', () => {
    simpleFetch();
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