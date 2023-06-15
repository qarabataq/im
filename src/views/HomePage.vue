<template>  
  <ion-page>  
  <ion-header :translucent="true">  
  <ion-toolbar>  
  <ion-title>i-frame</ion-title>  
  </ion-toolbar>  
  </ion-header>  
  <ion-content :fullscreen="true">  
  <div style="margin:20xp;padding:20px;text-align: center;display: flex; align-items: center; justify-content: center;">  
  <ion-img src="/../assets/logo.png" style="width:50%;height: 50%;"></ion-img>  
  </div>  

  <div v-if="items.length === 0" class="empty-list-message">  
  Bağlantı ekleyin  
  </div>  
  <ion-list v-else>  
  <ion-item-sliding v-for="(item, index) in items" :key="index">  
  <ion-item>  
  <ion-label>{{ item.name }}</ion-label>  
  <ion-button @click="connect(item)" fill="outline" size="small">  
  Bağlan  
  </ion-button>  
  </ion-item>  
  <ion-item-options side="end">  
  <ion-item-option @click="editItem(item)">  
  <ion-icon :icon="createOutline"></ion-icon>  
  Düzenle  
  </ion-item-option>  
  <ion-item-option color="danger" @click="deleteItem(index)">  
  <ion-icon :icon="trashOutline"></ion-icon>  
  Sil  
  </ion-item-option>  
  </ion-item-options>  
  </ion-item-sliding>  
  </ion-list>  
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">  
  <ion-fab-button @click="addNewItem">  
  <ion-icon :icon="addOutline"></ion-icon>  
  </ion-fab-button>  
  </ion-fab>  
  </ion-content>  
  <ion-modal :is-open="showModal" @dismiss="closeModal">  
  <new-item-form @submit="submitForm" @close="closeModal" :initialItem="initialItem"></new-item-form>  
  </ion-modal>  
  </ion-page>  
</template>  
<script lang="ts">  
import { Preferences } from '@capacitor/preferences';  
import {IonAlert,IonModal,IonFab,IonIcon,IonFabButton, IonList, IonItem,IonItemSliding,IonItemOption,IonItemOptions, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonInput,IonButton,IonImg } from '@ionic/vue';  
import { defineComponent ,ref} from 'vue';  
import { addOutline,createOutline, trashOutline } from 'ionicons/icons';  
import NewItemForm from '@/components/NewItemForm.vue';  
import router from '@/router';  
import NotificationsService from '@/services/notifications'







interface Item {  
  name: string;  
  site: string;  
  username: string;  
  password: string;  
}  

export default defineComponent({  
  components: {  
    IonAlert,  
    IonModal,  
    IonFab,  
    IonIcon,  
    IonFabButton,  
    IonList,  
    IonItem,
    IonItemSliding,  
    IonItemOption,  
    IonItemOptions,  
    IonContent,  
    IonHeader,  
    IonPage,  
    IonTitle,  
    IonToolbar,  
    IonInput,  
    IonButton,  
    IonImg, 
    NewItemForm,
  },  
  created() {
    NotificationsService.methods.initPush();
  },
  setup() {  
    const editingIndex = ref(-1);  
    const items = ref<Item[]>([]);  
    const initialItem = ref<Item | null>(null);  
    const showModal = ref(false);  

    const getItems = async () => {
      const itemsData = await Preferences.get({key:'items'});
      if(itemsData.value){
        items.value = JSON.parse(itemsData.value);
      }
    };

    const submitForm = (newItem: Item) => {
      if (editingIndex.value !== -1) {
        items.value.splice(editingIndex.value, 1, newItem);
        editingIndex.value = -1;
      } else {
        items.value.push(newItem);
      }
      closeModal();
      Preferences.set({key:'items', value:JSON.stringify(items.value)});
    };  

    const deleteItem = (index: number) => {
      items.value.splice(index, 1);
      Preferences.set({key:'items', value:JSON.stringify(items.value)});
    };

    const editItem = (item: Item) => {
      editingIndex.value = items.value.indexOf(item);
      initialItem.value = item;
      showModal.value = true;
    };
    
    const connect = async (item: Item) => {
      console.log('Bağlan:', item);
      let params = btoa(item.username+'|'+item.password+'|'+'dashboard.html?recID=747347bc-f6fc-492d-a0c9-22268cf70623');
      await Preferences.set({key:'url',value:item.site+'/html/login.html?params='+params});
      router.push('/iframe');
    };

    const addNewItem = () => {
      console.log('Yeni öğe ekle');
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    getItems();

    return {
      items,
      deleteItem,
      editItem,
      connect,
      addOutline,
      trashOutline,
      createOutline,
      addNewItem,
      showModal,
      closeModal,
      submitForm,
      initialItem,
    };
  },
});
</script>