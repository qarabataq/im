<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Yeni Baglanti Ekle</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal">Kapat</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-grid>
              <ion-row>
                <ion-col size="auto">
                  <ion-label position="floating">Site Adresi</ion-label>
                  <ion-input v-model="item.site" type="text"></ion-input>
                </ion-col>
                <ion-col size="auto">
                  <ion-button fill="clear" @click="testSite" style="margin-top: 28px;">Test</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Kullanıcı Adı</ion-label>
            <ion-input v-model="item.username" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Parola</ion-label>
            <ion-input v-model="item.password" type="password"></ion-input>
          </ion-item>
        </ion-list>
        <ion-button expand="block" @click="submitForm">Ekle</ion-button>
      </ion-content>
    </ion-page>
  </template>
    
  <script lang="ts">
  import { IonPage, IonGrid,IonRow,IonCol, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonList,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
      IonButtons,
      IonGrid,
      IonRow,
      IonCol
    },
    setup(_, { emit }) {
      const item = ref({ site: '', username: '', password: '' });
  
      const closeModal = () => {
        emit('close');
      };
  
      const submitForm = () => {
        emit('submit', item.value);
        closeModal();
      };
      const testSite = () => {
        alert('test');
      };
  
      return {
        item,
        closeModal,
        submitForm,
        testSite
      };
    }
  });
  </script>