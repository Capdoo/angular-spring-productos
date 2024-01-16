import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmailValuesDTO } from '../models/email-values-dto';
import { Observable } from 'rxjs';
import { ChangePasswordDTO } from '../models/change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  changePasswordURL = environment.changePasswordURL;

  constructor(private httpClient: HttpClient ) { }

  public sendEmail(emailValuesDTO: EmailValuesDTO): Observable<any>{
    const url = `${this.changePasswordURL}/send-email`;
    return this.httpClient.post<any>(url, emailValuesDTO);
  }

  public changePassword(changePasswordDTO: ChangePasswordDTO): Observable<any>{
    const url = `${this.changePasswordURL}/change-password`;
    return this.httpClient.post<any>(url, changePasswordDTO);
  }

}
