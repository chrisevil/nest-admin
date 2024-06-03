"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitData1707996695540 = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const sql = node_fs_1.default.readFileSync(node_path_1.default.join(__dirname, '../../deploy/sql/nest_admin.sql'), 'utf8');
class InitData1707996695540 {
    async up(queryRunner) {
        await queryRunner.query(sql);
    }
    async down(queryRunner) {
    }
}
exports.InitData1707996695540 = InitData1707996695540;
//# sourceMappingURL=1707996695540-initData.js.map