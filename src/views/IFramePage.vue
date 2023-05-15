<template>
    <ion-page>
        <ion-content :fullscreen="true">
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { InAppBrowser } from '@cordova-plugin-inappbrowser/inappbrowser';

export default defineComponent({
    name: 'IFramePage',
    components: {
        IonContent,
        IonPage,
    },
    mounted() {
        this.getPreferences();
    },
    data() {
        return {
            url: ''
        }
    },
    methods: {
        async getPreferences() {
            const { value } = await Preferences.get({ key: 'url' });

            InAppBrowser.create(value!.toString(),'_self',{location:'no',toolbar:'no',zoom:'no'}).then((browser: InAppBrowser) => {
browser.show();
});




            
        },
    }
});

</script>