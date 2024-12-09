import { SdcpWebsocketRepository } from "./data/repositories/SdcpWebsocketRepository";
import { SdcpRepository } from "./domain/repositories/SdcpRepository";
import { GetStatusUseCase } from "./domain/usecases/GetStatusUseCase";

const _env = import.meta.env;

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

export type Repositories = {
    sdcp: SdcpRepository;
};

export function getCompositionRoot() {
    const repositories: Repositories = {
        sdcp: new SdcpWebsocketRepository(),
    };

    return {
        getStatus: new GetStatusUseCase(repositories),
    };
}
