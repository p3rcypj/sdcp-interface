const _env = import.meta.env;

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

export type Repositories = {};

export function getCompositionRoot() {
    const _repositories: Repositories = {};

    return {};
}
