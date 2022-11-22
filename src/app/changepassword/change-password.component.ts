import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../auth/login.component';
import { ChangePasswordDTO } from '../models/change-password-dto';
import { EmailPasswordService } from '../service/email-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: string = '';
  confirmPassword: string = '';
  tokenPassword: string;

  changePasswordDTO: ChangePasswordDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    console.log(this.tokenPassword);
  }

  onChangePassword(): void{

    if(this.password != this.confirmPassword){
      this.toastrService.error('Las contraseñas no coinciden', 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    this.changePasswordDTO = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.changePasswordDTO).subscribe(
      data => {
        this.toastrService.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.toastrService.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }

    );

    console.log(this.tokenPassword);
  }

}









