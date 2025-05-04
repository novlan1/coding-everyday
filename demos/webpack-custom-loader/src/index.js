import _ from 'lodash';

import txt from '../test.txt';

console.error(111);

function component() {
    const element = document.createElement('div');
    const button = document.createElement('button');
    const br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console!';

    console.log(txt);

    element.innerHTML = txt;
    element.className = 'hello';

    element.appendChild(br);
    element.appendChild(button);

    return element;
}

document.body.appendChild(component());
