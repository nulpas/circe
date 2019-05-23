# Circe :: Angular On Dom Activity Directive

Directive that emits event when component appears on DOM and emits other event when component goes from DOM.

The `$event` emitted is the DOM element (HTMLElement type) where the directive works.

## Installation

Run `npm install @lunaeme/circe-on-dom-activity` or `yarn add @lunaeme/circe-on-dom-activity`.

## Use

You need to import `OnDomActivityModule` into your module `imports` section.

Then use this way:

```
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

```
@Output() comeToDom: EventEmitter<HTMLElement> = new EventEmitter();
· Emits DOM element object when it appears on DOM.

@Output() goesFromDom: EventEmitter<HTMLElement> = new EventEmitter();
· Emits DOM element object when it is destroyed from DOM.
```

## Repo

<https://github.com/nulpas/circe/tree/master/projects/on-dom-activity>
