class RocketChatIframeCommander {
  private static instance: RocketChatIframeCommander;
  public contentWindow!: Window;

  private constructor() {}

  public loginToChat(loginPromise: Promise<any>): Promise<any> {
    return loginPromise
      .then((authToken: { authToken: string }) => {
        this.logoutFromChat();
        this.executeActionOnIframe({
          externalCommand: 'login-with-token',
          token: authToken.authToken,
        });
      })
      .catch((error) => {
        alert('An error occured with the chat: ' + error.message);
      });
  }

  public logoutFromChat() {
    this.executeActionOnIframe({
      externalCommand: 'logout',
    });
  }

  public openDirectMessageTo(username: string) {
    this.goTo(`/direct/${username}`);
  }

  public openGroupFor(projectName: string) {
    this.goTo(`/group/${projectName}`);
  }

  private goTo(path: string) {
    this.executeActionOnIframe({
      externalCommand: 'go',
      path,
    });
  }

  private executeActionOnIframe(params: any) {
    console.log(params);
    this.contentWindow.postMessage(params, '*');
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }
}

export default RocketChatIframeCommander;
