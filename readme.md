google-services.json - extract from firebase, add to root path
credentials.json - extract from eas, add to root path

How this works:

Used firebase which auto creates the web,android,ios client ID
Steps to use firebase
Create a firebase account - https://console.firebase.google.com/
Create a project
In the project settings, enter - 
1. App name - get from the development project in android/expo folder
2. SHA-1 certificate fingerprint - get from keystore either through eas or keytool
3. Download the google-services.json for android /GoogleService-Info.plist for ios
https://react-native-google-signin.github.io/docs/setting-up/get-config-file#:~:text=Sign%20in%20to,services.json%20file.

This configuration setup allows us to do a google login

For more details visit https://react-native-google-signin.github.io/