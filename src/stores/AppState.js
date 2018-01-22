import { observable, action } from "mobx"
import { servicefactory } from 'tcellproxy'

export default class AppState{    
    
    @observable rights;   
    @observable authenticated;
    
    constructor(){
        this.authenticated = false;
        // this.remoteWebApiService =  ConfigurationParameters.KysWebApiInCluster + '/api/';
        // this.rootHost = ConfigurationParameters.RootHost;
        // this.uploadService = ConfigurationParameters.UploadServiceInCluster;
        // this.oAuthServiceUrl = ConfigurationParameters.OAuthServiceUrl;
        this.rights = [];
        let isFederatedInputs = document.getElementsByName('isFederated');
        let accessTokenInputs = document.getElementsByName('accessToken');
        let refreshTokenInputs = document.getElementsByName('refreshToken');
        let secretKeyInputs = document.getElementsByName('secretKey');
        let userNameInputs = document.getElementsByName('userName');

        this.isFederated = isFederatedInputs.length > 0 ? isFederatedInputs[0].value == 'True' : false;        
        let accessToken = accessTokenInputs.length > 0 ? accessTokenInputs[0].value : null;  
        let refreshToken = refreshTokenInputs.length > 0 ? refreshTokenInputs[0].value : null ;
        let secretKey = secretKeyInputs.length > 0 ? secretKeyInputs[0].value : null ;
        this.userName = userNameInputs.length > 0 ? userNameInputs[0].value : null ;
        // servicefactory.configure(
        //     this.rootHost,
        //     this.remoteWebApiService,
        //     this.userName,
        //     secretKey,
        //     accessToken,
        //     refreshToken,
        //     this.oAuthServiceUrl
        // );
    }
    @action getUserRights(){
        // servicefactory.proxy.serviceCall("UserState", "GET", null,null,false)
        // .then((data) =>{
        //     let i =0;
        // })
        // .catch((error) =>{
        //     let err = 1;
        // });
    }

}