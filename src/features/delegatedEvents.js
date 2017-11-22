let html =
    `<div class="wrapper">
      <div class="one inner">One</div>
      <div class="two inner">Two</div>
      <div class="three inner">Three
        <div class="three-1 inner"></div>
        <div class="three-2 inner"></div>
        <div class="three-3 inner"></div>
        <div class="three-4 inner"></div>
      </div>
      <div class="four inner">Four</div>
      <div class="five inner">Five</div>
      <div class="six inner">Six</div>
    </div>`;

/*

The below example shows a three column track grid with new rows created
at a minimum of 100 pixels and a maximum of auto.

More info:

* fr = flex factor units
  (take a share of the remaining space in proportion to your flex factor)

* grid-column - shorthand for grid-column-start and grid-column-end

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns

*/

let css =
    `.wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(100px, auto);

      background-color: rgba(255,255,0,0.3);
      padding: 10px;
    }
    .inner {
      padding: 10px;
      background-color: rgba(255,0,0,0.3);
      border-radius: 10px;
    }
    .one {
      grid-column: 1 / 3;
      grid-row: 1;
    }
    .two {
      grid-column: 2 / 4;
      grid-row: 1 / 3;
    }
    .three {
      grid-column: 1;
      grid-row: 2 / 5;

      display: grid;
      grid-gap: 10px;
    }
    .four {
      grid-column: 3;
      grid-row: 3;
    }
    .five {
      grid-column: 2;
      grid-row: 4;
    }
    .six {
      grid-column: 3;
      grid-row: 4;
    }`;

window.addEventListener('load', function () {
    document.body.innerHTML = html;

    let styleEl = document.createElement('style');
    styleEl.innerHTML = css;
    document.body.appendChild(styleEl);

    addDelegatedEventListener();
});

function addDelegatedEventListener() {
    let parentSelector = '.wrapper';
    let delegateSelector = 'div.inner';
    let eventName = 'click';

    function listener(event) {
        console.log(this, event.target);
    }

    let parentEl = document.querySelector(parentSelector);

    parentEl.addEventListener(eventName, function (event) {
        event.stopPropagation();

        if (event.target.matches(delegateSelector)) {
            // 'this' is the element we are listening on: parentSelector
            listener.call(this, event);
        }
    });
}

/*

https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

- event.preventDefault()
- event.stopPropagation()
- event.stopImmediatePropagation()

*/