import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { FidapiProvider } from '../../providers/fidapi/fidapi';
import { EthapiProvider } from '../../providers/ethapi/ethapi';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AlertProvider} from '../../providers/alert/alert';

/*
  Generated class for the ContextProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/



enum IconSize {
    NORMAL,
    XXL,
}

@Injectable()
export class ContextProvider {

  uid: string;
  deviceId: string;

  email: string;
  name: string;
  profilePicture: string;

  language: string = 'en';

  c: any = {};

  cordovaPlatform: boolean = false;

  productionApp: boolean = false;

  storageKey: string = 'storageKey';

  allContractAddresses: string = 'allCoinsAddresses';
  myContractAddresses: string = 'myCoinsAddresses';
  names: string = 'coinNames';
  colors: string = 'coinColors';
  amounts: string = 'coinAmounts';
  icons: string = 'coinIcons';
  companyNames: string = 'companyName';
  landscapes: string = 'landscapePictures';
  brandIcons: string = 'brandIcons';
  offers: string = 'coinOffers';
    offerID = 'id';
    offerName = 'name';
    offerPrice = 'price';
  offerImages = 'coinOfferImages';
  rewards: string = 'coinRewards';
  locations: string = 'coinLocations';
  info: string = 'accountInfo';
    infoAddress: string = 'ethAddress';
    infoPrivateKey: string = 'ethPrivateKey';
    infoEmail: string = 'email';
    infoHashPassword: string = 'hashPassword';
    infoName: string = 'name';
    infoSurname: string = 'surname';
    infoProfilePicture: string = 'profilePicture';


  iconSize: IconSize = IconSize.NORMAL;

  /********* Only for FidEver Pro***********/
  fideverProContractAddress: string = "0xbe5c6930b754df6dc6a7a7f17f12180335e7bc75";
  /*****************************************/

  ethAccount: {
      address: string,
      privateKey: string
  };

  myCoinListSubscribtion: any; // Subscribed

  allCoinListSubscribtion: any; // Subscribed

  coinDetailSubscribtions: any = {}; // Subscribed
  coinDetailObservers: any = {};

  coinAmountSubscribtions: any = {}; // Subscribed
  coinAmountObservers: any = {};

  coinOffersSubscribtions: any = {}; // Unsubscribed
  coinOffersObservers: any = {};

  coinLocationsSubscribtions: any = {}; // Unsubscribed
  coinLocationsObservers: any = {};

  //coinRewardsSubscribtions: any = {}; // Unsubscribed
  //coinRewardsObservers: any = {};

  allCoinsCollectionPath: string = 'tokens/';
  // globalCoinCollectionPath: string = 'tokens/';
  defaultCoinImage: string = '';
  defaultLandscapeImage: string = '';
  defaultBrandIcon: string = '';
  fidOrange: string = '#fe9400';
  fidGrey: string = '#afabab';

  noEthAccount: string = 'noEthAccount';

  constructor(
    public http: Http,
    private storage: Storage,
    public fidapiProvider: FidapiProvider,
    public ethapiProvider: EthapiProvider,
    public firestoreProvider: FirestoreProvider,
    public alertProvider: AlertProvider
  ) {
    console.log('Hello ContextProvider Provider');

  }

/***************SETTERS*********************/

  setAppToProduction() {
    this.productionApp = true;
  }

  setLanguage(language : string) {
    this.language = language;
  }

  setAddress(address : string) {
    this.c[this.info][this.infoAddress] = address;
  }

  setPrivateKey(privateKey : string) {
    this.c[this.info][this.infoPrivateKey] = privateKey;
  }

  setEmail(email : string) {
    this.c[this.info][this.infoEmail] = email;
  }

  setHashPassword(hashPassword : string) {
    console.log('setHashPassword : ', hashPassword);
    this.c[this.info][this.infoHashPassword] = hashPassword;
  }

  setName(name : string) {
    this.c[this.info][this.infoName] = name;
  }

  setProfilePicture(profilePicture: string) {
    this.c[this.info][this.infoProfilePicture] = profilePicture;
  }

