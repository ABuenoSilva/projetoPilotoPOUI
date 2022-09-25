import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PoModalAction, PoModalComponent, PoNotification, PoToasterOrientation } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild(PoModalComponent, { static: true }) poModal?: PoModalComponent;

  userLogin: string = '';
  userPassword: string = '';

  onLogin: PoModalAction = {
    label: 'Confirmar',
    action: () => {
      this.confirmAction();
    }
  };

  onCancel: PoModalAction = {
    label: 'Cancelar',
    action: () => {
      this.cancelAction();
    }
  };

  constructor(private poNotification: PoNotificationService, private authService: AuthService, private router: Router) { }

  openModal() {
    this.poModal?.open();
  }

  private cleanForm() {
    this.userLogin = '';
    this.userPassword = '';
  }

  private async confirmAction() {

    if (this.userLogin) {
      const isLogged = await this.authService.authenticate(this.userLogin, this.userPassword);
      if (isLogged) {
        this.poModal?.close();
        this.cleanForm();
        this.router.navigate(['/']);
      } else {
        this.poModal?.close();
        this.cleanForm();
      }

    }
  }

  private cancelAction() {
    this.toastNotify(`Login cancelado!`,3000,'warning');
    this.poModal?.close();
    this.cleanForm();
  }

  private toastNotify(message: string, duration: number, type: string) {
    const poNotification: PoNotification = {
      message: message,
      orientation: PoToasterOrientation.Top,
      action: undefined,
      actionLabel: undefined,
      duration: duration
    };

    switch (type) {
      case 'success':
        this.poNotification.success(poNotification);
        break;
      case 'warning':
        this.poNotification.warning(poNotification);
        break;
      default:
        this.poNotification.error(poNotification);
        break;
    }

  }

}
