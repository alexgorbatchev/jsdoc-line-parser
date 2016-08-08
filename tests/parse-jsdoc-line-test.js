import { expect } from 'chai';
import parseJSDocLine from '../parse-jsdoc-line';

// clear iTerm2 console scroll back
// https://www.iterm2.com/documentation-escape-codes.html
process.stdout.write('\u001b]1337;ClearScrollback\u0007');

describe('parse-jsdoc-line', () => {
  describe('spec', () => {
    const opts = {
      name: true,
      types: true,
      description: true,
    };

    it('name only', () =>
      expect(parseJSDocLine(`@param somebody`, opts)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
      })
    );

    it('name and type', () =>
      expect(parseJSDocLine(`@param {string} somebody`, opts)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        types: [
          'string',
        ],
      })
    );

    it('name, type, and description', () =>
      expect(parseJSDocLine(`@param {string} somebody Somebody's name.`, opts)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
        types: [
          'string',
        ],
      })
    );

    it('name, type, and description, with a hyphen before the description', () =>
      expect(parseJSDocLine(`@param {string} somebody - Somebody's name.`, opts)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Somebody\'s name.',
        types: [
          'string',
        ],
      })
    );

    it('documenting parameter\'s properties', () => {
      expect(parseJSDocLine(`@param {string} employee.name - The name of the employee.`, opts)).to.deep.equal({
        tag: 'param',
        name: 'employee.name',
        description: 'The name of the employee.',
        types: [
          'string',
        ],
      });
    });

    it('documenting properties of values in an array', () =>
      expect(parseJSDocLine(`@param {string} employees[].name - The name of an employee.`, opts)).to.deep.equal({
        tag: 'param',
        name: 'employees[].name',
        description: 'The name of an employee.',
        types: [
          'string',
        ],
      })
    );

    it('an optional parameter (using JSDoc syntax)', () =>
      expect(parseJSDocLine(`@param {string} [somebody] - Somebody's name.`, opts)).to.deep.equal({
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
      expect(parseJSDocLine(`@param {string=} somebody - Somebody's name.`, opts)).to.deep.equal({
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
      expect(parseJSDocLine(`@param {string} [somebody=John Doe] - Somebody's name.`, opts)).to.deep.equal({
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
      expect(parseJSDocLine(`@param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.`, opts)).to.deep.equal({
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
      expect(parseJSDocLine(`@param {*} somebody - Whatever you want.`, opts)).to.deep.equal({
        tag: 'param',
        name: 'somebody',
        description: 'Whatever you want.',
        types: [
          '*',
        ],
      })
    );

    it('allows a parameter to be repeated', () =>
      expect(parseJSDocLine(`@param {...number} num - A positive or negative number.`, opts)).to.deep.equal({
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
});
