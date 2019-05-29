# Circe :: Angular Modal Component

Modal layer for use through `<ng-content>` tag.

## Compatibility

Angular v.7.2.15

## Installation

Run `npm install @lunaeme/circe-modal` or

run`yarn add @lunaeme/circe-modal`.

## Use

You need to import `ModalModule` into your module `imports` section.

Then use this way:

```html
<cc-modal [title]="'My Content'">
  Your content here
</cc-modal>
```

## Inputs

>```typescript
> @Input() title: string;
>```
Set title on top bar.


&nbsp;
>```typescript
> @Input() titleClass: string;
>```
If you need to apply any css class on title.


&nbsp;
>```typescript
> @Input() titleBackground: boolean;
>```
If you want to set background color (gray) on title bar.


&nbsp;
>```typescript
> @Input() closeButton: boolean;
>```
If you want to have close icon button on title bar.


&nbsp;
>```typescript
> @Input() modalBackground: boolean;
>```
If you want to set transparency layer around modal window.


&nbsp;
>```typescript
> @Input() clickOutside: boolean = false;
>```
If you want modal window closes by clicking outside.

DEFAULT: false


&nbsp;
>```typescript
> @Input() clickOutsideExceptions: Array<string> = [];
>```
Array of DOM id's over which the modal window will not close.

DEFAULT: []


&nbsp;
>```typescript
> @Input() fixed: string;
>```
String that set the size of modal window. If it is not set, the window will automatically take the size of the content.

This will take the following values:

```html
<!-- Set modal to 250px width and 250px height: -->
<cc-modal [title]="'My Content'" [fixed]="'250px'">
  Your content here
</cc-modal>

<!-- Set modal to 50% width and 50% height: -->
<cc-modal [title]="'My Content'" [fixed]="'50%'">
  Your content here
</cc-modal>

<!-- Set modal to 400px width and 250px height: -->
<cc-modal [title]="'My Content'" [fixed]="'250px 400px'">
  Your content here
</cc-modal>

<!-- Set modal to 70% width and 40% height: -->
<cc-modal [title]="'My Content'" [fixed]="'40% 70%'">
  Your content here
</cc-modal>
```

## Outputs

```typescript
@Output() close: EventEmitter<boolean> = new EventEmitter();
```
Event that triggers the closing of the modal window.

## Repo

<https://github.com/nulpas/circe/tree/master/projects/modal>
