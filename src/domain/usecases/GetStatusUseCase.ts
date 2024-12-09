import { Repositories } from "../../CompositionRoot";
import { PrinterStatus } from "../entities/Printer";
import { WebsocketConnection } from "../entities/WebsocketConnection";

export class GetStatusUseCase {
    constructor(private readonly repositories: Repositories) {}

    execute(ws: WebsocketConnection): Promise<PrinterStatus> {
        return this.repositories.sdcp.getStatus({
            id: "f25273b12b094c5a8b9513a30ca60049",
            mainboardId: "fedaa796a8fa0100",
            ws,
        });
    }
}