/****************GETTERS*********************/

  getProductionApp(): boolean {
    return this.productionApp;
  }

  getLanguage(): string {
    return this.language;
  }

  getUid(): string {
    return this.uid;
  }

  getDeviceId(): string {
    return this.deviceId;
  }

  getAddress(): string {
    return this.c[this.info][this.infoAddress];
  }
  getPrivateKey(): string {
    return this.c[this.info][this.infoPrivateKey];
  }
  getEmail(): string {
    // return this.email;
    return this.c[this.info][this.infoEmail];
  }
  getHashPassword(): string {
    return this.c[this.info][this.infoHashPassword];
  }
  getName(): string {
    return this.c[this.info][this.infoName];
  }
  getProfilePicture(): string {
    return this.c[this.info][this.infoProfilePicture];
  }

  getMyCoinAddresses(): string {
    return this.c[this.myContractAddresses];
  }
  getAllCoinAddresses(): string {
    return this.c[this.allContractAddresses];
  }

  getCoinName(coinID : string): string {
    return this.c[this.names][coinID];
  }
  getCoinColor(coinID : string): string {
    return this.c[this.colors][coinID];
  }
  getCoinAmount(coinID : string): string {
    return this.c[this.amounts][coinID];
  }
  getCoinIcon(coinID : string): string {
    return this.c[this.icons][coinID];
  }
  getLandscape(coinID : string): string {
    return this.c[this.landscapes][coinID];
  }
  getBrandIcon(coinID : string): string {
    return this.c[this.brandIcons][coinID];
  }
  getCompanyName(coinID : string): string {
    return this.c[this.companyNames][coinID];
  }
  getOffers(coinID : string): any[] {
    if(this.c[this.offers][coinID].length!=undefined) {
      return this.c[this.offers][coinID];
    }else {return [];}
  }
  getOfferImages(coinID : string): any {
    return this.c[this.offerImages][coinID];
  }
  getRewards(coinID : string): any[] {
    if(this.c[this.rewards][coinID].length!=undefined) {
      return this.c[this.rewards][coinID];
    }else {return [];}
  }
  getLocations(): any {
    return this.c[this.locations];
  }
  getCoinLocations(coinID : string): any[] {
    if(this.c[this.locations][coinID].length!=undefined) {
      return this.c[this.locations][coinID];
    }else {return [];}
  }
  getAllCoinsFromFirestore(): Promise<any> {
    console.log('Open getAllCoinsFromFirestore');
    var self = this;
    return new Promise(
      function(resolve, reject) {
        if( self.allCoinsCollectionPath ){
          //Subscribtion security
          if(self.allCoinListSubscribtion){self.allCoinListSubscribtion.unsubscribe();console.log('UNSUBSCRIBE GLOBAL');}

          self.allCoinListSubscribtion = self.firestoreProvider
            .getCollection( self.allCoinsCollectionPath )
            .subscribe( allCoins => {

              console.log('OBSERVABLE ALLCOINLIST : ', allCoins);

              if(allCoins != null){
                var allCoinsSimplified = [];

                for(let coin of allCoins) {
                  allCoinsSimplified.push(coin.id);
                }

                resolve(allCoinsSimplified);
                /*******************************************/

              }
              else{
                console.log('Null allCoins list');
                resolve();
              }

          });

        }

    });
  }


  init(
    uid: string,
    email: string,
    myName: string,
    profilePicture: string,
    loadData: boolean,
    loadAllCoins: boolean,
    loadXXL_images: boolean,
    coinParameter?: string
  ): Promise<any> {

    /********************/
    // let passphrase1 : string = Md5.hashStr('jPRpTIM76VTkaaP1pbSjbXNaZXN2'.concat('spark78')).toString();
    // let passphrase2 : string = Md5.hashStr('jPRpTIM76VTkaaP1pbSjbXNaZXN2'.concat('spark78qragrhthzrhrthreahthhzrththzthth')).toString();
    // let passphrase3 : string = Md5.hashStr('jPRpTIM76VTkaaP1pbSjbXNaZXN2'.concat('1234567890SGTRGARGREGRGAREGRGRG')).toString();
    // let passphrase4 : string = Md5.hashStr('jPRpTIM76VTkaaP1pbSjbXNaZXN2'.concat('spark78qragrhthzrhrthreahthhzrththzthth')).toString();
    //
    // console.log('Account1 : ', this.ethapiProvider.createAccount(passphrase1));
    // console.log('Account2 : ', this.ethapiProvider.createAccount(passphrase2));
    // console.log('Account3 : ', this.ethapiProvider.createAccount(passphrase3));
    // console.log('Account4 : ', this.ethapiProvider.createAccount(passphrase4));
    /********************/

    if( !this.getProductionApp() ) {
      /***********************/
      this.fidapiProvider.setProxyUrl('https://cors-anywhere.herokuapp.com/');
      /***********************/
    }


    console.log('Open context init');
    var self = this;
    return new Promise(
      function(resolve, reject) {

        self.uid = uid;
        //*****Data to be imported in context once initialized****
        self.email = email;
        self.name = myName;
        self.profilePicture = profilePicture;
        //********************************************************

        self.firestoreProvider.init().then( (apiUrl) => {
          console.log('API URL : ',apiUrl);
          self.fidapiProvider.setApiUrl( apiUrl.concat('/') );
          self.fidapiProvider.authenticate(uid).then(()=>{}).catch( (err) => {console.log('Authentication error : ', err);});

          if(loadData){
            self.loadData(uid, loadAllCoins, loadXXL_images, coinParameter).then((res)=>{
              self.importAuthenticationData();
              resolve(res);
            }).catch((err)=>{
              reject(err);
            });
          }
          else {
            resolve();
          }

        }).catch((err) => {reject(err);});
    });
  }

  importAuthenticationData() {
    console.log('Open importAuthenticationData');
    if(this.email) {
      this.setEmail(this.email);
    }
    if(this.name) {
      this.setName(this.name);
    }
    if(this.profilePicture) {
      this.setProfilePicture(this.profilePicture);
    }
  }

  loadData(
    uid: string,
    loadAllCoins: boolean,
    XXL_images: boolean,
    coinParameter: string
  ): Promise<any> {

    console.log('Open context loadData');
    var self = this;
    return new Promise(
      function(resolve, reject) {

        if(XXL_images) {
          self.iconSize = IconSize.XXL;
        }
        else {
          self.iconSize = IconSize.NORMAL;
        }

        /****************/
        // self.getAllCoinsFromFirestore().then( () => { console.log('XXXXXXXX') });
        /****************/

        self.initContext();
        self.recoverContext().then( (address) => {
          console.log('Context recovery success : ',address);

            if (loadAllCoins) { // Only for FidEver
              console.log('Open loadAllCoins : ', uid);

              self.getAllCoinsFromFirestore().then( (allCoinList) => {
                console.log('AllCoinList recovered from Firestore : ', allCoinList);
                self.c[self.allContractAddresses] = allCoinList;

                self.initCoinList(allCoinList);

                self.downloadAllCoinInfos(allCoinList).then( () => {
                  self.save().then( () => {
                    console.log('DownloadAllCoinInfos succeeded');


                    /******************************/
                    if(uid != null){
                      self.getMyCoinListFromFirestore(uid).then( (myCoinList) => {
                        console.log('MyCoinList recovered from Firestore : ', myCoinList);
                        self.downloadMyCoinAmounts(myCoinList, uid).then( (nb) => {
                          console.log('My coin amounts downloaded for all my ', nb, ' coins.');
                          self.save().then( () => {
                            resolve(address);
                          }).catch( (err) => {reject(err);});
                        }).catch( (err) => {reject(err);});

                      }).catch( (err) => {
                        console.log('GetMyCoinListFromFirestore error');
                        reject(err);
                      });
                    }
                    else {
                      reject('Null uid');
                    }
                    /******************************/


                  }).catch( (err) => { reject(err); });
                }).catch( (err) => { reject(err); });

              }).catch( (err) => {
                console.log('GetAllCoinsFromFirestore error');
                reject(err);
              });


            }
            else if (coinParameter) { // Only for FidEver Pro
              console.log('Open loadSingleCoin');
              self.downloadCoinDetail(coinParameter).then( (coinDetails) => {
                console.log('single coinDetail download : ', coinDetails);
                self.downloadCoinIcon(coinParameter).then( (coinIcon) => {
                  console.log('single coinIcon download', coinIcon);
                  resolve(coinDetails);
                }).catch( (error) => {console.log('single coinIcon download error : ', error); reject(error);});
              }).catch( (error) => {console.log('single coinDetail download error : ', error); reject(error);});
            }
            else {
              reject('No parameter');
            }


        }, (recoverContextError) => { // Can only be equal to self.noEthAccount
          console.log('Context recovery error : ',recoverContextError);
          reject(recoverContextError);
        });
      }
    );

  }

  initContext() {
    console.log('Open initContext');
    if(!this.c[this.myContractAddresses]){this.c[this.myContractAddresses] = []}
    if(!this.c[this.allContractAddresses]){this.c[this.allContractAddresses] = []}
    if(!this.c[this.names]){this.c[this.names] = {}}
    if(!this.c[this.colors]){this.c[this.colors] = {}}
    if(!this.c[this.amounts]){this.c[this.amounts] = {}}
    if(!this.c[this.icons]){this.c[this.icons] = {}}
    if(!this.c[this.landscapes]){this.c[this.landscapes] = {}}
    if(!this.c[this.brandIcons]){this.c[this.brandIcons] = {}}
    if(!this.c[this.companyNames]){this.c[this.companyNames] = {}}
    if(!this.c[this.offers]){this.c[this.offers] = {}}
    if(!this.c[this.offerImages]){this.c[this.offerImages] = {}}
    if(!this.c[this.rewards]){this.c[this.rewards] = {}}
    if(!this.c[this.locations]){this.c[this.locations] = {}}
    if(!this.c[this.info]){this.c[this.info] = {}}
    console.log('Close initContext');
  }

  recoverContext(): Promise<any> {
    console.log('Open recoverContext');
    var self = this;
    return new Promise(
      function(resolve, reject) {
        self.recoverDataAtKey(self.storageKey, self.c, self.myContractAddresses);
        self.recoverDataAtKey(self.storageKey, self.c, self.allContractAddresses);
        self.recoverDataAtKey(self.storageKey, self.c, self.names);
        self.recoverDataAtKey(self.storageKey, self.c, self.colors);
        self.recoverDataAtKey(self.storageKey, self.c, self.amounts);
        self.recoverDataAtKey(self.storageKey, self.c, self.icons);
        self.recoverDataAtKey(self.storageKey, self.c, self.landscapes);
        self.recoverDataAtKey(self.storageKey, self.c, self.brandIcons);
        self.recoverDataAtKey(self.storageKey, self.c, self.companyNames);
        self.recoverDataAtKey(self.storageKey, self.c, self.offers);
        self.recoverDataAtKey(self.storageKey, self.c, self.offerImages);
        self.recoverDataAtKey(self.storageKey, self.c, self.rewards);
        self.recoverDataAtKey(self.storageKey, self.c, self.locations);
        self.recoverDataAtKey(self.storageKey, self.c, self.info).then( (account) => {
          console.log('Account recovered : ', account);
          if(account[self.infoAddress] && account[self.infoPrivateKey]) {
            resolve(account[self.infoAddress]);
          }
          else{
            reject(self.noEthAccount);
          }

        }, (accountError) => {
          console.log('Account recovery error : ', accountError);
          reject(self.noEthAccount);
        });
      });
  }

  recoverDataAtKey(key : string, receiver : any, field : string): Promise<any> {
    console.log('Open recoverDataAtKey : ',field);
    var self = this;
    return new Promise(
      function(resolve, reject) {
        self.storage.get(key).then(
          function(result : string){
            if(result != null){
              console.log('Get receiver[field] : ',field);
              if(receiver){
                if(JSON.parse(result)[field]){
                  receiver[field] = JSON.parse(result)[field];
                  console.log('Your data at field : ', field,' from storage is: ',receiver);
                  resolve(receiver[field]);
                }else{console.log('Storage error : no field in result : ',result); resolve('null')}
              }
              else{console.log('Storage error : no receiver'); reject();}
            }
            else{
              console.log('Null storage at field');resolve('null');
            }
          },
          function(error : any){
            console.log('Storage error for key :'.concat(key, ' with message : ', error.message)); reject(error);
          }
        );
      }
    );

  }

  save(): Promise<any> {
    console.log('Open saveCoins');
    var self = this;
    return new Promise(
      function(resolve, reject) {
        self.storeDataAtKey(self.storageKey, self.c).then(
          () => {
            console.log('Close SaveCoins : ', self.c);
            resolve();
          },
          (error) => {
            console.log('ERROR SaveCoins');
            reject();
          }
        );
      }
    );
  }

  clear(){
    console.log('Open clear');

    this.uid = undefined;

    this.storage.remove(this.storageKey);
    this.c = {};
    this.coinDetailObservers = {};
    this.coinAmountObservers = {};
    this.initContext();


    this.save();
    console.log('Close clear');
  }

  storeDataAtKey(key : string, data : any): Promise<any> {
    // console.log('Open storeDataAtKey');
    var self = this;
    return new Promise(
      function(resolve, reject) {
        self.storage.set(key, JSON.stringify(data)).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          });
      }
    );

  }

