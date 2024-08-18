import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    Usuario: '',
    Contrasena: ''
  };
  errorMessage:string =''

  constructor(private userService: UserService, private router: Router) {}
    onSubmit(): void {
      const {Usuario,Contrasena}=this.user;
      
        this.userService.login(Usuario,Contrasena).subscribe(
          response => {
            this.router.navigate(['/user/start-user']); // Redirigir al dashboard después del inicio de sesión
          },
          error => {
            this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
          }
        );
      
    }
  
}
