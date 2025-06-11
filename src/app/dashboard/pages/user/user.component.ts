import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TitleComponent } from "../../../shared/title/title.component";
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { UsersService } from '../../../services/users.service';
import { of, switchMap } from 'rxjs';
import { User } from '../../../interfaces/reqres.interface';

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {

  private route = inject ( ActivatedRoute );
  private userService = inject( UsersService );
  
  idUser = Number(this.route.snapshot.paramMap.get('id'));
  userResource = this.userService.userResource(this.idUser);
  userComputed = computed(() => this.userResource.value()?.data);
}