"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Server");
const port = process.env.PORT;
Server_1.server.listen(port, () => {
    console.log(`Servidor rodando na porta  ${port}`);
});
//# sourceMappingURL=index.js.map