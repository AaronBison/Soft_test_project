<template>
  <div id="app">
    <v-app app id="inspire">
      <v-app-bar color="#2B405D" dark prominent>
        <v-app-bar-title>Sapi 3D virtuális túra</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-md-none" ></v-app-bar-nav-icon>
        <UserDataDialog/>
        <LogOut/>
          <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn> -->
        <template v-slot:extension>
          <v-tabs v-model="tab" dark align-with-title class="d-none d-md-flex">
            <v-tab v-for="item in tabs" :key="item.title" router :to="item.route" link>{{ item.title }}</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-menu v-model="drawer">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="item in tabs" :key="item.title" router :to="item.route" link>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </v-menu>

      <v-sheet id="scrolling-techniques-3" class="overflow-y-auto">
        <v-container>
          <router-view/>
        </v-container>
      </v-sheet>
    </v-app>
  </div>
    <!-- <div id="app">
      <v-app id="inspire">
      <v-app-bar color="#2B405D" prominent dark class="justify-center">
        <v-app-bar-title>3D virtuális túra a Sapientia Erdélyi Magyar Tudományegyetem Marosvásárhely-i karán</v-app-bar-title>
        <v-spacer></v-spacer>
        <UserDataDialog/>
        <LogOut/>
        <template v-slot:extension>
          <v-tabs align-with-title >
            <v-tab v-for="item in tabs" :key="item.title" router :to="item.route" link>{{ item.title }}</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-3" class="overflow-y-auto">
        <v-container>
          <router-view/>
        </v-container>
      </v-sheet>
      </v-app>
    </div> -->
</template>

<script>

import AuthRequest from "@/services/AuthService";

import ChangeUserDataDialog from "./dialogs/ChangeUserDataDialog"
import UserDataDialog from "./dialogs/UserDataDialog"
import LogOut from "./LogOut"

export default {
  name: 'RootAdmin',
  components:{ ChangeUserDataDialog, UserDataDialog,LogOut},
  data () {
    return {
      drawer: false,
      tab: null,
      tabs: [
        {title: 'Beállítások', route: '/user/admin', icon:"fas fa-hammer"},
        {title: 'Model3D', route: '/user/model3d', icon:"fas fa-university"},
        {title: 'Fontos egyetemi helyek', route: '/user/department', icon:"fas fa-book-reader"},
      ]
    }
  },
  methods: {
    getUserData() {
      const userid = localStorage.getItem("userid");
      AuthRequest.getUser({id: userid}).then((res)=>{
        this.created_at = res.data.createdAt;
        this.email = res.data.emailAddress;
        this.full_name = res.data.username;
        this.status = localStorage.getItem("role");
        this.phone_number = res.data.phoneNumber;
      })
    }
  },
  mounted() {
    this.getUserData();
  },
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>
