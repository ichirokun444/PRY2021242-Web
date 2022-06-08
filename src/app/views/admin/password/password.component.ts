import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@app/shared/services/http-service.service';
import { UserService } from '@app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'nf-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {


  form = this.fb.group({
    oldpassword: ["", Validators.required],
    password: ["", Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private user: UserService,
  ) { }

  ngOnInit(): void {
    this.http.setAPIURL(environment.urlBase.domain);
  }

  save() {
    if (!this.form.valid)
      return alert('Revisar datos')
    this.http.patch(`user/${this.user.userId}/password`, this.form.value).subscribe((data) => { });
  }

}
