import { socketService } from "../socket";


export const appService = {
  initializeServices: async () => {
    await socketService.initialize();
    //EventService.initialize()
  }
}
