# zen-components

A small collection of utility components built in pure Js

## List of components

## zen-for

This component is used for stamping a block oh HTML for each item in a list.

#### Example:

```html
<zen-for list="characters">
  <div>${name}</div>
</zen-for>
```

```js
window.zen.characters = [
  {
    name: "Rick",
    dob: "12/05/1960",
  },
  {
    name: "Morty",
    dob: "10/05/1995",
  },
];
```

#### Result:

```
Rick
Morty
```

> For `zen-for` to be able to access the list, it should be a property of the global zen object.

### zen-for Formatters

The component also supports few formatters that we can use to visually format the template

- **upper** used to transform the text to Upper Case
- **lower** used to transform the text to Lower Case
- **datetime** used to transform the text to a formatted Date/Time String
- **date** used to transform the text to a formatted Date String
- **time** used to transform the text to a formatted Time String
- **escape** used to transform the text to an escaped HTML srting

#### Example

```html
<zen-for list="characters">
  <div>${name | upper}</div>
  <div>${dob | date}</div>
</zen-for>
```

#### Result

```
RICK
December 5, 1960
```

> Formatters can also be chained one after another as `${dob | date | upper}` resulting in `DECEMBER 5, 1960`

### zen-for API

The component supports programatic access to its life-cycle.

There are 4 lifecycle hooks available for `zen-for`

- **init-complete** Triggered once the component is attached to the DOM and is available.
- **render-complete** Triggered every time rendering of the DOM is completed either due to change in list/ initial load render.
- **attribute-change-complete** Triggered everytime an attribute change happens
- **remove-complete** Triggered when `zen-for` is removed from DOM. eg: `document.querySelector('zen-for').remove();`

You can also manually trigger the render process of `zen-for` by getting an instance of the element and calling `renderContent()` method

#### Example

```js
const zenForElem = document.querySelector("zen-for");
zenForElem.renderContent().then(() => {
    console.log('Manual Trigger Done!)
});
```

> The `renderContent()` mehod returns a promise.
