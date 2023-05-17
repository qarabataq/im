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
      
      <!--
      <v-row style="align-items: center;justify-content: center;">
        <v-col cols="10" style="align-items: center;justify-content: center;">
          <v-combobox
            label="site"
            :items="urls"
            v-model="url"
            clearable
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row style="align-items: center;justify-content: center;">
        <v-col cols="10" style="text-align:center;align-items: center;justify-content: center;">
          <ion-button @click="onInput" size="small">Giriş</ion-button>
        </v-col>
      </v-row>

      -->

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
interface Item {
  name: string;
  site: string;
  username: string;
  password: string;
}

export default defineComponent({
  name: 'HomePage',
  components: {
    IonAlert,
    IonModal,
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
    IonFab,
    IonFabButton,
    IonIcon,
    NewItemForm
  },
  setup(){

    const editingIndex = ref(-1);


    const items = ref<Item[]>([
      { name:'test', site: 'https://test.i-frame.io', username: 'user1', password: 'pass1' },
      { name:'bd',site: 'https://bd.i-frame.io', username: 'user2', password: 'pass2' }
    ]);

    const editItem = (item: Item, index: number) => {
      editingIndex.value = index;
      showModal.value = true;
      initialItem.value = { ...item };
    };

    const submitForm = (newItem: Item) => {
      if (editingIndex.value !== -1) {
        items.value.splice(editingIndex.value, 1, newItem);
        editingIndex.value = -1;
      } else {
        items.value.push(newItem);
      }
      closeModal();
    };
    
    const initialItem = ref<Item | null>(null);



    const deleteItem = (index: number) => {
      items.value.splice(index, 1);
    };
    const connect = async (item: Item) => {
      console.log('Bağlan:', item);
      await Preferences.set({key:'url',value:item.site});
      router.push('/iframe');

    };

    const addNewItem = () => {
      console.log('Yeni öğe ekle');
      showModal.value = true;
    };


    const showModal = ref(false);


    const closeModal = () => {
      showModal.value = false;
    };

    const showDeleteConfirm = ref(false);
    const deleteIndex = ref(-1);



    return {
      items,
      editItem,
      deleteItem,
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
  data() {
    return {
      url: '',
      urls: []
    }
  },
  mounted() {
        this.getPreferences();
    },
  methods: {
    editItem(item:Item){
        console.log(item);
    },
    deleteItem(item:Item){
        console.log(item);
    },
    onInput() {
      this.setPreferences();
    },
    async setPreferences()
    {
      if(this.url.toString().startsWith('https://') == false)
      {
        this.url = 'https://' + this.url;
      }

      await Preferences.set({key:'url',value:this.url});
      var urls = await Preferences.get({key:'urls'});
      console.log(urls.value);
      if(urls.value == null)
      {
        this.urls = [];
        this.urls.push(this.url);
        await Preferences.set({key:'urls',value:JSON.stringify(this.urls)});
      }
      else
      {
        this.urls = JSON.parse(urls.value);
        if(this.urls.indexOf(this.url) == -1)
        {
          this.urls.push(this.url);
          await Preferences.set({key:'urls',value:JSON.stringify(this.urls)});
        }
      }
      router.push('/iframe');
    },
    async getPreferences() {
      const url = await Preferences.get({ key: 'url' });
      const urls = await Preferences.get({key:'urls'});
      this.url = url.value;

      if(urls.value != null)
      {
        try
        {
          this.urls = JSON.parse(urls.value);
        } catch (error) {
          this.urls = [];          
        }
      }
      else
      {
        this.urls = [];
      }
    },
  }
});
</script>

<style scoped>
.empty-list-message {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}

#container {
  text-align: center;  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>