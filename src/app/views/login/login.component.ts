import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { HttpService } from '@app/shared/services/http-service.service';
import { UserService } from '@app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  onLoading = false;
  token: any;

  isProduction = environment.production;
  env = environment;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private http: HttpService
  ) {
    this.user.initialize();

    if (this.auth.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void { }

  submit(): void {
    this.onLoading = true;
    this.http.setAPIURL(environment.urlBase.domain)
    this.http.post('login', this.form.value).subscribe((data) => {
      this.onLoading = false;
    }, () => {
      this.onLoading = false;
    }, () => {
    });
  }

  alphaNumericValidator(control: FormControl): ValidationErrors | null {
    const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: true };
    const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
    return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
  }
}
