import axios, { AxiosInstance } from 'axios';

class LumaAIApiClient {
  private baseURL: string = 'https://webapp.engineeringlumalabs.com/api/v2';
  private apiInstance: AxiosInstance;
  private apiKey: string ; 

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `luma-api-key=${this.apiKey}`
      }
    });
  }

  async create(title: string): Promise<any> {
    const response = await this.apiInstance.post('/capture', {
      title: title
    });
    return response.data;
  }

  async upload(uploadUrl: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.put(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.status;
  }


  async trigger(slug: string): Promise<any> {
    const response = await this.apiInstance.post(`/capture/${slug}`);
    return response;
  }
  
  async checkAndDownload(slug: string): Promise<any> {
    const response = await this.apiInstance.get(`/capture/${slug}`);
    return response.data;
  }
}

export default LumaAIApiClient;
