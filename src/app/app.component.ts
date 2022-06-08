import { Component, HostListener } from '@angular/core';
import { defaultStack } from '@pnotify/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medical';

  @HostListener('window:click', ['$event'])
  handleClick(event: KeyboardEvent): void {
    defaultStack.close();
  }
}
