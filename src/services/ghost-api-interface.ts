import GhostContentAPI from '@tryghost/content-api';

class GhostApiInterface {
  public static readonly BASEURL: string = process.env
    .VUE_APP_GHOST_SERVER_URL as string;
  public static readonly KEY: string = process.env
    .VUE_APP_GHOST_API_KEY as string;

  private static instance: GhostApiInterface;

  private api!: any;

  private constructor() {
    this.api = new GhostContentAPI({
      host: GhostApiInterface.BASEURL,
      key: GhostApiInterface.KEY,
      version: 'v2',
    });
  }

  public fetchPosts(limit: number = 5) {
    return this.api.posts
      .browse({ limit, include: 'tags,authors' })
      .catch((err: any) => {
        // tslint:disable-next-line:no-console
        console.error(err);
      });
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }
}

export default GhostApiInterface;
