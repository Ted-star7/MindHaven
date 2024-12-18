import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConsumeService } from '../services/consume.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule, HttpClientModule],
  providers: [MatSnackBar],
})
export class SignupComponent {
  isSignIn = false; // Toggle between Sign Up and Sign In forms
  isLoading = false; // Loader status for API calls


  constructor(
    private router: Router,
    private consumeService: ConsumeService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) {}

  
  // Sign Up Form Fields
  signUpData = {
    fullName: '',
    email: '',
    password: '',
    rePassword: '',
    agreedToTerms: false,
  };

  // Sign In Form Fields
  signInData = {
    email: '',
    password: '',
  };

  

  /**
   * Toggle between Sign Up and Sign In forms
   */
  toggleForm(): void {
    this.isSignIn = !this.isSignIn;
  }

  /**
   * Navigate back to the home page
   */
  navigateBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Reset the Sign Up form to its initial state
   */
  resetSignUpForm(): void {
    this.signUpData = {
      fullName: '',
      email: '',
      password: '',
      rePassword: '',
      agreedToTerms: false,
    };
  }

  /**
   * Reset the Sign In form to its initial state
   */
  resetSignInForm(): void {
    this.signInData = {
      email: '',
      password: '',
    };
  }

  /**
   * Handle Sign Up form submission
   * @param form - Angular Form object
   */
  onSubmitSignUp(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', {
        duration: 3000,
      });
      return;
    }

    if (this.signUpData.password !== this.signUpData.rePassword) {
      this.snackBar.open('Passwords do not match!', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    const formData = {
      fullName: this.signUpData.fullName,
      email: this.signUpData.email,
      password: this.signUpData.password,
    };

    this.consumeService.postRequest('/api/signup', formData, null).subscribe(
      () => {
        this.isLoading = false;
        this.snackBar.open('Sign up successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/home']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Sign up error:', error);
        this.snackBar.open('Sign up failed. Please try again.', 'Close', {
          duration: 5000,
        });
        this.resetSignUpForm();
      }
    );
  }

  /**
   * Handle Sign In form submission
   * @param form - Angular Form object
   */
  onSubmitSignIn(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Please enter valid credentials.', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    const formData = {
      email: this.signInData.email,
      password: this.signInData.password,
    };

    this.consumeService.postRequest('/api/login', formData, null).subscribe(
      (response) => {
        this.isLoading = false;

        const { token, id, email } = response;

        if (token && id) {
          this.sessionService.saveToken(token);
          this.sessionService.saveEmail(email);
          this.sessionService.saveId(id);

          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/home']);
        } else {
          this.snackBar.open('Login failed: Invalid response from server.', 'Close', {
            duration: 5000,
          });
        }
      },
      (error) => {
        this.isLoading = false;
        // console.error('Login error:', error);
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
          duration: 5000,
        });
        this.resetSignInForm();
      }
    );
  }
}
