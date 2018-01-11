import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { ContextProvider} from '../../providers/context/context';
import { WalletProvider} from '../../providers/wallet/wallet';

//
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm:FormGroup;
  public loading:Loading;

  info : string;

  constructor(
    public navCtrl: NavController,
    public authData: AuthProvider,
    //public ethapiProvider: EthapiProvider,
    //public fidapiProvider: FidapiProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ctx: ContextProvider,
    public walletProvider: WalletProvider
  ) {

      console.log('Login Page constructor');

      this.info = this.ctx.info;

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

    loginUser(){
      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      }
      else {
        let loginEmail: string = this.loginForm.value.email;
        let password: string = this.loginForm.value.password;
        this.ctx.setEmail(loginEmail);
        this.ctx.save();
        this.authData.loginUser(loginEmail, password)
        .then( (user) => {
          console.log('Firebase login success : ', user.uid);
          this.walletProvider.createGlobalEthWallet(user.uid, password).then( () => {
            this.navCtrl.insert(0,HomePage);
            this.navCtrl.popToRoot();
            this.ctx.init(user.uid, true, true, false);
          }, (globalWalletError) => {
            this.loading.dismiss().then( () => {
              var errorMessage: string = globalWalletError.message;
                let alert = this.alertCtrl.create({
                  message: errorMessage,
                  buttons: [
                    {
                      text: "Ok",
                      role: 'cancel'
                    }
                  ]
                });
                alert.present();
            });
          });

        }, authenticationError => {
          this.loading.dismiss().then( () => {
            var errorMessage: string = authenticationError.message;
              let alert = this.alertCtrl.create({
                message: errorMessage,
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
          });
        });

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
      }
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount(){
    this.navCtrl.push(SignupPage);
  }

}
