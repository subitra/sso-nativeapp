import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes, isErrorWithCode, isSuccessResponse } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  "webClientId": "518551345305-1duc6n6ci4cl7t26i61c3b3elf5fs3mm.apps.googleusercontent.com"
});

export default function App() {
  const [userInfo, setUserInfo]= useState(null);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log('Response: ', response);
      if (isSuccessResponse(response)) {
        setUserInfo(response.data);
      } else {
        console.log('sign in was cancelled by user');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('already in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Android only, play services not available or outdated');
            break;
          default:
          console.log('some other error happened', error);
        }
      } else {
        console.log('an error that\'s not related to google sign in occurred');
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  }; 
  return (
    <View style={styles.container}>
    {userInfo!=null && <Text>Hello {userInfo.user.name}</Text>}
    {userInfo == null ? 
    (<GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          console.log('hi');
          signIn();
        }}
      />
    ) 
    : (<Button title="Sign out" onPress={() => {
      console.log('Loggin out');
      signOut();
    }}/>)}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
