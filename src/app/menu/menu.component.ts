import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  userName: string = '';

  constructor(private authService: AuthService) {
    this.userName = this.authService.getUserName();
  }

  readonly menus: Array<PoMenuItem> = [];

  ngOnInit(): void {
    this.loadMenu();
  }

  ngOnDestroy(): void {
    this.menus.splice(0);
  }

  loadMenu() {
    if (this.authService.getUserRoles().find( role => role.roleCode === '000000') ) {
      // menu de cadastros e consultas
      this.menus.push({
        label: 'Usuários',
        shortLabel: 'Usuarios',
        icon: 'po-icon po-icon-users',
        link: '/admin/usuarios',
      });
    }

    this.menus.push({
      label: 'Vendas',
      shortLabel: 'Vendas',
      icon: 'po-icon po-icon-finance',
      subItems: [
        {
          label: 'Contas',
          link: '/vendas/contas'
        },
        {
          label: 'Pedidos',
          link: '/vendas/pedidos'
        }
      ]
    });

    this.menus.push({
      label: 'Logout',
      shortLabel: 'Logout',
      icon: 'po-icon po-icon-exit',
      action: this.onLogout.bind(this)
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
