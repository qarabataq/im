import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.iframe.im',
  appName: 'iFrame',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },  
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
