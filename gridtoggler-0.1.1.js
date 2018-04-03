// @ts-check;
;
/**
 * The wrapper IIFE, being triggered by window 'load' event.
 */
window.addEventListener('load', () => {
  /**
   * The core configuration object.
   * @param {string} targetX Valid DOM selector targeting horizontal grid container.
   * @param {string} asstargetY Valid DOM selector targeting vertical grid container.
   * @param {number} gridGapX Distance between horizontal grid guides (px).
   * @param {number} gridGapY Distance between vertical grid guides (px).
   * @param {number} gridTiltX Horizontal grid offset (px).
   * @param {number} gridTiltY Vertical grid offset (px).
   * @param {string} gridColor Valid CSS color for guides.
   */
  const config = {
    targetX: '#grid',
    targetY: 'body',
    gridGapX: 30,
    gridGapY: 30,
    gridTiltX: 0,
    gridTiltY: 0,
    gridColor: 'rgb(50, 154, 240)',
  };

  const queryX = document.querySelectorAll(config.targetX);
  const queryY = document.querySelectorAll(config.targetY);

  /**
   * Returns an array of static CSS rules to be applied on butons and form.
   * @return {array} A set of static CSS rules.
   */
  const staticStyles = () => {
    return [
      `.gt {
        background: transparent;
        display: inline-block;
        position: fixed;
        right: 2rem;
        top: 1rem;
        z-index: 9999;
      }`,
      `.gt__btn-group {
        box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, .3);
        display: inline-block;
        margin-bottom: 1rem;
      }`,
      `.gt__btn {
        display: inline-block;
        padding: 1rem 2rem 1rem 2rem;
        position: relative;
        border:1px solid #aeaeae;
        background: linear-gradient(0deg, #e1e1e1, #fefefe);
        background-repeat: no-repeat;
        line-height: 28px;
        cursor: pointer;
      }`,
      `.gt__btn:focus {
        outline: none;
      }`,
      `.gt__btn:first-child {
        border-right: none;
      }`,
      `.gt__btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 15px;
        height: 15px;
      }`,
      `.gt__btn--x::before {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15px' height='15px' viewBox='0 0 15 15' enable-background='new 0 0 15 15'%3E%3Cpath d='M13 0H14V15H13zM9 0H10V15H9zM5 0H6V15H5zM1 0H2V15H1z'/%3E%3C/svg%3E");
      }`,
      `.gt__btn--y::before {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15px' height='15px' viewBox='0 0 15 15' enable-background='new 0 0 15 15'%3E%3Cpath d='M0 1H15V2H0zM0 5H15V6H0zM0 9H15V10H0zM0 13H15V14H0z'/%3E%3C/svg%3E");
      }`,
      `.gt__btn--active {
        background: linear-gradient(0deg, #cbcbcb, #cecece);
        box-shadow: 0 0 10px rgba(0, 0, 0, .1) inset;
      }`,
      `.gt__form {
        background: #fafafa;
        border:1px solid #aeaeae;
        box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, .3);
        padding: 0.5rem;
      }`,
      `.gt__label {
        font-family: sans-serif;
        font-size: 0.75rem;
      }`,
      `.gt__input-num {
        display: block;
        margin-bottom: 0.5rem;
        margin-top: 0.25rem;
        max-width: 3rem;
      }`,
    ];
  };

  /**
   * Returns an array of dynamic CSS rules to be applied on grid target elements.
   * @return {array} A set of dynamic CSS rules.
   */
  const dynamicStyles = () => {
    return [
      `.gridX--active {
        background-image: repeating-linear-gradient(
          90deg,
          transparent,
          transparent ${config.gridGapX - 1}px,
          ${config.gridColor} ${config.gridGapX - 1}px,
          ${config.gridColor} ${config.gridGapX}px
        );
        background-position-x: ${config.gridTiltX}px;
      }`,
      `.gridY--active {
        background-image: repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${config.gridGapY - 1}px,
          ${config.gridColor} ${config.gridGapY - 1}px,
          ${config.gridColor} ${config.gridGapY}px
        );
        background-position-y: ${config.gridTiltY}px;
      }`,
      `.gridX--active.gridY--active {
        background-image: repeating-linear-gradient(
          90deg,
          transparent,
          transparent ${config.gridGapX - 1}px,
          ${config.gridColor} ${config.gridGapX - 1}px,
          ${config.gridColor} ${config.gridGapX}px
        ),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${config.gridGapY - 1}px,
          ${config.gridColor} ${config.gridGapY - 1}px,
          ${config.gridColor} ${config.gridGapY}px
        )
      }`,
    ];
  };

  /**
   * Creates a </style> element in documents' head and appends given rules to it.
   * @param {function} source – A function which returns an array of CSS rules.
   * @param {string} type – A 'data-gt-type' attribute value allowing to query that stylesheet.
   * @return {object} A single stylesheet.
   */
  const appendStyles = (source, type) => {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.setAttribute('data-gt-type', type);

    source().forEach((rule, index) => {
      style.sheet.insertRule(rule, index);
    });
    return style.sheet;
  };

  appendStyles(staticStyles, 'static');
  appendStyles(dynamicStyles, 'dynamic');

  const dynamicSheet = document.head.querySelector("[data-gt-type='dynamic']").sheet;

  /**
   * Toggles classes on given targets.
   * @param {object} query – A HTML Collection of elements targeted via config object.
   * @param {string} className – A name of CSS class to be toggled.
   * @param {object} e – An event object.
   * @return {function} An IIFE to toggle CSS classes of elements passed in the 'query' param.
   */
  const toggleGrid = (query, className, e) => {
    e.target.classList.toggle('gt__btn--active');
    if (!query.length) {
      console.warn(
        `We are sorry, but the toggleGrid script couldn't find any elements with given attributes.
        Please, check the config object on top of "gridtoggler.js" file.
        If you think this is a bug, please report.`,
      );
      return false;
    }
    return (() => {
      [...query].forEach((elm) => {
        elm.classList.toggle(className);
      });
    })();
  };

  /**
   * Calls the toggleGrid() function with specific params.
   * @param {object} e – An event object.
   */
  const toggleXGrid = (e) => {
    toggleGrid(queryX, 'gridX--active', e);
  };

  /**
   * Calls the toggleGrid() function with specific params.
   * @param {object} e – An event object.
   */
  const toggleYGrid = (e) => {
    toggleGrid(queryY, 'gridY--active', e);
  };

  /**
   * Deletes all rules in a stylesheet being queried by const 'dynamicSheet'.
   * Then insert modified rules.
   */
  const refreshDynamicStyles = () => {
    const len = dynamicSheet.cssRules.length;
    for (let i = 0; i < len; i += 1) {
      dynamicSheet.deleteRule(0);
    }
    dynamicStyles().forEach((rule, index) => {
      dynamicSheet.insertRule(rule, index);
    });
  };

  /**
   * Changes the value of given config object property.
   * Either the key and the value are passed in the event object.
   * @param {object} e – An event object.
   */
  const changeValue = (e) => {
    const prop = e.target.name;
    const val = Number(e.target.value);
    config[prop] = val;

    refreshDynamicStyles();
  };

  const domString = `<div class="gt">
                      <div class="gt__btn-group">
                        <button id="gt__Xbtn" class="gt__btn gt__btn--x"></button><button id="gt__Ybtn" class="gt__btn gt__btn--y"></button>
                      </div>
                      <div style="display: block"></div>
                      <form class="gt__form" class="gt__settings">
                        <label class="gt__label" for="gridGapX">grig gap X</label>
                        <input class="gt__input-num" type="number" min="2" name="gridGapX" value=${config.gridGapX} />
                        <label class="gt__label" for="gridGapY">grid gap Y</label>
                        <input class="gt__input-num" type="number" min="2" name="gridGapY" value=${config.gridGapY} />
                        <label class="gt__label" for="gridTiltX">grit tilt X</label>
                        <input class="gt__input-num" type="number" name="gridTiltX" value=${config.gridTiltX} />
                        <label class="gt__label" for="gridTiltY">grid tilt Y</label>
                        <input class="gt__input-num" type="number" name="gridTiltY" value=${config.gridTiltY} />
                      </form>
                    </div>`;

  document.body.insertAdjacentHTML('afterbegin', domString);
  document.getElementById('gt__Xbtn').addEventListener('click', (e) => { toggleXGrid(e); }, false);
  document.getElementById('gt__Ybtn').addEventListener('click', (e) => { toggleYGrid(e); }, false);

  const inputs = document.getElementsByClassName('gt__input-num');
  [...inputs].forEach((elem) => {
    elem.addEventListener('change', (e) => { changeValue(e); }, false);
  });
}, false);