/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


myCoinCollectionPath(myUid : string): string {
  if(myUid){
    let coinCollectionPath = 'wallets/'.concat(myUid,'/tokens');
    console.log('myCoinCollectionPath : '.concat(coinCollectionPath));
    return coinCollectionPath;
  }
  else{
    console.log('myCoinCollectionPath : None');
    return null;
  }
}

getMyCoinListFromFirestore(myUid: string): Promise<any> {
  console.log('Open getMyCoinListFromFirestore');

  var self = this;
  return new Promise((resolve, reject) => {
    let coinCollectionPath: string = self.myCoinCollectionPath(myUid);
    if( coinCollectionPath ){
      //Subscribtion security
      if(self.myCoinListSubscribtion){self.myCoinListSubscribtion.unsubscribe();console.log('UNSUBSCRIBE GLOBAL');}

      self.myCoinListSubscribtion = self.firestoreProvider
        .getCollection(coinCollectionPath)
        .subscribe( myCoins => {

          console.log('OBSERVABLE MYCOINLIST : ', myCoins);

        if(myCoins != null){
          var myCoinsSimplified = [];

          for(let coin of myCoins) {
            myCoinsSimplified.push(coin.contract);
          }

          //Add new coins
          for(let coin of myCoinsSimplified) {
            if(self.c[self.myContractAddresses].indexOf(coin)<0){
              self.c[self.myContractAddresses].push(coin);
            }
          }

          //Delete old coins
          for(let coin of self.c[self.myContractAddresses]) {
            if(myCoinsSimplified.indexOf(coin)<0){
              self.c[self.myContractAddresses].splice(self.c[self.myContractAddresses].indexOf(coin),1);
              self.cleanCoin(self, coin);
            }
          }

          /*******************************************/

          resolve( self.c[self.myContractAddresses] );

        }
        else{
          console.log('Null dbCoins list');
          resolve();
        }

      });

    }

  });


}

