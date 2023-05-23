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
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';

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
            InAppBrowser.create(value!.toString(), '_blank', {location: 'no', toolbar: 'no', zoom: 'no'});
        },
    }
});

</script>