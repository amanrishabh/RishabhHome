import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../app-config/apipath';
import { appConfig } from '../app-config/appconfig';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public http: HttpClient) { }
  registerData(data: any) {
    return this.http.post(appConfig.localhostUrl + apiConfig.registerData, data);
  }
  loginData(data: any) {
    return this.http.post(appConfig.localhostUrl + apiConfig.loginData, data);
  }
  addskillset(data: any) {
    return this.http.post(appConfig.localhostUrl + apiConfig.addSkill, data);
  }
  updateskillset(data: any) {
    return this.http.put(appConfig.localhostUrl + apiConfig.updateSkill, data);
  }
  getSkill(id: any) {
    return this.http.get(appConfig.localhostUrl + apiConfig.getSkill + '/' + id);
  }
  deleteSkill(id: any) {
    return this.http.delete(appConfig.localhostUrl + apiConfig.deleteSkill + '/' + id);
  }
}
