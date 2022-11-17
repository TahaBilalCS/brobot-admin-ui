import { Component, OnInit } from '@angular/core';
interface BattleOutcomeRes {
  body: {
    outcome?: string[];
  };
}
@Component({
  selector: 'app-battle-outcome',
  templateUrl: './battle-outcome.component.html',
  styleUrls: ['./battle-outcome.component.scss'],
})
export class BattleOutcomeComponent implements OnInit {
  outcome: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('BattleOutcomeComponent ngOnInit');
    // this.http.get(`${this.apiUrl}/api/pokemonteambattle`, {withCredentials: true, observe: "response"}).subscribe((res: any) => {
    //   if (res instanceof HttpErrorResponse) {
    //     console.log("ERROROROROROROR", res)
    //     return;
    //   }
    //   console.log("Pokemon Battle", res)
    //   // @ts-ignore
    //   if(res.body?.outcome) {
    //     // @ts-ignore
    //     this.outcome = res.body.outcome.join('\r\n')
    //     // console.log("Pokemon Battle", this.outcome)
    //   }
    // })
  }
}
