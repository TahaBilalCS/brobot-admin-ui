import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface LeaderboardRes {
  level: number;
  name: string;
  twitchUser: { displayName: string };
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  apiUrl = environment.apiUrl;

  dataSource: LeaderboardRes[] = [];
  displayedColumns: string[] = [
    'rank',
    'username',
    'pokemon',
    'level',
    'view-team',
  ];
  loading = true;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<LeaderboardRes[]>(`${this.apiUrl}/api/leaderboard`, {
        withCredentials: true,
      })
      .subscribe((res: LeaderboardRes[]) => {
        this.dataSource = res;
        this.loading = false;
      });
  }
}
