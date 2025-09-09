"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./apis/routes/user.route"));
const upload_route_1 = __importDefault(require("./apis/routes/upload.route"));
const customers_route_1 = __importDefault(require("./apis/routes/customers.route"));
const orders_route_1 = __importDefault(require("./apis/routes/orders.route"));
const campaign_route_1 = __importDefault(require("./apis/routes/campaign.route"));
const segmentRules_route_1 = __importDefault(require("./apis/routes/segmentRules.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", user_route_1.default);
app.use("/api/uploads", upload_route_1.default);
app.use("/api/customers", customers_route_1.default);
app.use("/api/orders", orders_route_1.default);
app.use("/api/campaigns", campaign_route_1.default);
app.use("/api/segmentRules", segmentRules_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map