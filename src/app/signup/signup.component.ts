import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { ConsumeService } from '../services/consume.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SignupComponent {
  isSignIn = false;


 
  signUpData = {
    fullName: '',
    email: '',
    password: '',
    rePassword: '',
    agreedToTerms: false,
  };

  signInData = {
    email: '',
    password: '',
  };

  toggleForm(): void {
    this.isSignIn = !this.isSignIn;
  }

  onSubmitSignUp(): void {
    console.log('Sign Up Data:', this.signUpData);
    alert('Sign up successful!');
  }

  onSubmitSignIn(): void {
    console.log('Sign In Data:', this.signInData);
    alert('Sign in successful!');
  }
}
