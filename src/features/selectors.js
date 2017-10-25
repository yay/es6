// https://css4-selectors.com/selectors/

let html =
    `<div id="root">
      <a href="http://fb.com">Facebook</a>
      <span>first span after hyperlink</span>
      <div class="inner" foobar="2000 12 09"></div>
      <div foobar="42"></div>
      <div lang="fr-de"></div>
    </div>`;

const selectors = [
    // --- CSS selectors Level 1 ---

    `#root`,        // ID selector
    `div`,          // type selector
    `div a`,        // descendant combination selector
    `.inner`,       // class selector
    `:link`,        // link history pseudo-class selector
    `:active`,      // user action pseudo-class selector

    // --- CSS selectors Level 2 ---

    `*`,                 // universal selector
    `:lang(en)`,         // lang pseudo-class selector
    `div:focus`,         // user action pseudo-class selectors
    `div:hover`,
    `div > a`,              // (direct) child combination selector
    `#root > :first-child`, // structural pseudo-class selector
    `[foobar]`,             // attribute selectors
    `[foobar='42']`,  // attribute has this exact value
    `[foobar~='12']`, // attribute has this value in a space-separated list somewhere
    `[lang|='fr']`,   // attribute value starts with this in a dash-separated list
    `a + span`,       // adjacent sibling (directly after 'a') combination selector

    // --- CSS selectors level 3 ---


];

window.addEventListener('load', function () {
    document.body.innerHTML = html;

    console.log('--- querySelector ---');
    for (let selector of selectors) {
        console.log(
            selector,
            document.querySelector(selector)
        );
    }

    console.log('--- querySelectorAll ---');
    for (let selector of selectors) {
        console.log(
            selector,
            document.querySelectorAll(selector)
        );
    }

});


