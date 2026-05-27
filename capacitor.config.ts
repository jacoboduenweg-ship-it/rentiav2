import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rentia.valespremium',
  appName: 'RENTIA VALES PREMIUM',
  webDir: 'www',
  server: {
    cleartext: true// Asegúrate de que no sea https
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
