"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastBaseGateway = exports.BaseGateway = void 0;
const business_event_constant_1 = require("./business-event.constant");
class BaseGateway {
    gatewayMessageFormat(type, message, code) {
        return {
            type,
            data: message,
            code,
        };
    }
    handleDisconnect(client) {
        client.send(this.gatewayMessageFormat(business_event_constant_1.BusinessEvents.GATEWAY_CONNECT, 'WebSocket 断开'));
    }
    handleConnect(client) {
        client.send(this.gatewayMessageFormat(business_event_constant_1.BusinessEvents.GATEWAY_CONNECT, 'WebSocket 已连接'));
    }
}
exports.BaseGateway = BaseGateway;
class BroadcastBaseGateway extends BaseGateway {
    broadcast(event, data) { }
}
exports.BroadcastBaseGateway = BroadcastBaseGateway;
//# sourceMappingURL=base.gateway.js.map