downloadMyCoinAmounts(coinContractAddresses: any, uid: string): Promise<any> {
  console.log('Open downloadMyCoinAmounts');
  var self = this;
  return new Promise(
    function(resolve, reject) {
      let res: boolean[] = []; // Array to download all elements in parallel and log the successes
      let tot: number = coinContractAddresses.length; // Total number of downloads

      for(let coinContractAddress of coinContractAddresses) {
        self.downloadCoinAmount(coinContractAddress, uid).then( (amount) => {
          console.log('Amount of coin : ', coinContractAddress, ' is : ', amount);
          res.push(true);
          if(self.checkRes(res, tot)){

            self.save().then( () => {
              resolve(res.length);
            }).then( () => { reject(res.length); });

          }
        }).catch( (err) => {
          console.log('Error downloading amount of ', coinContractAddress, ' : ', err);
          res.push(false);
          reject(err);
        });
      }

    }
  );
}

downloadCoinAmount(coin: string, uid: string): Promise<any> {
  console.log('Open downloadCoinAmount for coin : ', coin);

  //Get amounts
  var self = this;

  return new Promise(
    function(resolve, reject) {
      //Unsubscribtion security
      if(self.coinAmountSubscribtions[coin]){self.coinAmountSubscribtions[coin].unsubscribe();console.log('UNSUBSCRIBE AMOUNT');}
      let path = self.myCoinCollectionPath(uid).concat('/',coin);
      self.coinAmountObservers[coin] = self.firestoreProvider.getDocument(path);
      self.coinAmountSubscribtions[coin] = self.coinAmountObservers[coin].subscribe((coin_a) => {
        console.log('OBSERVABLE MYCOINAMOUNT : ', coin);
        let amount = coin_a['balance'];
        //Show alert
        var delta : number = parseInt(amount) - parseInt(self.c[self.amounts][coin]);
        if(delta > 0){
          self.alertProvider.receiveAlert(delta, self.c[self.names][coin], self.getLanguage());
        }
        else if (delta < 0){
          //self.alertProvider.sendAlert(-delta, self.c[self.names][coin]);
        }
        //Update amount
        self.c[self.amounts][coin] = amount;
        resolve(amount);
      }, (err) => {
        reject(err);
      }
    );

  });

}

