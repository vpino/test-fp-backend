import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, config);

      return data;
    } catch (error) {
      throw new Error(
        `error: ${error?.response?.data ?? error?.message ?? error}`,
      );
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const { data: responseData } = await this.axios.post<T>(
        url,
        data,
        config,
      );
      return responseData;
    } catch (error) {
      const err = `${error?.response?.data ?? error?.message ?? error}`;
      throw new Error(`error: ${err}`);
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const { data: responseData } = await this.axios.put<T>(url, data, config);
      return responseData;
    } catch (error) {
      throw new Error(
        `error: ${error?.response?.data ?? error?.message ?? error}`,
      );
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axios.delete<T>(url, config);
      return data;
    } catch (error) {
      throw new Error(
        `error: ${error?.response?.data ?? error?.message ?? error}`,
      );
    }
  }
}
