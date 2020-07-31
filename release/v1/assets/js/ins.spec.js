var ins = require('../../assets/js/ins');
const getType = require('jest-get-type');
var win = require('@stencil/core/testing');

let element = 'body';
let query = ins(element);
let root = new win.TestWindow();

describe('ins.js rendering', () => {
    it('should be valid js function', async () => {
        let type = getType(ins);

        expect(type).toEqual('function');
    });
});

describe('Locating DOM elements using ins selector', () => {
    it('should be valid js function', async () => {
        let type = getType(query);

        expect(type).toEqual('object');
    });
});

describe('ins.js', () => {
    it('checks if first param *element* is a string type', async () => {
        let type = getType(element);

        expect(type).toEqual('string');
    });
});

describe('ins.js', () => {
    let query = ins(element, root);

    it('checks if second param *root* exist and is a object type', async () => {
        expect(getType(query)).toEqual('object');
        expect(getType(element)).toEqual('string');
        expect(getType(root)).toEqual('object');
    });
});

// test for insRouter

// describe('insRouter', () => {
//     it('should be valid js function', async () => {
//         let type = getType(ins);
//
//         expect(ins.insRouter).toEqual('function');
//     });
// });