cleanCoin(self : any, coin : string) {
  console.log('Open cleanCoin');
  var delta : number = parseInt(self.c[self.amounts][coin]);
  if(delta > 0){
    self.alertProvider.sendAlert(delta, self.getCoinName(coin));
  }
  else if (delta < 0){
    console.log('ERROR : Negative amount of coins')
  }
  self.c[self.names][coin] = undefined;
  self.c[self.colors][coin] = undefined;
  self.c[self.amounts][coin] = 0;
  self.c[self.icons][coin] = undefined;
  self.c[self.landscapes][coin] = undefined;
  self.c[self.brandIcons][coin] = undefined;
  self.c[self.companyNames][coin] = undefined;
  self.c[self.offers][coin] = undefined;
  self.c[self.offerImages][coin] = undefined;
  self.c[self.rewards][coin] = undefined;
  self.c[self.locations][coin] = undefined;
  self.coinDetailSubscribtions[coin] = undefined;
  self.coinDetailObservers[coin] = undefined;
  self.coinAmountSubscribtions[coin] = undefined;
  self.coinAmountObservers[coin] = undefined;
  self.coinOfferSubscribtions[coin] = undefined;
  self.coinOfferObservers[coin] = undefined;
  console.log('Close cleanCoin');
}

initCoinList(coinAddressesList: any) { //this.c[this.myContractAddresses]
  console.log('Open initCoinList');

  for(let coinAddress of coinAddressesList) {
    this.initCoin(coinAddress);
  }
  console.log('Close initCoinList');
}

