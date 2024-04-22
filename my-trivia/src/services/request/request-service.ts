import axios from 'axios'
import type {
    GetRequestInterface,
    DeleteRequestInterface,
    PostRequestInterface,
    PutRequestInterface,
} from './request-service-types'

const BASE_URL = 'https://opentdb.com/api.php?'

export class RequestService {
    private path: string

    constructor(url: string) {
        this.path = `${BASE_URL}${url}`
    }

    async get<ParamsType>({ params }: GetRequestInterface<ParamsType>) {
        return await axios.get(this.path, {
            params,
        })
    }

    async post<ParamsType>({ data, params }: PostRequestInterface<ParamsType>) {
        return await axios.post(this.path, data, {
            params,
        })
    }

    async put<ParamsType>({ data, params }: PutRequestInterface<ParamsType>) {
        return await axios.put(this.path, data, {
            params,
        })
    }

    async del<ParamsType>({ params }: DeleteRequestInterface<ParamsType>) {
        return await axios.delete(this.path, {
            params,
        })
    }
}
