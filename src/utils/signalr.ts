import * as signalR from "@microsoft/signalr";
import { TOKEN } from "../constants/constants";
import { log } from "@grpc/grpc-js/build/src/logging";
import { decode, isTokenValid } from "./jwt";

export class RemoteSignalrService {
  public hubConnection!: signalR.HubConnection;

  constructor(hubConnection: signalR.HubConnection) {
    this.hubConnection = hubConnection;
  }

  start() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://prn231hostingc-001-site1.ftempurl.com/chathub", {
        accessTokenFactory: () => sessionStorage.getItem(TOKEN) ?? "",
      })
      .build();

    this.hubConnection
      .start()
      .then((data) => {})
      .catch((err) => console.log(err));
  }

  public async onConnected(handleMethod: (data: any) => void) {
    this.hubConnection.on("Connected", (data) => {
      handleMethod(data);
    });
  }

  public async sendMessage(data: any) {
    this.hubConnection
      .invoke("SendMessageAsync", {
        receivedById: data.receivedById,
        content: data.content,
      })
      .then(() => {
        console.log(data.receivedById);
      });
  }

  public onReceivedMessage(handleMethod: (data: any) => void) {
    this.hubConnection.on("ReceivedMessage", (data) => {
      handleMethod(data);
    });
  }

  public async getChatRoom(getRequest: {
    finderId: number;
    numberOfMessage: number;
    pageOfMessages: number;
  }) {
    try {
      this.hubConnection
        .invoke(
          "GetChatRoomMessageAsync",
          getRequest.finderId,
          getRequest.numberOfMessage,
          getRequest.pageOfMessages
        )
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  public async onReceivedChatRoom(handleMethod: (data: any) => void) {
    this.hubConnection.on("ReceivedChatRoom", (data) => {
      handleMethod(data);
      console.log(data);
    });
  }

  public static async initializeService(): Promise<RemoteSignalrService> {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://prn231hostingc-001-site1.ftempurl.com/chathub", {
        accessTokenFactory: () => sessionStorage.getItem(TOKEN) ?? "",
      })
      .build();

    await hubConnection
      .start()
      .then((data) => {})
      .catch((err) => console.log(err));
    return new RemoteSignalrService(hubConnection);
  }
}
