<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bağlantı Ekle</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Kapat</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="floating">Site Adı</ion-label>
          <ion-input v-model="item.name" type="text"></ion-input>
        </ion-item>
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
import {
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
  IonCol,
} from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
import axios from 'axios';

export default defineComponent({
  props: {
    initialItem: {
      type: Object,
      default: null,
    },
  },
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
    IonCol,
  },
  setup(props, { emit }) {
    const item = ref(
      props.initialItem
        ? { ...props.initialItem }
        : { name:"",site: "", username: "", password: "" }
    );
    const name = ref('');
    const site = ref('');
    const username = ref('');
    const password = ref('');
    watch(
      () => props.initialItem,
      (newItem) => {
        if (newItem) {
          name.value = newItem.name;
          site.value = newItem.site;
          username.value = newItem.username;
          password.value = newItem.password;
        }
      }
    );
    const closeModal = () => {
      emit("close");
    };

    const submitForm = () => {
      emit("submit", item.value);
      closeModal();
    };
    const testSite =async() => {
      try {
        const response = await axios.get(item.value.site+'/fappsetting/getPublicAppSettings');
        if(response.data.appName)
        {
          alert("bağlantı başarılı.");
        }
        else
        {
          alert("bağlantı başarısız.");
        }
      } catch (error) {
        alert('baglanti başarısız.');
      }
    };
    return {
      item,
      closeModal,
      submitForm,
      testSite,
    };
  },
});
</script>