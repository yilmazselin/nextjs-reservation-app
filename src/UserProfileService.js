import HTTPBaseService from "./services";

export class UserProfileService extends HTTPBaseService {
  static classInstance;

  constructor(token) {
    super("http://localhost:3100", token);
  }

  static getInstance(token) {
    if (!this.classInstance) {
      this.classInstance = new UserProfileService(token);
    }

    return this.classInstance;
  }

  userBusinessTerritoryData = () =>
    this.instance.get("/api/products").then((response) => {
      if (response.status == 200) {
        return response.data;
      } else {
        throw "Parameter is not a number!";
      }
    });
}
