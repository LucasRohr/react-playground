interface BaseRequestInterface<ParamsType> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: ParamsType
}

interface DataRequestInterface<ParamsType> {
    data: object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: ParamsType
}

export type { BaseRequestInterface, DataRequestInterface }
