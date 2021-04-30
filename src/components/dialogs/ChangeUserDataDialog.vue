<template>
    <v-dialog v-model="dialog" width="700">
        <template v-slot:activator="{ on }">
            <v-btn color="#2B405D" v-on="on" outlined text class="mt-5">Adatok szerkesztése</v-btn>
        </template>
        <v-card class="mt-5" id="card">
            <v-card-title> Személyes adatok változtatása </v-card-title>
            <v-form ref="form" class="mx-5" lazy-validation>
                <v-text-field label="Név" required v-model="full_name" 
                    :rules="[ value =>!! value || 'A felhasználó név megadása kötelező!']"> </v-text-field>
                <v-text-field label="E-mail" required v-model="email" 
                    :rules="[ value =>!! value || 'E-mail cím megadása kötelező!', value => /.+@.+\..+/.test(value) || 'E-mail cím helytelen',]"> </v-text-field>
                <v-text-field label="Telefonszám" required v-model="phone_number"
                    :rules="[ value =>!! value || 'Telefonszám megadása kötelező!']" > </v-text-field>
                <transition >
                    <v-list-item v-if="updFaild" >
                        <v-list-item-icon>
                            <v-icon class="red--text"> fas fa-times </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content >
                            <v-list-item-title class="red--text" >{{ msg }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </transition>
                <transition >
                    <v-list-item v-if="updSuc" >
                        <v-list-item-icon>
                            <v-icon class="green--text"> fas fa-check </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content >
                            <v-list-item-title class="green--text" >{{ msg }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </transition>
                <v-card-actions> 
                    <v-spacer></v-spacer>
                    <v-btn color="#2B405D" outlined text class="mr-4" @click="validateData"> Szerkesztés </v-btn>
                    <v-btn color="#2B405D" outlined text @click="dialog = false"> Vissza </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
  </v-dialog>
</template>

<script>

import AuthRequest from "@/services/AuthService";
import UserTasks from "@/services/userTasks";

export default {
    name: "ChangeUserData",
    data() {
        return {
            dialog: false,
            show: false,
            created_at: "",
            email: "",
            full_name: "",
            phone_number: "",
            status: "",
            updSuc:false,
            updFaild:false,
            msg:"",
        };
    },
    methods: {
        settingData()
        {
            this.dialog = false;
            this.show = false;
            this.created_at = "";
            this.email = "";
            this.full_name = "";
            this.phone_number = "";
            this.status = "";
            this.updSuc = false;
            this.updFaild = false;
            this.msg = "";
        },
        getUserData() {
            const userid = localStorage.getItem("userid");
            AuthRequest.getUser({id: userid}).then((res)=>{
            this.created_at = res.data.createdAt;
            this.email = res.data.emailAddress;
            this.full_name = res.data.username;
            this.phone_number = res.data.phoneNumber;
            })
        },
        validateData(){
            if (this.$refs.form.validate()) {
                this.updateUser();
            }
        },
        updateUser(){
            const userid = localStorage.getItem("userid");
            UserTasks.updateUser({
                _id: userid,
                username: this.full_name,
                emailAddress: this.email,
                phoneNumber: this.phone_number,
            }).then((res)=>{
                this.updSuc=true;
                this.msg = "Sikeres szerkesztés!"
                setTimeout(() => (this.dialog = false),500);
            }).catch((err)=>{
                this.updFaild = false;
                this.msg = "Sikertelen szerkesztés!"
            });
        }
    },
    mounted() {
        this.settingData();
        this.getUserData();
    }
};
</script>
<style>
</style>