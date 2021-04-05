import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/Service/login/login.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { Crop } from "@ionic-native/crop/ngx";
import { File } from "@ionic-native/file/ngx";
import { ActionSheetController } from "@ionic/angular";
import { ImageUploadService } from "src/app/Service/imageUploadService/image-upload.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  croppedImagepath = "/assets/chats/user.jfif";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };
  constructor(
    private userData: UserDataService,
    private router: Router,
    private login: LoginService,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File,
    private imageuplaodService: ImageUploadService
  ) {}
  activeUserData: any = {};

  ngOnInit() {
    this.activeUserData = this.userData.getUserData();
  }

  logOut() {
    this.userData.setuserData(null);
    this.userData.setLoginStatus(false);
    this.router.navigate(["/login"], { replaceUrl: true });
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }
  GalleryImagePicker() {
    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        targetWidth: 500, //what widht you want after capaturing
        targetHeight: 500,
      })
      .then((imageData) => {
        console.log(imageData);
        this.cropImage(imageData);
        // this.croppedImagepath = imageData.split("?")[0];
      })
      .catch((err) => {
        console.log(err);
      });
  }
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.cropImage(imageData);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  cropImage(fileUrl: string) {
    this.crop.crop(fileUrl, { quality: 75 }).then(
      (newPath) => {
        this.showCroppedImage(newPath.split("?")[0]);
      },
      (error) => {
        alert("Error cropping image" + error);
      }
    );
  }

  showCroppedImage(imagePath: string) {
    const copyPath = imagePath;
    const splitPath = copyPath.split("/");
    const imageName = splitPath[splitPath.length - 1];
    const filePath = imagePath.split(imageName)[0];
    console.log(filePath, imagePath);
    this.file.readAsDataURL(filePath, imageName).then(
      (base64) => {
        this.croppedImagepath = base64;
        this.activeUserData.profileImage = base64;
        this.imageuplaodService.uploadProfileImageImage(
          base64,
          this.userData.getUserData().id
        );
      },
      (error) => {
        alert("Error in showing image" + error);
      }
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Choose From",
      cssClass: "my-action-sheet-class",
      backdropDismiss: true,
      buttons: [
        {
          text: "Use Library",
          handler: () => {
            this.GalleryImagePicker();
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          cssClass: ["Action-sheet-cancelButton"],
        },
      ],
    });
    await actionSheet.present();
  }
}
