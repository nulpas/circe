# Circe :: Angular Core Services and Tools

Some help services, generic types and component styles.

## Compatibility

Angular v.7.2.15

## Installation

Run `npm install @lunaeme/circe-core` or

run `yarn add @lunaeme/circe-core`.

## Component Style Use

You need to import component SASS file at the top of your SASS file as follows:

```
@import '~@lunaeme/circe-core/styles/component.styles.scss';
```

Then you can use some native DOM components cool styled.

## Available Component Styles

&nbsp;
#### LABEL

> **Class:** 'mda-label'
>
> **SubClasses:** 'error'
>
> **Example:**
> ```html
> <label class="mda-label">Some Text</label>
>
> <label class="mda-label error">Some Text</label>
> ```


&nbsp;
#### BUTTON

> **Class:** 'mda-button'
>
> **SubClasses:** 'disabled'
>
> **Example:**
> ```html
> <button class="mda-button">
>   Some Text
> </button>
>
> <button class="mda-button disabled">
>   Some Text
> </button>
> ```


&nbsp;
#### ICON BUTTON

> **Class:** 'mda-icon-button'
>
> **SubClasses:** 'disabled'
>
> **Example:**
> ```html
> <i class="mda-icon-button">some_icon</i>
>
> <i class="mda-icon-button disabled some_icon_classes"></i>
> ```


&nbsp;
#### TEXTAREA

> **Class:** 'mda-textarea'
>
> **SubClasses:** 'disabled', 'error'
>
> **Example:**
> ```html
> <label class="mda-label" for="text">Some Text</label>
> <textarea id="text" class="mda-textarea">Some content...</textarea>
>
> <label class="mda-label" for="text">Some Text</label>
> <textarea id="text" disabled class="mda-textarea disabled">Some content...</textarea>
>
> <label class="mda-label error" for="text">Some Text</label>
> <textarea id="text" class="mda-textarea error">Some content...</textarea>
> ```


&nbsp;
#### INPUT CHECKBOX

> **Class:** NO CLASS
>
> **SubClasses:** 'disabled'
>
> **Example:**
> ```html
> <input id="check" type="checkbox">
> <label class="mda-label" for="check">Some text</label>
>
> <input id="check" type="checkbox" disabled class="disabled">
> <label class="mda-label" for="check">Some text</label>
> ```


&nbsp;
#### INPUT RADIO

> **Class:** NO CLASS
>
> **SubClasses:** NONE
>
> **Example:**
> ```html
> <input id="option01" type="radio">
> <label class="mda-label" for="option01">Some text</label>
> ```


&nbsp;
#### SELECT

> **Class:** 'mda-select'
>
> **SubClasses:** 'mda-select__simple', 'disabled', 'error'
>
> **Example:**
> ```html
> <label class="mda-label" for="selector03">Some text</label>
> <div class="mda-select">
>   <select id="selector03">
>     <option value="1">Option Text 01</option>
>     <option value="2">Option Text 02</option>
>   </select>
> </div>
>
> <label class="mda-label" for="selector05">Some text</label>
> <div class="mda-select mda-select__simple">
>   <select id="selector05">
>     <option value="1">Option Text 01</option>
>     <option value="2">Option Text 02</option>
>   </select>
> </div>
>
> <label class="mda-label" for="selector06">Some text</label>
> <div class="mda-select disabled">
>   <select id="selector06" disabled>
>     <option value="1">Option Text 01</option>
>     <option value="2">Option Text 02</option>
>   </select>
> </div>
>
> <label class="mda-label error" for="selector08">Some text</label>
> <div class="mda-select error">
>   <select id="selector08">
>     <option value="1">Option Text 01</option>
>     <option value="2">Option Text 02</option>
>   </select>
> </div>
>
> <label class="mda-label error" for="selector12">Some text</label>
> <div class="mda-select mda-select__simple error">
>   <select id="selector12">
>     <option value="1">Option Text 01</option>
>     <option value="2">Option Text 02</option>
>   </select>
> </div>
> ```


&nbsp;
#### INPUT TEXT, INPUT NUMBER, INPUT PASSWORD

> **Class:** 'mda-input'
>
> **SubClasses:** 'disabled', 'error'
>
> **Example:**
> ```html
> <label class="mda-label" for="input23">Some text</label>
> <input id="input23" class="mda-input" type="text">
>
> <label class="mda-label" for="input25">Some text</label>
> <input id="input25" class="mda-input disabled" disabled type="number">
>
> <label class="mda-label error" for="input26">Some text</label>
> <input id="input26" class="mda-input error" type="password">
> ```


&nbsp;
#### INPUT SEARCH (Icon inside)

> **Class:** 'mda-input__search'
>
> **SubClasses:** NONE
>
> **Example:**
> ```html
> <label class="mda-label" for="inputSearch">Some text</label>
> <div class="mda-input__search">
>   <input id="inputSearch" class="mda-input" type="text">
> </div>
> ```

## Mixins Library

