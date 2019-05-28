# Circe :: Angular Spinner Component

Several css spinner elements width optional marquee texts.

## Installation

Run `npm install @lunaeme/circe-spinner` or

run `yarn add @lunaeme/circe-spinner`.

## Use

You need to import `SpinnerModule` into your module `imports` section.

Then use this way:

```
<cc-spinner></cc-spinner>
```

## Inputs

```
@Input() type: SpinnerType = 'default';
· Defines different designs of spinners.
  All possible options are: 'none', 'default', 'grid', 'cube-grid', 'ellipsis', 'fading-circle', 'pulse'
  DEFAULT: default

@Input() size: number = 100;
· Set the spinner size in pixels (px).
  Applies to width and height in case that they are square.
  Otherwise skip height and makes it proportional.
  DEFAULT: 100
  * Types 'grid' and 'ellipsis' can not be resized.
    If size is set, it will be ignored.

@Input() tooltip: string;
· Set tooltip with text defined on spinner layer MouseOn event.
  DEFAULT: undefined

@Input() textMarquee: string | Array<string>;
· Phrase or array of phrases that will be shown under de spiner element.
  If it is array, a marquee appears with intermittent messages.
  DEFAULT: undefined

@Input() textMarqueeInterval: number = 3000;
· Time interval in milliseconds to show marquee intermittent messages if previous input is array.
  DEFAULT: 3000
```

## Outputs

No outputs defined.

## Repo

<https://github.com/nulpas/circe/tree/master/projects/spinner>
