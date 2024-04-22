import { questionsListFactory } from '@factories'
import { RequestService } from '../request/request-service'
import { GetQuestionsParamsInterface } from './questions-service-types'

export class QuestionsService {
    private requestService = new RequestService('')

    async getQuestions(params: GetQuestionsParamsInterface) {
        try {
            const response = await this.requestService.get<GetQuestionsParamsInterface>({ params })
            const parsedResponse = questionsListFactory(response.data)

            return parsedResponse
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
        }
    }
}
