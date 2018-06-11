import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
//import { CallalgoProvider } from '../../providers/callalgo/callalgo';
//import * as Algorithmia from 'algorithmia';
///<refrence path="algorithmia.d.ts"/>
//import {Algorithmia} from '@types/TAlgorithmia';
//import * from '@types/algorithmia';
//import * as Algorithmia  from 'algorithmia';
//import * as Algorithmia from '@types/algorithmia';
//import algorithmia from 'algorithmia/lib/algorithmia';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileTransferError } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Binary } from '@angular/compiler';
import * as $ from "jquery";




declare var Algorithmia: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inpone: any;
  imageURI: any;
  imageFileName: any;
  //selectedFile: File = null;


  constructor(public navCtrl: NavController,
    private loadingController: LoadingController,
    public camera: Camera,
    public transfer: FileTransfer,
    public toastCtrl: ToastController
    , public http: HttpClient) { };


  // var input = "Salam";
  // Algorithmia.client("simqKaFmL3Ci7Y6rBylzz1IfL0a1")
  //     .algo("Salam/Hello")
  //     .pipe(input)
  //     .then(function(response) {
  //         console.log(response.get());
  //     });
  // var myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'image/jpeg');
  // var myInit = { method: 'GET',
  // headers: myHeaders,
  // mode: 'no-cors',
  // cache: 'default' };


  getImage(event) {
    // console.log(event);
    // console.log(this.selectedFile);
    // this.selectedFile = <File>event.target.files[0];
    const filename = Math.floor(Date.now() / 1000) + '.png';
    const options: CameraOptions = {
      quality: 100,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY

    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.inpone = filename;
      this.imageFileName = filename;
      console.log("Image name and path" + this.imageFileName);
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }


  // TestUpload() {
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   //var imageLocation = this.selectedFile[0]; //'C:\\Users\\asa01\\Desktop\\mmm.jpg'; //this.avatar[0];

  //   let options: FileUploadOptions = {
  //     //fileKey: this.selectedFile.name,
  //     httpMethod: 'PUT',
  //     headers: { 'Authorization': 'Simple simHjsZQgyIg8516DJUjgjLLUgn1' },
  //     //params: this.selectedFile[0]
  //   }

  //   fileTransfer.upload("‪C:\\Users\\asa01\\Desktop\\mmm.jpg", encodeURI('https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/' + this.selectedFile.name), options, true)
  //     .then((data) => {
  //       console.log('put request success -> ' + data);
  //     }, error => {
  //       console.log(error);
  //     });
  // };


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  uploadFile() {
    let loader = this.loadingController.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      //fileKey: 'ionicfile',
      //fileName: 'ionicfile',
      httpMethod: 'PUT',

      //mimeType: "image/jpeg",
      headers: {
        'Authorization': 'Simple simHjsZQgyIg8516DJUjgjLLUgn1',
        'Content-Type': 'multipart/form-data'
      }
    }

    fileTransfer.upload(this.imageURI, 'https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/' + this.imageFileName, options)
      .then((data) => {
        console.log(data + " Uploaded Successfully");
        //this.imageFileName = "https://algorithmia.com/v1/data/Salam/Thisistest/ionicfile.jpg"
        loader.dismiss();
        this.presentToast("Image uploaded successfully");
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err.message);
      });
  }




  // uploadFile() {
  //   let loader = this.loadingController.create({
  //     content: "Uploading..."
  //   });
  //   loader.present();
  //   const fileTransfer: FileTransferObject = this.transfer.create();

  //   let options: FileUploadOptions = {
  //     fileKey: 'ionicfile',
  //     fileName: 'ionicfile',
  //     chunkedMode: false,
  //     mimeType: "image/jpeg",
  //     headers: {}
  //   }

  //   fileTransfer.upload('assets/imgs/colorizelogo.png', 'https://algorithmia.com/data/hosted/Salam/Thisistest/', options)
  //     .then((data) => {
  //     console.log(data+" Uploaded Successfully");
  //     this.imageFileName = "https://algorithmia.com/data/hosted/Salam/Thisistest/ionicfile.jpg"
  //     loader.dismiss();
  //     //this.presentToast("Image uploaded successfully");
  //   }, (err) => {
  //     console.log(err);
  //     loader.dismiss();
  //     //this.presentToast(err);
  //   });
  // }

  //Below is done ! -- this is for colorizing 
  callalgo() {

    let loader = this.loadingController.create({
      content: 'Colorizing...',
      dismissOnPageChange: true
    })

    loader.present();
    if (this.inpone) {
      //alert("empty!");
      //  return;
    } else {
      alert("empty! from else...");
      //return;
    }

    var input = {
      //"image": "https://cdn.mos.cms.futurecdn.net/5PMe5hr8tjSS9Nq5d6Cebe-320-80.jpg"
      //, "mode": "no-cors"
      //"https://www.ava360.com/file/2017/05/cat-looking-at-you-black-and-white-photography-1.jpg" 
      //"image": "data://deeplearning/example_data/lincoln.jpg"
      //https://algorithmia.com/v1/data/Salam/Thisistest/1528157495.png
      //data://Salam/Thisistest/1528157495.png
      "image": "data://Salam/Thisistest/" + this.inpone
    };

    //"deeplearning/ColorfulImageColorization/1.1.13")
    Algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1")
      .algo("deeplearning/ColorfulImageColorization/1.1.13")
      .pipe(input)
      .then(function (output) {
        if (output.error) {
          document.getElementById('lbl').innerHTML = output.error.message;
          loader.dismiss();
        } else {
          input = output.result.output;
          Algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1")
            .algo("ANaimi/Base64DataConverter/0.1.2")
            .pipe(input)
            .then(function (res) {
              if (res.error) {
                document.getElementById('lbl').innerHTML = res.error.message;
                loader.dismiss();
              } else {
                document.getElementById('lbl').innerHTML = "<img alt='Salam AI work' src='data:image/png;base64," + res.result + "'/>";
                loader.dismiss();
              }
              console.log("This is the second " + res.result);
            });
        }
      });
  }


  opencam() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      document.getElementById('lbl').innerHTML = "<img alt='Salam AI work' src='data:image/png;base64," + imageData + "'/>";
    }, (err) => {
      // Handle error
    });
  };


  //  var ss= Algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1")
  // const fd = new FormData();
  // fd.append("file///C:\\Users\\asa01\\Desktop\\mmm.jpg", "mmm.jpg");
  // var options= {
  //   headers: {
  //     "authorization": "Simple simHjsZQgyIg8516DJUjgjLLUgn1",
  //   }
  // }
  // this.http.put('https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/sxsxs.png', fd, options).subscribe(res => {
  //   console.log(res);

  // });


  // $.ajax({
  //   url: "https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/sxsxs.png",
  //   type: "PUT",
  //   beforeSend: function (xhr) { xhr.setRequestHeader('authorization', 'Simple simHjsZQgyIg8516DJUjgjLLUgn1'); },
  //   success: function () { alert('Success!'); }
  // });



  // let  hd = new HttpHeaders();
  // hd.append('authorization', 'Simple simHjsZQgyIg8516DJUjgjLLUgn1');
  //     //"Content-Type": "application/x-www-form-urlencoded"

  //Algorithmia.client.uploadFile('https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/', 'data:image/gif;base64,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', options);

  // fd.append('image', 'C:\\Users\\asa01\\Desktop\\mmm.jpg')
  // this.http.put('https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/', "", options).subscribe(res => {
  //   console.log(res);
  // });

  // var input = "C:\\Users\\asa01\\Desktop\\mmm.jpg";
  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/SSSS.png",
  //   "method": "PUT",
  //   "headers": {
  //     "authorization": "Simple simHjsZQgyIg8516DJUjgjLLUgn1",
  //     "Cache-Control": "no-cache",
  //   }
  // };


  // var options = { method: 'PUT',
  // url: 'https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/justtest.png',
  // headers: 
  //  { 'Postman-Token': '1d54c870-ea53-402e-b242-de6662cd925d',
  //    'Cache-Control': 'no-cache',
  //    authorization: 'Simple simHjsZQgyIg8516DJUjgjLLUgn1' } };

  //   this.http.request("PUT","https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/TOM.png",options);


  //this.http.put("https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/SSSS.png",{},settings)
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

  //var bodydata = "data:image/gif;base64,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"
  // var input = "C:\\Users\\asa01\\Desktop\\mmm.jpg";
  // var target = "https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/XXX.jpg";

  // //var client = algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1");
  // //var robots = client.dir("data://Salam/Thisistest/");

  // let options: FileUploadOptions = {
  //   headers: {
  //     "authorization": "Simple simHjsZQgyIg8516DJUjgjLLUgn1",
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   }
  // }
  // this.http.put(target,input,options);

  //this.http.put(target,input, options);

  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   let options: FileUploadOptions = {
  //     fileKey: 'file',
  //     fileName: 'mmm.jpg',
  //     headers: {}
  //   }
  //   fileTransfer.upload(input, target, options)
  //     .then((data) => {
  //       // success
  //       console.log('OK');
  //     }, (err) => {
  //       // error
  //       console.log('Error');
  //     }).catch((err) => {
  //       console.log(err.message);
  //     })
  // }

  //var client = Algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1");
  // //var robots = Algorithmia.client.dir("data://.my/Salam/Thisistest");


  // client.putFile(input, function (response) {
  //   if (response.error) {
  //     return console.log("Error:" + response.error.message);
  //   } else {
  //     console.log("Success");
  //   }
  // });
  // Algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1")
  //   .algo("ANaimi/Base64DataConverter/0.1.2")
  //   .pipe(input)
  //   .then(function (res) {
  //this.http.put("https://api.algorithmia.com/v1/connector/data/Salam/Thisistest/FromApp.png", res.result);
  //res.uploadFile(res.result);
  //"ANaimi/Base64DataConverter/0.1.2"
  // if (res.error) {
  //   document.getElementById('lbl').innerHTML = res.error.message;
  //   //loader.dismiss();
  // } else {
  //   console.log("This is the second " + res.result);
  //   //document.getElementById('lbl').innerHTML = "<img alt='Salam AI work' src='data:image/png;base64," + res.result + "'/>";
  //   //loader.dismiss();
  // }
  //console.log("This is the success " + res.result);
  //console.log("This is the faliure " + res.error.message);
  //});




  // var client = Algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1", "https://salam/Thisistest");
  // var text_file = "data://salam/Thisistest/mmm.jpg"

  // var local_file = "D:/Mydesktop/PicsIMV/mmm.jpg"//"/your_local_path_to_file/jack_london.txt"
  // //var file_exists, file_err = client.File(text_file).Exists()
  //  client.File(text_file).PutFile(local_file)


  // var client = Algorithmia.client("simHjsZQgyIg8516DJUjgjLLUgn1");
  // var robots = client.dir("data://Salam/Thisistest/");
  // robots.putFile("file:///D:/Mydesktop/PicsIMV/mmm.jpg", function (response) {
  //   if (response.error) {
  //     return console.log("Failed to upload file: " + response.error.message);
  //   }
  //   console.log("File uploaded.");
  // });


  // SaveToGallery(base64Data) {
  //   Base64ToGallery['base64ToGallery'](base64Data, {prefix:'_img'}).then(
  //     res => console.log("Saved image to gallery ", res),
  //     err => console.log("Error saving image to gallery ", err)
  //   )};
  //console.log("this is the response" + output.result.output);
  //getalgo(output.result.output);
  //document.getElementById('lbl').innerHTML = "This is the result <br/><img alt='Salam AI work' src=" + output.path + " />";
  //src='https://algorithmia.com/v1/data/"+output.result.output.replace('data://','')+"'
  //Salam/Thisistest/MT.jpg

}


