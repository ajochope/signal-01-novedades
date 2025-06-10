import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { TitleComponent } from "../../../shared/title/title.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TitleComponent, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {
  public userService = inject( UsersService );
  usersComputed = this.userService.usersComputed;

}
