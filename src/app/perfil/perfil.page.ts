import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AvatarService } from '../services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  showPwd: boolean = false;
  credentials: FormGroup = new FormGroup({});
  profile: { imageUrl?: string } | undefined;

  constructor(
    private fb:FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService,
    ) {
      this.avatarService.getUserProfile().subscribe((data) => {
        this.profile = data;
    })
     }

    togglePasswordVisibility() {
      this.showPwd = !this.showPwd;
    }

  voltar(){
    this.router.navigateByUrl('/mapa',{replaceUrl: true});
}

async logout(){
  await this.authService.logout();
  this.router.navigateByUrl('/login', {replaceUrl: true});
}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
}

async login(){
  const loading = await this.loadingController.create();
  await loading.present();
  const user = await this.authService.login(this.credentials.value);
  console.log(user);
  await loading.dismiss();

  if(user){
    this.router.navigateByUrl('/mapa',{replaceUrl: true});
  } else{
    this.showAlert('Login failed!','Please try again');
  }

  
}

async showAlert(header:string, message: string){
  const alert = await this.alertController.create({
    header,
    message,
    buttons: ['OK'],
  });
  await alert.present();
}

async changeImage(){
  const image = await Camera.getPhoto({
    quality:90,
    allowEditing: false,
    resultType:CameraResultType.Base64,
    source: CameraSource.Photos,
  });
  console.log(image);

  if(image){
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.avatarService.uploadImage(image);
    loading.dismiss();

    if(!result){
      const alert = await this.alertController.create({
        header: 'Upload failed',
        message: 'There was a problem uploading your avatar.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}

}
