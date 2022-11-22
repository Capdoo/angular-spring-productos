import { Component, OnInit } from '@angular/core';
import { EmailPasswordService } from '../service/email-password.service';
import { ToastrService } from 'ngx-toastr';
import { EmailValuesDTO } from '../models/email-values-dto';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  mailTo: string;
  emailValuesDTO: EmailValuesDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSendEmail(): void{

    this.emailValuesDTO = new EmailValuesDTO(this.mailTo);
    this.emailPasswordService.sendEmail(this.emailValuesDTO).subscribe(
      data => {
        this.toastrService.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastrService.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
    console.log("on send email");
  }
}
