"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFile = exports.FileConstraint = void 0;
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
function checkFileAndLimit(file, limits = {}) {
    if (!('mimetype' in file))
        return false;
    if (limits.mimetypes && !limits.mimetypes.includes(file.mimetype))
        return false;
    if ((0, lodash_1.has)(file, '_buf')
        && Buffer.byteLength(file._buf) > limits.fileSize)
        return false;
    return true;
}
let FileConstraint = class FileConstraint {
    validate(value, args) {
        const [limits = {}] = args.constraints;
        const values = args.object[args.property];
        const filesLimit = limits.files ?? 0;
        if (filesLimit > 0 && (0, lodash_1.isArray)(values) && values.length > filesLimit)
            return false;
        return checkFileAndLimit(value, limits);
    }
    defaultMessage(_args) {
        return `The file which to upload's conditions are not met`;
    }
};
exports.FileConstraint = FileConstraint;
exports.FileConstraint = FileConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isFile' })
], FileConstraint);
function IsFile(limits, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [limits],
            validator: FileConstraint,
        });
    };
}
exports.IsFile = IsFile;
//# sourceMappingURL=file.constraint.js.map