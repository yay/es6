// Shadow DOM provides encapsulation for DOM and CSS in a Web Component.

document.addEventListener('DOMContentLoaded', () => {
    let root = document.createElement('div');
    document.body.appendChild(root);

    // Shadow DOM
    let shadow = root.attachShadow({mode: 'open'}); // create shadow root
    shadow.innerHTML = '<span>Here is some shadow DOM text.</span>';
    shadow.innerHTML += '<style>span { color: red; }</style>';

    // Can attach normal DOM to the shadow root.
    let br = document.createElement('br');
    let span = document.createElement('span');
    span.textContent = 'Hello, world!';

    shadow.appendChild(br);
    shadow.appendChild(span);

    // Custom Elements
    let customElement = document.createElement('my-goofy-element');
    customElement.textContent = 'Goofy text';
    customElement.style.display = 'block';
    shadow.appendChild(customElement);
});