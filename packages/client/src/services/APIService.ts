import axios, { AxiosInstance } from 'axios';

type CallMethod = 'get' | 'post' | 'patch' | 'delete';

export class APIService {
  private static baseUrl = 'http://localhost:4000/';
  private static instance: AxiosInstance = APIService.initializeAxiosInstance();

  static async call<P, R>(
    method: CallMethod,
    url: string,
    params?: P | null,
    body?: Object | null
  ): Promise<R> {
    try {
      const { data } = await this.instance.request<R>({
        method,
        url: this.baseUrl + url,
        params: {
          ...this.instance.defaults.params,
          ...params,
        },
        data: body || {},
      });

      return data;
    } catch (err) {
      throw new Error(err.response.statusText);
    }
  }

  private static initializeAxiosInstance() {
    return axios.create({
      baseURL: APIService.baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      params: {},
    });
  }
}
