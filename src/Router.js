import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import  LoginForm  from './components/LoginForm';
import ServiceCallList from './components/ServiceCallList';
import UpdateServiceCall from './components/UpdateServiceCall';
import SplashScreen from './components/SplashScreen';
import ReloadModal from './components/ReloadModal';

const RouterComponent = () => {
    return(
        <Router sceneStyle={{ paddingTop: 50 }} navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} rightButtonTextStyle={styles.navButtonText} leftButtonIconStyle={styles.navIcon}>
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Please Login" />
            </Scene>

            <Scene key="reload" direction="vertical" >
                <Scene key="reloadPage" component={ReloadModal} title="Saving Changes..." />
            </Scene>

            <Scene key="pushReload" direction="vertical" >
                <Scene key="pushReloadPage" component={ReloadModal} title="Loading..." />
            </Scene>

            <Scene key="main" direction="vertical">
                <Scene key="serviceCallList" component={ServiceCallList} title="My Service Calls" panHandlers={null} rightTitle="Log Out" onRight={() => { console.log('')} }  />
            </Scene>
            
            <Scene key="updateServiceCall" direction="vertical" >
                <Scene key="updateCall" component={UpdateServiceCall} title="Update Service Call" />
            </Scene>
        </Router>
    );
};

const styles = {
  navBar: {
    flex: 1,
    backgroundColor: '#1E90FF', // changing navbar color
  },
  navTitle: {
    color: '#FFFFFF', // changing navbar title color,
    fontWeight: 'bold'
  },
  navButtonText: {
    color: '#FFFFFF', // changing navbar icon & Back button color,
    fontWeight: 'bold'
  },
  navIcon: {
      tintColor: '#FFFFFF'
  }
};


export default RouterComponent;