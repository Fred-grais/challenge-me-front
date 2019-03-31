import ActionCable, {
  Cable,
  ChannelNameWithParams,
  Channel,
  CreateMixin,
} from 'actioncable';

class ActionCableInterface {
  public static readonly SOCKET_SERVER_URL: string = process.env
    .VUE_APP_SOCKET_SERVER_URL as string;
  // public static readonly SOCKET_SERVER_URL: string = 'ws://localhost:3000/cable';
  private static instance: ActionCableInterface;

  private cable!: Cable;

  private constructor() {
    this.createConsumer();
  }

  public subscribeToChannel(
    channelNameWithParams: ChannelNameWithParams,
    channelImplementation: CreateMixin,
  ): Channel {
    return this.cable.subscriptions.create(
      channelNameWithParams,
      channelImplementation,
    );
  }

  private createConsumer() {
    const token = window.localStorage.getItem('default_auth_token');
    if (token) {
      this.cable = ActionCable.createConsumer(
        ActionCableInterface.SOCKET_SERVER_URL + `?auth=${btoa(token)}`,
      );
    } else {
      throw new Error(
        'User must be logged in to initiate a Websocket connection',
      );
    }
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }
}

export default ActionCableInterface;
