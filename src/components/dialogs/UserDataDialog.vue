<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>fas fa-user</v-icon>
      </v-btn>
    </template>
    <v-card id="card">
        <v-layout column align-center>
            <v-list-item-title  class="subtitle-1 mt-5">{{ this.full_name }}</v-list-item-title>
            <v-list-item-subtitle class="mt-5">{{ this.status }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ this.email }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ this.phone_number }}</v-list-item-subtitle>
            <ChangeUserDataDialog />
        </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  import AuthRequest from "@/services/AuthService";
  import ChangeUserDataDialog from "./ChangeUserDataDialog"

  export default {
    name: 'UserDataDialog',
    components:{ ChangeUserDataDialog},
    data() {
        return {
            dialog: false,
            created_at: "",
            email: "",
            full_name: "",
            phone_number: "",
            status: "",
        };
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
<style >
  #card {
    background-color: #E1E1DE;
    color: #2B405D;
  }
</style>