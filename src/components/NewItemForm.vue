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
        <ion-item :class="{ 'ion-invalid': !validName }">
          <ion-label position="floating">Site Adı</ion-label>
          <ion-input v-model="item.name" type="text"></ion-input>
        </ion-item>
        <ion-item :class="{ 'ion-invalid': !validSite }">
          <ion-grid>
            <ion-row>
              <ion-col size="10">
                <ion-label position="floating">Site Adresi</ion-label>
                <ion-input v-model="item.site" type="text"></ion-input>
              </ion-col>
              <ion-col size="2">
                <ion-button fill="clear" @click="testSite" style="margin-top: 28px;">Test</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
        <ion-item :class="{ 'ion-invalid': !validUsername }">
          <ion-label position="floating">Kullanıcı Adı</ion-label>
          <ion-input v-model="item.username" type="text"></ion-input>
        </ion-item>
        <ion-item :class="{ 'ion-invalid': !validPassword }">
          <ion-label position="floating">Parola</ion-label>
          <ion-input v-model="item.password" type="password"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button expand="block" @click="submitForm" :disabled="!formValid">Kaydet</ion-button>
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
import { defineComponent, ref, computed } from "vue";
import axios from "axios";

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
        : { name: "", site: "", username: "", password: "" }
    );

    const validName = computed(() => item.value.name.trim().length > 0);
    const validSite = computed(() => item.value.site.trim().length > 0);
    const validUsername = computed(() => item.value.username.trim().length > 0);
    const validPassword = computed(() => item.value.password.trim().length > 0);

const formValid = computed(
  () => validName.value && validSite.value && validUsername.value && validPassword.value
);

const closeModal = () => {
  emit("close");
};

const submitForm = () => {
  if (formValid.value) {
    emit("submit", item.value);
    closeModal();
  } else {
    alert("Lütfen tüm alanları doldurunuz.");
  }
};

const testSite = async () => {
  try {
    const response = await axios.get(item.value.site + "/fappsetting/getPublicAppSettings");
    if (response.data.appName) {
      alert("bağlantı başarılı.");
    } else {
      alert("bağlantı başarısız.");
    }
  } catch (error) {
    alert("bağlantı başarısız.");
  }
};

return {
  item,
  closeModal,
  submitForm,
  testSite,
  validName,
  validSite,
  validUsername,
  validPassword,
  formValid,
};

},
});
</script>