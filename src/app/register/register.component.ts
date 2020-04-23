import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService } from '@/_services';
import { ApiCode } from '@/_models';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;
    public loading = false;
    public submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            topicId: [this.uuid()],
            clientPath: ['', Validators.required]

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    public onSubmit() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService
            .register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                (data) => {
                    if(data.status === 'SUCCESS') {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    } else {
                        this.alertService.error(data.message);
                        this.loading = false;      
                    }
                },
                (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    public uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const random = Math.random() * 16 | 0; // Nachkommastellen abschneiden
            const value = char === 'x' ? random : (random % 4 + 8);
            return value.toString(16); // Hexadezimales Zeichen zurückgeben
        });
    }
}
