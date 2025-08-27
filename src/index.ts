import { server } from "./Server";

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Servidor rodando na porta  ${port}`);
});