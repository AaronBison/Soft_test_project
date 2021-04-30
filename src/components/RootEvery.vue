<template>
  <div id="app">
    <v-app app id="inspire">
      <v-app-bar color="#2B405D" dark prominent>
        <v-app-bar-title>Sapi 3D virtuális túra</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-md-none" ></v-app-bar-nav-icon>
        <LoginDialog />
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
</template>

<script>

import LoginDialog from "./dialogs/LoginDialog"

export default {
  name: 'RootEvery',
  components: {LoginDialog},
  data () {
    return {
      drawer: false,
      tab: null,
      tabs: [
        {title: 'Model3D', route: '/model3d', icon:"fas fa-university"},
        {title: 'Fontos egyetemi helyek', route: '/department', icon:"fas fa-book-reader"},
      ],
    }
  }
}
</script>