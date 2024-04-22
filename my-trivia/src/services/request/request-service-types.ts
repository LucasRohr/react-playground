interface GetRequestInterface<ParamsType> {
    params: ParamsType
}

interface DeleteRequestInterface<ParamsType> extends GetRequestInterface<ParamsType> {}

interface PostRequestInterface<ParamsType> {
    data: object
    params: ParamsType
}

interface PutRequestInterface<ParamsType> extends PostRequestInterface<ParamsType> {}

export type {
    GetRequestInterface,
    DeleteRequestInterface,
    PostRequestInterface,
    PutRequestInterface,
}