initCoin(coin: any) {
  if(!this.c[this.names][coin]) {this.c[this.names][coin] = '';}
  if(!this.c[this.colors][coin]) {this.c[this.colors][coin] = this.fidOrange;}
  if(!this.c[this.amounts][coin]) {this.c[this.amounts][coin] = 0;}
  if(!this.c[this.icons][coin]) {this.c[this.icons][coin] = this.defaultCoinImage;}
  if(!this.c[this.landscapes][coin]) {this.c[this.landscapes][coin] = this.defaultLandscapeImage;}
  if(!this.c[this.brandIcons][coin]) {this.c[this.brandIcons][coin] = this.defaultBrandIcon;}
  if(!this.c[this.companyNames][coin]) {this.c[this.companyNames][coin] = '';}
  if(!this.c[this.offers][coin]) {this.c[this.offers][coin] = {};}
  if(!this.c[this.offerImages][coin]) {this.c[this.offerImages][coin] = {};}
  if(!this.c[this.rewards][coin]) {this.c[this.rewards][coin] = {};}
  if(!this.c[this.locations][coin]) {this.c[this.locations][coin] = {};}
}

downloadAllCoinInfos(coinContractAddresses: any): Promise<any> { //this.c[this.myContractAddresses]
  console.log('Open downloadAllCoinInfos : ', coinContractAddresses);

  var self = this;
  return new Promise(
    function(resolve, reject) {

      for(let coinContractAddress of coinContractAddresses) {
        self.downloadAllInfoForCoin(coinContractAddress).then( (length) => {
          console.log('All parameters downloaded : ', length);
          resolve();
        }).catch( (parameter) => {
          console.log('Error downloading parameter :');
          reject();
        });
        // resolve();
      }

  });

}

downloadAllInfoForCoin(coinID: string): Promise<any> { //coinContractAddress

  var self = this;
  console.log('Open downloadAllInfoForCoin : ', coinID);
  return new Promise(
    function(resolve, reject) {
      let res: boolean[] = []; // Array to download all elements in parallel and log the successes
      let tot: number = 7; // Total number of downloads : 8

      // #1 Get coin details
      self.downloadCoinDetail(coinID).then(()=>{ res.push(true);
        if(self.checkRes(res, tot)){ resolve(res.length); }
      }).catch(()=>{res.push(false); reject('CoinDetail')});

      // #2 Download coin icons
      self.downloadCoinIcon(coinID).then(()=>{ res.push(true);
        if(self.checkRes(res, tot)){ resolve(res.length); }
      }).catch(()=>{res.push(false); reject('CoinIcon')});

      // #3 Download landscape images
      self.downloadLandscapeImage(coinID).then(()=>{ res.push(true);
        if(self.checkRes(res, tot)){ resolve(res.length); }
      }).catch(()=>{res.push(false); reject('LandscapeImage')});

      // #4 Download brand icons
      self.downloadBrandIcon(coinID).then(()=>{ res.push(true);
        if(self.checkRes(res, tot)){ resolve(res.length); }
      }).catch(()=>{res.push(false); reject('BrandIcon')});

      // #5 Download offers list
      self.downloadOffers(coinID).then(()=>{ res.push(true);
        if(self.checkRes(res, tot)){ resolve(res.length); }
      }).catch(()=>{res.push(false); reject('Offers')});

      // #6 Download rewards list
      self.downloadRewards(coinID).then(()=>{ res.push(true);
        if(self.checkRes(res, tot)){ resolve(res.length); }
      }).catch(()=>{res.push(false); reject('Rewards')});

      // #7 Download locations list
      self.downloadLocations(coinID).then(()=>{ res.push(true);
        if(self.checkRes(res, tot)){ resolve(res.length); }
      }).catch(()=>{res.push(false); reject('Locations')});


    }
  );

}

