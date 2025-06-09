import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'evnt-root',
  imports: [RouterOutlet],
  providers: [DialogService],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
