import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import {Algorithmia} from 'algorithmia';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CallalgoProvider } from '../providers/callalgo/callalgo';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { HttpClientModule  } from '@angular/common/http';
//import * as Algorithmia  from 'algorithmia';
//import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage
    ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CallalgoProvider, 
    Camera,
    FileTransfer,
    FileTransferObject,
    File
    ]
})
export class AppModule { }
