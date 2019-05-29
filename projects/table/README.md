# Circe :: Angular Table Component

Table for show data structures.

## Compatibility

Angular v.7.2.15

## Installation

Run `npm install @lunaeme/circe-table` or

run `yarn add @lunaeme/circe-table`.

## Use

You need to import `TableModule` into your module `imports` section.

Then use this way:

```html
<cc-table></cc-table>
```

## Inputs

>```typescript
> @Input() dataSet: Array<any>;
>```
--


&nbsp;
>```typescript
> @Input() config: TableConfig;
>```
--


&nbsp;
>```typescript
> @Input() selectColumnsInput: any;
>```
--


&nbsp;
>```typescript
> @Input() createSelectColumnsInput: boolean = true;
>```
--


&nbsp;
>```typescript
> @Input() textOnUndefined: string | Array<string>;
>```
--


&nbsp;
>```typescript
> @Input() textOnNull: Array<string>;
>```
--


&nbsp;
>```typescript
> @Input() errorMessages: string;
>```
--

## Outputs

>```typescript
> @Output() selectColumns: EventEmitter<any> = new EventEmitter();
>```
--


&nbsp;
>```typescript
> @Output() createSelectColumns: EventEmitter<boolean> = new EventEmitter();
>```
--


&nbsp;
>```typescript
> @Output() radioColumnsChange: EventEmitter<any> = new EventEmitter();
>```
--


&nbsp;
>```typescript
> @Output() checkboxColumnsChange: EventEmitter<Array<any>> = new EventEmitter();
>```
--


&nbsp;
>```typescript
> @Output() iconAction: EventEmitter<IconActionEvent> = new EventEmitter();
>```
--

## Two Way Data binding

>```typescript
> @Input() set radioColumns(value: any)
>```
--


&nbsp;
>```typescript
> @Input() set checkboxColumns(value: Array<any>)
>```
--

## Repo

<https://github.com/nulpas/circe/tree/master/projects/table>
