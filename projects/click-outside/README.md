# Circe :: Angular Click Outside Directive

Directive that emits event when clicking outside of the element where directive applies.

The `$event` emitted is `undefined`.

## Compatibility

Angular >+ v.8.2.10

## Installation

Run `npm install @lunaeme/circe-click-outside` or

run `yarn add @lunaeme/circe-click-outside`.

## Use

You need to import `ClickOutsideModule` into your module `imports` section.

Then use this way:

```html
<div
  ccClickOutside
  (clickOutside)="clickOutsideActionMethod()">
  Some content...
</div>
```

## Inputs

>```typescript
> @Input() apply: boolean = true;
>```
You can dcide through this boolean input if directive works or not.

DEFAULT: true 


&nbsp;
>```typescript
> @Input() exceptions: Array<string> = [];
>```
Array composed by external DOM id's that by clicking on them, the clickOutside event is not emitted.

DEFAULT: []

## Outputs

>```typescript
> @Output() clickOutside: EventEmitter<undefined> = new EventEmitter();
>```
Emits event when clicking outside of the element where directive applies.

## Repo

<https://github.com/nulpas/circe/tree/master/projects/click-outside>
