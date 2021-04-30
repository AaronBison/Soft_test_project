<template>
    <div id="app">
        <v-app-bar prominent src="https://cloudflare1.360gigapixels.com/pano/alienrc/00550669_vegsopano.jpg/equirect_crop_3_1/6.jpg"/>
        <v-app  style="background-color: #F7F7F7">
            <v-container class="my-5 " >
                <v-card id="card">
                    <v-card-title class="justify-center"> Jelszó megadása </v-card-title>
                    <v-divider class="mx-5 my-3"></v-divider>
                    <v-card-text>
                        &nbsp;&nbsp;&nbsp;Kedves Felhasználó! Regisztrációja véglegesítéséhez szükséges megadnia a jelszavát és azonosító kódját. 
                        A jelszó és az azonosító kód megadásakor kötelezően kell szerepeljen kis, nagy és szám karakter.
                    </v-card-text>
                    <v-form>
                        <v-flex>
                            <v-text-field class="mx-5" type="tokenCode" name="tokenCode" v-model="tokenCode" label="Azonosító kód" dense
                                prepend-icon="fas fa-keyboard"
                                :rules="[ value =>!! value || 'Az azonosító kód megadása kötelező!', 
                                        value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{32}$/.test(value) || 'A kód helytelen! Figyeljen a kis, nagy és szám karakterre!']"
                                counter="32"/>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field class="mx-5" name="password" v-model="password" label="Jelszó"
                                prepend-icon="fas fa-lock"
                                :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'" 
                                @keyup.enter="passwordAdd" 
                                @click:append="show = !show"
                                :type="show ? 'text' : 'password'"
                                :rules="[value => !!value || 'A jelszó megadása kötelező!', 
                                        value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/.test(value) || 'A jelszó helytelen' , 
                                        value => value.length >= 5 || 'Legalább 5 karakter hosszúságú kell legyen']"/>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field class="mx-5" name="passwordAgain" v-model="passwordAgain" label="Jelszó újra"
                                prepend-icon="fas fa-lock"
                                :append-icon="showAgain ? 'fas fa-eye' : 'fas fa-eye-slash'" 
                                @keyup.enter="passwordAdd" 
                                @click:append="showAgain = !showAgain"
                                :type="showAgain ? 'text' : 'password'"
                                :rules="[value => !!value || 'A jelszó megadása kötelező!', 
                                        value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/.test(value) || 'A jelszó helytelen' , 
                                        value => value.length >= 5 || 'Legalább 5 karakter hosszúságú kell legyen']"/>
                        </v-flex>
                        <v-card-actions class="justify-center">
                            <v-btn outlined color="#2B405D" class="mr-4" @click="passwordAdd" text>Jelszó megerősítése</v-btn>
                        </v-card-actions>
                        <transition >
                            <v-list-item  v-if="loadingButtonX" >
                                <v-list-item-icon  >
                                    <v-icon color="red">{{ regIcon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content >
                                    <v-list-item-title class="red--text" >{{ passwordMsg }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </transition>
                        <transition >
                            <v-list-item  v-if="loadingButtonTick" >
                                <v-list-item-icon  >
                                    <v-icon color="green" >{{ regIcon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content >
                                    <v-list-item-title class="green--text" >{{ passwordMsg }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </transition>
                    </v-form>  
                    
                </v-card>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import AuthRequest from "@/services/AuthService";
import axios from "axios";

export default {
    name: 'Password',
    data () {
        return {
            password: "",
            passwordAgain:"",
            tokenCode:"",
            show: false,
            showAgain: false,
            loadingButtonX: false,
            loadingButtonTick:false,
            regIcon: "",
            passwordMsg: ""
        }
    },
    methods: {
        passwordAdd(){
            AuthRequest.addPassword({
                codeToken : this.tokenCode,
                password : this.password,
                passwordAgain : this.passwordAgain
            }).then((res)=>{
                this.passwordMsg = "Sikeres jelszó megadás!";
                this.loadingButtonTick = true;
                this.regIcon = "fas fa-check";
                setTimeout(() => (this.loadingButtonTick = false),
                                2000);
                this.password="Alma123";
                this.passwordAgain="Alma123";
            }).catch((err)=>{
                this.passwordMsg = "Sikertelen jelszó megadás!";
                this.regIcon = "fas fa-times";
                this.loadingButtonX= true;
                setTimeout(() => (this.loadingButtonX = false),
                                2000);
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