By importing `components.styles.scss` file, you have some mixins available.

You can also directly import the mixins library, as follows:

```
@import '~@lunaeme/circe-core/styles/app.mixins.scss';
```

## Available Mixins

>```
> @mixin createFlexBox($flexDirection, $alignItems, $justifyContent, $wrapMode) {
>```
> Mixin for apply flex properties to container.

## Services Use

You need to declare `BoxModelService`, `EventsService` and/or `ToolService` providers into your module `providers` section.

Then you can use methods through dependency injection. Some methods are available as static.

## Available Services

#### BoxModelService

Set of methods to make box model task easy:

> ```
> public readCssUnits(expression: string): ProcessedUnitObject
> ```
> This method transforms unit string `ex. '20px'` into an object
> 
> `{ value: 20, unit: 'px' }`.
> 
> Units allowed are: 'px' and '%'.
 
 
&nbsp;
> ```
> public processSizeString(sizeString: string): SizeObject
> ```
> This method transforms size string `ex. '20px 50px'` into an object
>  
> `{ width: 50, height: 20 }`.
>  
> Size strings allowed are: 'XXpx', 'XX%', 'XXpx YYpx', 'XX% YY%'.


&nbsp;
> ```
> public getElement(element: string | SelectDomElementObject): Element
> ```
> Receives string or SelectDomElementObject:
>  
> `ex. { name: 'some_class', type: 'class' }`.
>  
> And returns DOM Element for your selection. If method receives string, it will assume that type is `class` by default.
> 
> Types allowed: 'class', 'tag', 'id'.


&nbsp;
> ```
> public getBoxModel(elementId: ElementId, boxModelType?: BoxModelType): BoxModelSwapObject
> ```
> Receives ElementId complex data and returns analysis object about box model of this ElementId.
>  
> ElementId can be: string or array of strings (In this case we assume the type is class).
> ElementId can be: SelectDomElementObject or array of SelectDomElementObject.
> SelectDomElementObject works like previous method explains.
> Optional parameter boxModelType can be: 'horizontal' or 'vertical'. Default value is 'vertical'.
>  
> The returned object, BoxModelSwapObject, has the next form:
>
> ```
> {
>   type: BoxModelType,         // ('horizontal' or 'vertical').
>   boxModel: number,           // Width or Height (depends on type) of element id, or the addition of all element id's widths or heights if elementId received is array.
>   boxModelAdditions: number,  // Width or Height (depends on type) of element id additions.
>                               // Additions are paddings, margins and borders.
>   boxModelAggregated: number, // The sum of boxModel and boxModelAdditions.
>   boxModelExtracted: number   // The substraction of boxModelAdditions from boxModel.
> }
> ```


&nbsp;
#### EventsService

Set of methods about DOM events handlers:

> ```
> public preventNeededEvent(event: Event, immediatePropagation?: boolean): void
> ```
> This method receives any kind of DOM Event and boolean parameter which indicates if method applies `event.stopPropagation()` or `event.stopImmediatePropagation()`.


&nbsp;
> ```
> public preventNoNeededEvent(event: Event, immediatePropagation?: boolean): void
> ```
> This method works in the same way than the previous one and also executes `event.preventDefault()` method.


&nbsp;
> ```
> public scrollTop(element?: SelectDomElementObject): void
> ```
> Moves vertical scroll of the element given to top. Element has the form of SelectDomElementObject:
>
> `{ name: string, type: SelectDomElementObjectType }`
>
> Property `name` is some element name identifier.
>
> Property `type` only can be: `tag`, `class` or `id`.
>
> If element is not given, de default will be:
>
> `{ name: 'main', type: 'tag' }`


&nbsp;
#### ToolService

Several help methods:

> ```
> public static getValueFromMultiLevelObject(object: any, key: string, separator?: string): any
> ```
> This method uses a reducer to check inside the multi-level `object` given and finds the value for `key` given.
>
> Parameter `key` is a string where levels are indicated using an optional `separator` character.
>
> If `separator` is not given, default separator will be the dot character: `.`
>
> Example:
> ```
> const person = {
>   name: 'John Black',
>   age: 43,
>   sons: {
>     kevin: {
>       name: 'Kevin Black',
>       age: 15
>     },
>     mary: {
>       name: 'Mary Black',
>       age: 11
>     }
>   }
> }
>
> const key = 'sons.kevin.age';
>
> const kevinAge = ToolsService.getValueFromMultiLevelObject(person, key);
> ```
> Variable `kevinAge` will be `15`.


&nbsp;
> ```
> public static formatString(string: string): string
> ```
> Transforms string into start case string.


&nbsp;
> ```
> public static waitFor(milliseconds: number): void
> ```
> Stops the execution flow during `milliseconds` given.


&nbsp;
> ```
> public identifier(index: number, item: any): any
> ```
> This method is for use in `trackBy` in *ngFor directives.

## Repo

<https://github.com/nulpas/circe/tree/master/projects/core>
