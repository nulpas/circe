# Circe :: Angular On Dom Activity Directive

Directive that emits event when component appears on DOM and emits other event when component goes from DOM.

The `$event` emitted is the DOM element (HTMLElement type) where the directive works.

## Compatibility

Angular v.7.2.15

## Installation

Run `npm install @lunaeme/circe-on-dom-activity` or
 
run `yarn add @lunaeme/circe-on-dom-activity`.

## Use

You need to import `OnDomActivityModule` into your module `imports` section.

Then use this way:

```html
<div
  ccOnDomActivity
  (comeToDom)="comeToDomActionMethod($event)"
  (goesFromDom)="goesFromDomActionMethod($event)">
  Some content...
</div>
```

## Inputs

No inputs defined.

## Outputs

>```typescript
> @Output() comeToDom: EventEmitter<HTMLElement> = new EventEmitter();
>```
Emits DOM element object when it appears on DOM.


&nbsp;
>```typescript
> @Output() goesFromDom: EventEmitter<HTMLElement> = new EventEmitter();
>```
Emits DOM element object when it is destroyed from DOM.

## Repo

<https://github.com/nulpas/circe/tree/master/projects/on-dom-activity>
