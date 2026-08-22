import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface ISharePointServiceContext {
  spHttpClient: SPHttpClient;
  spHttpClientConfiguration: any;
  webAbsoluteUrl: string;
}

export interface ISpListItem {
  Id: number;
  [key: string]: any;
}

export class SharePointService {
  protected readonly context: ISharePointServiceContext;

  public constructor(context: ISharePointServiceContext) {
    this.context = context;
  }

  protected async getItems<T extends ISpListItem>(listTitle: string, query: string = ''): Promise<T[]> {
    const url =
      `${this.context.webAbsoluteUrl}/_api/web/lists/getbytitle('${encodeURIComponent(listTitle)}')/items${query}`;

    const response = await this.context.spHttpClient.get(
      url,
      this.context.spHttpClientConfiguration,
      { headers: { Accept: 'application/json;odata=nometadata' } }
    );

    if (!response.ok) {
      throw new Error(`GET ${listTitle} failed: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    return (data.value || []) as T[];
  }

  protected async postItem<T>(listTitle: string, payload: Record<string, any>): Promise<T> {
    const url =
      `${this.context.webAbsoluteUrl}/_api/web/lists/getbytitle('${encodeURIComponent(listTitle)}')/items`;

    const options: ISPHttpClientOptions = {
      headers: {
        Accept: 'application/json;odata=nometadata',
        'Content-Type': 'application/json;odata=nometadata'
      },
      body: JSON.stringify(payload)
    };

    const response = await this.context.spHttpClient.post(
      url,
      this.context.spHttpClientConfiguration,
      options
    );

    if (!response.ok) {
      throw new Error(`CREATE ${listTitle} failed: ${response.status} ${await response.text()}`);
    }

    return (await response.json()) as T;
  }

  protected async updateItem(
    listTitle: string,
    id: number,
    payload: Record<string, any>
  ): Promise<void> {
    const url =
      `${this.context.webAbsoluteUrl}/_api/web/lists/getbytitle('${encodeURIComponent(listTitle)}')/items(${id})`;

    const response = await this.context.spHttpClient.post(
      url,
      this.context.spHttpClientConfiguration,
      {
        headers: {
          Accept: 'application/json;odata=nometadata',
          'Content-Type': 'application/json;odata=nometadata',
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      throw new Error(`UPDATE ${listTitle}/${id} failed: ${response.status} ${await response.text()}`);
    }
  }
}