checkRes(res: boolean[], totalDownloads: number): boolean {
  let count: number = 0;
  for(let rr of res) {
    if(rr){
      count +=1;
    }
  }
  if(count == totalDownloads) {
    return true;
  }
  else {
    return false;
  }
}

downloadCoinDetail(coin: string): Promise<any> {
  //Get coin details
  var self = this;
  console.log('Open downloadCoinDetail');
  return new Promise(
    function(resolve, reject) {
      //Unsubscribtion security
      if(self.coinDetailSubscribtions[coin]){self.coinDetailSubscribtions[coin].unsubscribe();console.log('UNSUBSCRIBE DETAIL');}
      console.log('CreateCoinDetailObserver');
      let path = self.allCoinsCollectionPath.concat(coin);
      self.coinDetailObservers[coin] = self.firestoreProvider.getDocument(path);
      self.coinDetailSubscribtions[coin] = self.coinDetailObservers[coin]
        .subscribe((coinDetails) => {
          console.log('SUBSCRIBE COIN : ', coinDetails);
          self.c[self.names][coin] = coinDetails['name'];
          self.c[self.colors][coin] = coinDetails['color'];
          self.c[self.companyNames][coin] = coinDetails['company'];
          //self.coinDetailSubscribtions[coin].unsubscribe();
          resolve(coinDetails);
    });
  });

}


downloadCoinIcon(coin: string): Promise<any> {
  // Download coin icons
  var self = this;

  return new Promise(
    function(resolve, reject) {
      let icon_size: string;
      if( self.iconSize == IconSize.XXL) {
        icon_size = 'XXL_images/';
      }
      else {
        icon_size = 'normal_images/';
      }
      self.firestoreProvider.downloadImageAtPath('coinIcons/'.concat(icon_size,coin,'.png')).then(
        function(result : string){
          self.c[self.icons][coin] = result;
          console.log(coin.concat(' image added to coinIcons: ',''/*JSON.stringify(self.c[self.icons])*/));
          resolve(result);
        },
        function(error : any){
          console.log(coin.concat(' image not added to coinIcons. Error: ',error.message));
          reject(error);
        }
      );
  });

}

downloadLandscapeImage(coin: string): Promise<any> {
  // Download landscape image
  var self = this;

  return new Promise(
    function(resolve, reject) {
      self.firestoreProvider.downloadImageAtPath('landscapes/'.concat(coin,'.png')).then(
        function(result : string){
          self.c[self.landscapes][coin] = result;
          console.log(coin.concat(' image added to landscapePictures : ',self.c[self.landscapes][coin] ));
          resolve(result);
        },
        function(error : any){
          console.log(coin.concat(' image not added to landscapePictures. Error: ',error.message));
          reject(error);
        }
      );
  });

}

downloadBrandIcon(coin: string): Promise<any> {
  // Download brand icons
  var self = this;

  return new Promise(
    function(resolve, reject) {
      self.firestoreProvider.downloadImageAtPath('brandIcons/'.concat(coin,'.png')).then(
        function(result : string){
          self.c[self.brandIcons][coin] = result;
          console.log(coin.concat(' image added to brandIcons : ',self.c[self.brandIcons][coin] ));
          resolve(result);
        },
        function(error : any){
          console.log(coin.concat(' image not added to brandIcons. Error: ',error.message));
          reject(error);
        }
      );
  });

}

