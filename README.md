# jsdoc-line-parser

[![GratiPay](https://img.shields.io/gratipay/user/alexgorbatchev.svg)](https://gratipay.com/alexgorbatchev/)
![Downloads](https://img.shields.io/npm/dm/jsdoc-line-parser.svg)
![Version](https://img.shields.io/npm/v/jsdoc-line-parser.svg)

A basic JSDoc line parser that could be used to parse a single line of JSDoc documentation.

**If you want to add more tag specific functionality, PRs are welcomed!**

## Installation

```
npm install --save-dev jsdoc-line-parser
```

## Usage

The module exports one function that returns an object. For specific results, please see the test file.

```
import parseJSDocLine from 'jsdoc-line-parser';
parseJSDocLine(...);

// {
//   tag: '...',
//   ...
// }
```

## JSDoc Support

This plugin is **not meant** to be a comprehensive implementation of JSDoc. The goal is to provide a small subset of functionality to facilitate beautifully rendered documentation. Majority of other things could be achieved with Markdown.

The following constructs are supported:

### @param
* name only
  `@param somebody`
* name and type
  `@param {string} somebody`
* name and description
  `@param somebody Somebody's name.`
* name, type, and description
  `@param {string} somebody Somebody's name.`
* name and description, with a hyphen before the description
  `@param somebody - Somebody's name.`
* name, type, and description, with a hyphen before the description
  `@param {string} somebody - Somebody's name.`
* documenting parameter's properties
  `@param {string} employee.name - The name of the employee.`
* documenting properties of values in an array
  `@param {string} employees[].name - The name of an employee.`
* an optional parameter (using JSDoc syntax)
  `@param {string} [somebody] - Somebody's name.`
* an optional parameter (using Google Closure Compiler syntax)
  `@param {string=} somebody - Somebody's name.`
* an optional parameter and default value
  `@param {string} [somebody=John Doe] - Somebody's name.`
* allows one type OR another type (type union)
  `@param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.`
* allows any type
  `@param {*} somebody - Whatever you want.`
* allows a parameter to be repeated
  `@param {...number} num - A positive or negative number.`

### @method
* method name only
  `@method methodName`

### @returns
* type only
  `@returns {Array}`
* type and description, with a hyphen before the description
  `@returns {Array} - Somebody's name.`

### @version
* complex version number
  `@version 1.2.3-alpha3`

## License

ISC
