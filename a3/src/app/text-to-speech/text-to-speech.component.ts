import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { DatabaseService } from '../database.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})

export class TextToSpeechComponent implements OnInit {
  drivers: any[] = [];
  socket: any;
  audioUrl: string | null = null; 

  constructor(private databaseService: DatabaseService) { }
  ngOnInit(): void {
    this.databaseService.getDrivers().subscribe((data: any) => {
      this.drivers = data;

    }) 

    this.socket = io(); 
    this.socket.on('audio-url', (data: any) => {
      this.audioUrl = data.audioUrl; 
      let file_audio = document.getElementById("file-audio") as HTMLAudioElement;
      file_audio.load();

    });
  }

  playLicence(licence: string): void {
    this.socket.emit('convert-to-speech', { licence });
  }
}

