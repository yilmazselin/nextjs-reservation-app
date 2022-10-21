import axios from "axios";

export default class HTTPBaseService {
  instance;
  token;
  baseURL;

  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
    });
    this.token = token;

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response) => {
      if (response.headers && response.headers.authorization) {
        const responseToken = response.headers.authorization.split(" ")[1];
        this.token = responseToken;

        localStorage.setItem("hashToken", this.token);
      }
      return response;
    }, this.handleError);
  };

  handleRequest = (config) => {
    config.headers["Authorization"] = `Bearer ${this.token}`;
    return config;
  };

  handleError = async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const refreshToken = await this.refreshToken();
      if (refreshToken.status === 200) {
        this.token = refreshToken.data.hashToken;
        localStorage.setItem("hashToken", this.token);
        return this.instance(originalRequest);
      }
    }
  };

  async refreshToken() {
    const refreshTokenRequest = {
      hashToken: this.token,
    };

    const { data } = await this.addRequestOptionsForClientSecrect();

    const options = {
      headers: {
        CLIENT_KEY: data.clientKey,
      },
    };

    return axios.post(
      `${this.baseURL}/User/RenewToken`,
      refreshTokenRequest,
      options
    );
  }

  addRequestOptionsForClientSecrect() {
    return axios.get(`${this.baseURL}/Utility/GetSecrets`);
  }
}
