import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showDescription: boolean = false;

  images = [
    'https://media.discordapp.net/attachments/1036449115149697044/1129816319672471582/ALJ807.jpg?width=551&height=413',
    'https://media.discordapp.net/attachments/1036449115149697044/1129816390233247745/2198155-rua-futebol-gol-sombra-no-campo-gratis-foto.jpg?width=620&height=413',
    'https://media.discordapp.net/attachments/1036449115149697044/1129816475822211143/60c9e3e1e60c2.jpg?width=737&height=413'
  ];

  constructor(
    private router: Router,
  ) {}

  
  toggleDescription() {
    this.showDescription = !this.showDescription;
  }


  voltar(){
      this.router.navigateByUrl('/mapa',{replaceUrl: true});
  }

  swiperSlideChanged(e:any){
    console.log('changed: ', e);
  }



}
