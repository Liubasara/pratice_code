import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import { concat } from 'lodash';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Demo {
    constructor(msg) {
        this.msg = msg;
    }
    sayMsg() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.resolve('12qqqq356565');
            console.log(this.msg);
            console.log(concat([1, 2, 3], 3));
            console.log('test');
            return 8989891010101;
        });
    }
}

var Item = /*#__PURE__*/function () {
  function Item() {
    _classCallCheck(this, Item);
  }

  _createClass(Item, [{
    key: "sayHi",
    value: function sayHi() {
      console.log('hi, item...');
    }
  }]);

  return Item;
}();

var index = demoModule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve('demo');

          case 2:
            console.log('Hi.I am a demo module.');
            console.log(concat([1, 2, 3], [5], 5, 6, 7));
            new Demo(56).sayMsg();
            new Item().sayHi();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function demoModule() {
    return _ref.apply(this, arguments);
  };
}();

export default index;
