import { expect } from 'chai';
import parseJSDocLine from '../parse-jsdoc-line';
import iterm2ClearScrollback from 'iterm2-clear-scrollback';

iterm2ClearScrollback();

describe('parse-jsdoc-line', () => {
  describe('@param', () => {
    it('name only', () =>
      expect(parseJSDocLine(`@param somebody`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
      })
    );

    it('name and type', () =>
      expect(parseJSDocLine(`@param {string} somebody`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        types: [
          'string',
        ],
      })
    );

    it('name and description', () =>
      expect(parseJSDocLine(`@param somebody Somebody's name.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
      })
    );

    it('name, type, and description', () =>
      expect(parseJSDocLine(`@param {string} somebody Somebody's name.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
        types: [
          'string',
        ],
      })
    );

    it('name and description, with a hyphen before the description', () =>
      expect(parseJSDocLine(`@param somebody - Somebody's name.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
      })
    );

    it('name, type, and description, with a hyphen before the description', () =>
      expect(parseJSDocLine(`@param {string} somebody - Somebody's name.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
        types: [
          'string',
        ],
      })
    );

    it('documenting parameter\'s properties', () => {
      expect(parseJSDocLine(`@param {string} employee.name - The name of the employee.`)).to.deep.equal({
        tag: 'param',
        name: 'employee.name',
        description: 'The name of the employee.',
        types: [
          'string',
        ],
      });
    });

    it('documenting properties of values in an array', () =>
      expect(parseJSDocLine(`@param {string} employees[].name - The name of an employee.`)).to.deep.equal({
        tag: 'param',
        name: 'employees[].name',
        description: 'The name of an employee.',
        types: [
          'string',
        ],
      })
    );

    it('an optional parameter (using JSDoc syntax)', () =>
      expect(parseJSDocLine(`@param {string} [somebody] - Somebody's name.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
        optional: true,
        types: [
          'string',
        ],
      })
    );

    it('an optional parameter (using Google Closure Compiler syntax)', () =>
      expect(parseJSDocLine(`@param {string=} somebody - Somebody's name.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
        optional: true,
        types: [
          'string',
        ],
      })
    );

    it('an optional parameter and default value', () =>
      expect(parseJSDocLine(`@param {string} [somebody=John Doe] - Somebody's name.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
        optional: true,
        defaultValue: 'John Doe',
        types: [
          'string',
        ],
      })
    );

    it('allows one type OR another type (type union)', () =>
      expect(parseJSDocLine(`@param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name, or an array of names.',
        optional: true,
        defaultValue: 'John Doe',
        types: [
          'string',
          'string[]',
        ],
      })
    );

    it('allows any type', () =>
      expect(parseJSDocLine(`@param {*} somebody - Whatever you want.`)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Whatever you want.',
        types: [
          '*',
        ],
      })
    );

    it('allows a parameter to be repeated', () =>
      expect(parseJSDocLine(`@param {...number} num - A positive or negative number.`)).to.deep.equal({
        tag: 'param',
        name: 'num',
        description: 'A positive or negative number.',
        repeatable: true,
        types: [
          'number',
        ],
      })
    );
  });

  describe('@method', () => {
    it('method name only', () =>
      expect(parseJSDocLine(`@method methodName`)).to.deep.equal({
        tag: 'method',
        name: 'methodName',
      })
    );
  });

  describe('@returns', () => {
    it('type only', () =>
      expect(parseJSDocLine(`@returns {Array}`)).to.deep.equal({
        tag: 'returns',
        types: [
          'Array'
        ],
      })
    );

    it('type and description, with a hyphen before the description', () =>
      expect(parseJSDocLine(`@returns {Array} - Somebody's name.`)).to.deep.equal({
        tag: 'returns',
        description: 'Somebody\'s name.',
        types: [
          'Array'
        ],
      })
    );
  });

  describe('@version', () => {
    it.only('complex version number', () =>
      expect(parseJSDocLine(`@version 1.2.3-alpha3`)).to.deep.equal({
        tag: 'version',
        value: '1.2.3-alpha3',
      })
    );
  });
});
