import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private actionSheet: ActionSheetController, private camera: Camera) {}
  async onChoose(){
    let sheet = await this.actionSheet.create({
      buttons:[{
        text:'Gallery',
        handler:()=>{
          this.open(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },{
        text:'Camera',
        handler:()=>{
          this.open(this.camera.PictureSourceType.CAMERA);
        }
      }]
    });
    await sheet.present();
  }

  
  open(source: any){
    const options: CameraOptions = {
      sourceType: source,
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((image) => {
      console.log(image);
    },
    (error) =>{
      console.log(error);
    });
  }

}
