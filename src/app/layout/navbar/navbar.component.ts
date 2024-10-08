import { Component, effect, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu'
import { CategoryComponent } from './category/category.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DialogService } from "primeng/dynamicdialog"
import { MenuItem } from 'primeng/api';
import { ToastService } from '../toast.service';
import { AuthService } from '../../core/auth/auth.service';
import { Usuario } from '../../core/model/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, FontAwesomeModule, ToolbarModule, MenuModule, CategoryComponent, AvatarComponent ],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  location = "Cualquier lugar";
  guests = "Agregar invitado";
  dates = "Cualquier Semana";
  currentMenuItems: MenuItem[] | undefined = [];
  toastService = inject(ToastService)
  authService = inject(AuthService)
  private connectedUser: Usuario = {
    correoElectronico: this.authService.notConnected
  };
  login = () => this.authService.login();
  logout = () => this.authService.logout();


  constructor() {
    effect(() => {
      if(this.authService.fetchUser().status === "OK") {
        this.connectedUser = this.authService.fetchUser().value!;
        this.currentMenuItems = this.fetchMenu();
      }
    });
  }

  ngOnInit(): void {
    this.authService.fetch(false)
  }

  private fetchMenu(): MenuItem[] {
    if(this.authService.isAuthenticated()) {
      return [
        {
          label: "Mis propiedades",
          routerLink: "landlord/properties",
          visible: this.hasToBeLandlord(),
        },
        {
          label: "Mis reservas",
          routerLink: "booking",
        },
        {
          label: "Mis reservaciones",
          routerLink: "landlord/reservation",
          visible: this.hasToBeLandlord(),
        },
        {
          label: "Finalizar Sesión",
          command: this.logout
        }
      ]
    } else {
      return [
        {
          label: "Registrarse",
          styleClass: "font-bold",
          command: this.login
        },
        {
          label: "Iniciar Sesión",
          command: this.login
        }
      ];
    }
  }

  hasToBeLandlord(): boolean {
    return this.authService.hasAnyAthority("ROL_PROPIETARIO")
  }
}