downloadOffers(coin: string): Promise<any> {
  //Get coin offers
  var self = this;
  return new Promise(
    function(resolve, reject) {

      //Unsubscribtion security
      if(self.coinOffersSubscribtions[coin]){self.coinOffersSubscribtions[coin].unsubscribe();console.log('UNSUBSCRIBE OFFERS');}

      var offersCollectionPath: string = self.offersCollectionPathForCoin(coin);
      console.log('Open downloadOffersList : ', offersCollectionPath);
      self.coinOffersObservers[coin] = self.firestoreProvider.getCollection(offersCollectionPath, 'price');
      self.coinOffersSubscribtions[coin] = self.coinOffersObservers[coin]
        .subscribe((coinOffers) => {
          console.log('SUBSCRIBE OFFER : ', coinOffers);
          var localOffersList: any [] = [];
          for(let off of coinOffers) {
            if(off) {
              //console.log('OFI : ', off);
              localOffersList.push(off);
              self.downloadOfferImage(off[self.offerID], coin);
            }
          }
          self.c[self.offers][coin] = localOffersList;
          //console.log('CoinOffers for ', self.c[self.names][coin], ' : ', coinOffers);
          resolve(localOffersList);
      });

  });

}

downloadOfferImage(offerID: any, coinID: string): Promise<any> {
  var self = this;
  return new Promise(
    function(resolve, reject) {
      self.firestoreProvider.downloadImageAtPath('offers/'.concat(coinID,'/',offerID,'.png')).then(
        function(result : string){
          self.c[self.offerImages][coinID][offerID] = result;
          console.log(coinID.concat('image added to offerImages : ',self.c[self.offerImages][coinID] ));
          resolve(result);
        },
        function(error : any){
          console.log(coinID.concat('image not added to offers. Error: ',error.message));
          reject(error);
        }
      );
    }
  );
}

downloadRewards(coin: string): Promise<any> {
  var self = this;
  return new Promise(
    function(resolve, reject) {
      resolve();
  });
  //------> Download Rewards
}

downloadLocations(coin: string): Promise<any> {
  //Get coin offers
  var self = this;
  return new Promise(
    function(resolve, reject) {
      //Unsubscribtion security
      if(self.coinLocationsSubscribtions[coin]){self.coinLocationsSubscribtions[coin].unsubscribe();console.log('UNSUBSCRIBE Locations');}

      var locationsCollectionPath: string = self.locationsCollectionPathForCoin(coin);
      console.log('Open downloadLocationsList : ', locationsCollectionPath);
      self.coinLocationsObservers[coin] = self.firestoreProvider.getCollection(locationsCollectionPath);
      self.coinLocationsSubscribtions[coin] = self.coinLocationsObservers[coin].subscribe((coinLocations) => {
        console.log('SUBSCRIBE LOCATIONS : ', coinLocations);
        var localLocationsList: any [] = [];
        for(let loc of coinLocations) {
          if(loc) {
            localLocationsList.push(loc);
          }
        }
        self.c[self.locations][coin] = localLocationsList;
        console.log('CoinLocations for ', self.c[self.names][coin], ' : ', coinLocations);
        resolve(coinLocations);
        //locationsSubscribtions.unsubscribe();
      });

  });

}

offersCollectionPathForCoin(coinID: string): string {
  return ''.concat('tokens/', coinID, '/offers');
}

locationsCollectionPathForCoin(coinID: string): string {
  return ''.concat('tokens/', coinID, '/positions');
}

addCoin() {
  var newCoin = {
      balance : 0,
      address : 'Coin',
      coinColor : this.fidOrange,
      coinName : ''
  };

  console.log('Open addCoin');
  let coinCollectionPath: string = this.myCoinCollectionPath(this.getUid());
  if(coinCollectionPath){
    this.firestoreProvider.setDocInCollection(newCoin, coinCollectionPath).subscribe(
      (res) => {
        console.log('Coin added successfully');
      },
      (err) => {
        console.log('addCoin error : ',err);
      }
    );
    //addObserver.unsubscribe();
  }

  console.log('Close addCoin');
}

  removeCoin(coinId : string) {
    console.log('Open removeCoin');
    this.firestoreProvider.deleteDocFromCollection(coinId, this.myCoinCollectionPath(this.getUid()));
    console.log('Close removeCoin');
  }


  updateContent() {
    // this.firestoreProvider.updateDocFromCollectionWithContent('IVC2N9q8ux2SeMcNYhAW','CoinTypes',{
    //   amount : 11
    // });
  }


}
