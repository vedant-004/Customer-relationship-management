"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const response_1 = require("./utils/response");
const connectDb_1 = __importDefault(require("./utils/connectDb"));
const PORT = process.env.PORT || 3000;
(0, connectDb_1.default)();
app_1.default.get("/", (req, res) => {
    const response = (0, response_1.success)("Welcome to the Server", 200);
    res.status(response.status).json(response);
});
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map