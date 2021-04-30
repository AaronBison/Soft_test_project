<template>
    <v-card id="card">
        <v-card-title> Felhasználó hozzáadása </v-card-title>
        <v-divider class="mx-5 my-3"></v-divider>
        <v-form ref="form" class="mx-5 " lazy-validation>
            <v-flex>
                <v-text-field class="ml-5 my-5" type="name" name="name" v-model="name" label="Új felhasználó neve" dense
                    :rules="[ value =>!! value || 'A felhasználó név megadása kötelező!']"/>
            </v-flex>
            <v-flex>
                <v-text-field class="ml-5" type="e-mail" name="e-mail" v-model="email" label="E-mail" dense
                    :rules="[ value =>!! value || 'E-mail cím megadása kötelező!', value => /.+@.+\..+/.test(value) || 'E-mail cím helytelen']"/>
            </v-flex>
            <v-flex>
                <v-text-field class="ml-5" type="phonenumber" name="phonenumber" v-model="phonenumber" label="Telefonszám"
                    color="grey" :rules="[ value =>!! value || 'Telefonszám megadása kötelező!',
                                        value => /^\d{10}$/.test(value) || 'A telefonszám megadása csak számokkal történhet!']"/>
            </v-flex>
            <v-flex>
                <v-select type="visibility" name="visibility" v-model="visibility" class="ml-5" :items="visibilityList"
                    label="Láhatósági jog"
                    :rules="[ value =>!! value || 'Láthatósági jog megadása kötelező!']"/>
            </v-flex>
            <v-card-actions class="justify-center"> 
                <v-btn color="#2B405D" @click="validateUser" outlined text class="mr-4" >Hozzáadás</v-btn>
            </v-card-actions>
            <transition >
                <v-list-item v-if="loadingButtonX" >
                    <v-list-item-icon>
                        <v-icon color="red" >{{ regIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <v-list-item-title class="red--text" >{{ registartionMsg }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </transition>
            <transition >
                <v-list-item v-if="loadingButtonTick" >
                    <v-list-item-icon>
                        <v-icon color="green" >{{ regIcon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <v-list-item-title class="green--text" >{{ registartionMsg }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </transition>
        </v-form>
    </v-card>
</template>

<script>
import AuthRequest from "@/services/AuthService";
import DeleteUsers from "./deleteUser.vue"

export default {
    name: 'AddUser',
    components:{DeleteUsers},
    data () {
        return {
            name: "",
            email: "",
            password: "",
            phonenumber: "",
            visibility: "",
            visibilityList: ["Admin", "Felhasználó"],
            show: false,
            loadingButtonX: false,
            loadingButtonTick:false,
            regIcon: "",
            registartionMsg: ""
        };
    },
    methods:{
        validateUser(){
            if (this.$refs.form.validate()) {
                this.registration();
            }
        },
        registration(){
            AuthRequest.registerUser({
                username : this.name,
                emailAddress : this.email,
                phoneNumber : this.phonenumber,
                authority : this.visibility
            }).then((res)=>{
                console.log(res)
                this.registartionMsg = "Az új felhasználó sikeresen hozzáadodott!";
                this.loadingButtonTick = true;
                this.regIcon = "fas fa-check";
                setTimeout(() => (this.loadingButtonTick = false),
                                3000);
            }).catch((err)=>{
                this.registartionMsg = "Az új felhasználó hozzáadása nem sikerült!";
                this.regIcon = "fas fa-times";
                this.loadingButtonX = true;
                setTimeout(() => (this.loadingButtonX = false),
                                3000);
            })
        }
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>