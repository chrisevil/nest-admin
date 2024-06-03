"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMathExpr = exports.createCaptcha = void 0;
const svg_captcha_1 = __importDefault(require("svg-captcha"));
function createCaptcha() {
    return svg_captcha_1.default.createMathExpr({
        size: 4,
        ignoreChars: '0o1iIl',
        noise: 2,
        color: true,
        background: '#eee',
        fontSize: 50,
        width: 110,
        height: 38,
    });
}
exports.createCaptcha = createCaptcha;
function createMathExpr() {
    const options = {};
    return svg_captcha_1.default.createMathExpr(options);
}
exports.createMathExpr = createMathExpr;
//# sourceMappingURL=captcha.util.js.map