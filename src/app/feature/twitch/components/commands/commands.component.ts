import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface CommandTableData {
  command: string;
  description: string;
}
interface InnerPanel {
  hideToggle: boolean;
  title: string;
  description: string;
  panelOpenState: boolean;
  content: {
    msg: string;
  };
}
interface ExpansionPanel {
  hideToggle: boolean;
  title: string;
  description: string;
  panelOpenState: boolean;
  content: {
    table?: {
      dataSource: CommandTableData[];
      displayedColumns: string[];
    };
    panel?: InnerPanel;
  };
}

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  constructor() {}
  apiUrl = environment.apiUrl;

  commandsList: ExpansionPanel[] = [
    {
      hideToggle: false,
      title: 'Specialty',
      description: 'Click to expand',
      panelOpenState: false,
      content: {
        table: {
          dataSource: [
            {
              command: '!chatban',
              description: `Once the vote threshold is reached, the streamer will be banned from pressing the "Enter" key for 5 minutes. Please cage this rat. You're doing God's work`,
            },
            {
              command: '!voiceban',
              description: `Once the vote threshold is reached, the streamer will have their microphone muted for 30 seconds.`,
            },
          ],
          displayedColumns: ['command', 'description'],
        },
      },
    },
    {
      hideToggle: false,
      title: 'Pokemon',
      description: 'Click to expand',
      panelOpenState: false,
      content: {
        table: {
          dataSource: [
            {
              command: '!pokemon battle',
              description:
                'Start or Join a 1v1 Battle using your starter pokemon in Slot 1',
            },
            {
              command: '!pokemon teambattle',
              description: `Start or Join a 6v6 Battle using your available pokemon in all 6 slots. It's possible to 1v6`,
            },
            {
              command: '!pokemon team',
              description: `Get a link that displays your entire pokemon team`,
            },
            {
              command: '!pokemon catch',
              description: `Every 2 hours, a random pokemon with a higher change of being shiny can appear. Make sure you have an available slot before trying to catch. You have 3 attempts to catch it using this command`,
            },
            {
              command: `!pokemon delete <slot number>`,
              description: `Delete a pokemon from that slot permanently. Example: !pokemon delete 1 (Deletes your starter pokemon). Alternatives to using "delete" are, "remove", "kill", and "slaughter"`,
            },
            {
              command: `!pokemon swap <slot number 1> <slot number 2>`,
              description: `Swap pokemon between two chosen slots. Usually to switch your starter pokemon. Example: !pokemon swap 1 2. Alternative to using "swap" is "switch"`,
            },
          ],
          displayedColumns: ['command', 'description'],
        },
      },
    },
    {
      hideToggle: false,
      title: 'Other',
      description: 'Click to expand',
      panelOpenState: false,
      content: {
        table: {
          dataSource: [
            {
              command: '!dice',
              description: `Rolls a 6 sided die. Don't know why we have it, but it's here`,
            },
            {
              command: '!rps',
              description: `Generate a rock paper scissors hyperlink to challenge other viewers`,
            },
            {
              command: '!quack',
              description: `A hidden command that triggers a Duck sound effect. Can be spammed until Rama figures out how to disable it using this website. Once disabled, it won't be enabled until the server restarts again`,
            },
            {
              command: `!chess`,
              description: `Generate a chess hyperlink to challenge other viewers`,
            },
          ],
          displayedColumns: ['command', 'description'],
        },
      },
    },
    // {
    //   hideToggle: false,
    //   title: 'Self aware panel',
    //   description: ` Currently I am Description`,
    //   panelOpenState: false,
    //   content: {},
    // },
  ];
  dataSource: any = [];

  openPanel(panel?: InnerPanel) {
    if (panel) panel.panelOpenState = true;
  }
  closePanel(panel?: InnerPanel) {
    if (panel) panel.panelOpenState = false;
  }
  ngOnInit(): void {}
}
