# Project Notes

## Needs / TODO

  1 - Import [plop](https://github.com/amwmedia/plop) generator for interior scaffolding  
  2 - Import email server settings from next-auth (Iaian Collins)  
  3 - Import click handler from [next-motion](https://github.com/toinelin/next-motion)  
  4 - Adapt Redux implementation from [redux motion](https://github.com/bgryszko/react-motion-example.git)  

  5 - I need a way to handle next/link and next/router
      The code below won't work

      **old code from the next example, replace this code in /components/Header.js

  ```javascript
        <a className={pathname === '/example' && 'is-active'}>Example</a>
  ```

```javascript
theme={{

    font: '"Avenir Next", Helvetica, sans-serif',
    fontSizes: [
      12, 16, 24, 36, 48, 56
    ],
    breakpoints: [
      // min-width breakpoints in em units
      40, 52, 64, 64, 64, 64
    ],
    space: [
      0, 6, 12, 18, 24, 30, 36
    ],
    weights: [
      400, 600
    ],

  }}
```

## Front End Stuff to Integrate
[React Stonecutter](https://github.com/dantrain/react-stonecutter)
git@github.com:dantrain/react-stonecutter.git

[parallax.js](http://matthew.wagerfield.com/parallax/)
git@github.com:wagerfield/parallax.git

https://codepen.io/tommmyy/pen/LGJPZg
https://github.com/wagerfield/parallax/issues/167

[React Transition Group Plus](https://github.com/cheapsteak/react-transition-group-plus)

## Perhaps Switch to this (next.js based) stack

https://github.com/tkh44/next-hnpwa-guide-kit
sample: https://hnpwa.life/

https://emotion.sh/

### Random

Pretty cool stack overflow answer on deep object access
https://stackoverflow.com/questions/11922383/access-process-nested-objects-arrays-or-json