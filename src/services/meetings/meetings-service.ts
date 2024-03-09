import { meetingsApi } from "../api/meetings/meetings-api";

export const meetingsService = {
  createByToken: async (token: string) => {
    return await meetingsApi.createByToken(token)
  },
}
