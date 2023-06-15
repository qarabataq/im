import {Capacitor} from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

export default {
    methods: {
        initPush(): void {
            if (Capacitor.getPlatform() !== 'web') {
                this.registerPush();
            }
        },
        registerPush(): void {
            PushNotifications.requestPermissions().then(permission => {
                alert('register');
                if (permission.receive === 'granted') {
                    PushNotifications.register();
                }
            });

            PushNotifications.addListener('registration', (token: any) => {
                console.log('lolo:'+token.value);
                alert(JSON.stringify(token.value));
                //
            });

            PushNotifications.addListener('registrationError', (err: any)=> {
                console.log(err);
                alert(JSON.stringify(err));
            });

            PushNotifications.addListener('pushNotificationReceived', (notification: any) => {
                console.log(notification);
                alert(JSON.stringify(notification));
            });
        }
    }
}
