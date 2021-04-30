<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </template>
    <v-card id="card" :loading="loadingCard">
      <v-card-title>Bejelentkezés</v-card-title>
      <v-divider class="mx-5"></v-divider>
      <v-container fluid grid-list-lg class="pt-3">
        <v-form ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field class="mx-5" name="email" v-model="email" label="E-mail cím"
                prepend-icon="fas fa-user" 
                @keyup.enter="validateUser" 
                :rules="[ value =>!! value || 'E-mail cím megadása kötelező!', value => /.+@.+\..+/.test(value) || 'E-mail cím helytelen',]"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field class="mx-5" name="password" v-model="password" label="Jelszó"
                 prepend-icon="fas fa-lock"
                :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'" 
                @keyup.enter="validateUser" 
                @click:append="show = !show"
                :type="show ? 'text' : 'password'"
                :rules="[value => !!value || 'A jelszó megadása kötelező!', 
                        value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/.test(value) || 'A jelszó helytelen' , 
                        value => value.length >= 5 || 'Legalább 5 karakter hosszúságú kell legyen']"/>
            </v-flex>
          </v-layout>
        </v-form>
        <v-card-actions class="justify-center">
          <v-btn outlined color="#2B405D" class="mr-4" @click="validateUser" text>Bejelentkezés</v-btn>
          <v-btn color="#2B405D" outlined text @click="dialog = false"> Vissza </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
      <v-snackbar v-model="loginSuccesSnackbar" absolute rounded="pill" color="grey" class="mb-5">
        {{ loginSuccesMsg }}
        <v-btn text @click="loginSuccesSnackbar = false">Close</v-btn>
      </v-snackbar>
      <v-snackbar v-model="loginFailedSnackbar" absolute rounded="pill" color="grey" class="mb-5">
        {{ loginFailedMsg }}
        <v-btn text @click="loginFailedSnackbar = false">Close</v-btn>
      </v-snackbar>
  </v-dialog>
</template>

<script>
  import AuthRequest from "@/services/AuthService";
  
  export default {
    name: 'LoginDialog',
    data() {
      return {
        dialog: false,
        email: "",
        password: "",
        show: false,
        loadingCard: false,
        loadingButton: false,
        loginFailedMsg: "",
        loginSuccesMsg: "",
        loginFailedSnackbar: false,
        loginSuccesSnackbar: false
      };
    },
    methods: {
      toAdmin() {
        this.loadingCard = "grey";
        setTimeout(
          () => ((this.loadingCard = false), this.$router.push({ path: "/user/admin" })),
          1000
        );
      },
      validateUser() {
        if (this.$refs.form.validate()) {
          this.loginUser();
        }
      },
      loginUser(){
        this.loadingCard = "grey";
        AuthRequest.loginVerification({
          emailAddress: this.email,
          password: this.password
        }).then((res)=>{
          this.loginSuccesMsg = "Sikeres bejelentkezés!";
          setTimeout(
            () => (this.loginFailedSnackbar = false),
            (this.loginSuccesSnackbar = true),
            1000
          );
          localStorage.setItem("userid", res.data.id);
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("role", res.data.roles == "ROLE_ADMIN" ? "Admin" : "Felhasználó");
          this.toAdmin();
        }).catch((err)=>{
          this.loginFailedMsg = "Sikertelen bejelentkezés!";
          setTimeout(
            () => (this.loginSuccesSnackbar = false),
            (this.loginFailedSnackbar = true),
            1000
          );
        })
        setTimeout(() => (this.loadingCard = false), 1000);
      }
    },
  }
</script>
<style >
  #card {
    background-color: #E1E1DE;
    color: #2B405D;
  }
</style>