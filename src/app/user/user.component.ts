import { Component, computed, input, output } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  select = output<User>();

  user = input.required<User>();
  selected = input.required<boolean>();

  imagePath = computed(() => `assets/users/${this.user().avatar}`);

  onSelectUser() {
    this.select.emit(this.user());
  }
}
