<template>
    <v-card id="card">
        <v-card-title> Felhasználó törlése </v-card-title>
        <v-divider class="mx-5 my-3"></v-divider>
        <v-form ref="form" class="mx-5 my-3" lazy-validation>
            <v-combobox v-model="selectedItem" class="ml-5" dense :items="members"
                        label="Válaszd ki a törlendő Felhasználót!" hide-selected persistent-hint small-chips></v-combobox>
            <v-card-actions class="justify-center">
                <v-btn color="#2B405D" outlined text class="mr-4" @click="researchUser" >Felhasználó keresése</v-btn>
            </v-card-actions>
        </v-form>
        <transition >
            <v-layout  column center v-if="deletMem">
                <v-list-item>
                    <v-list-item>Név</v-list-item>
                    <v-list-item>{{ name }}</v-list-item>
                </v-list-item>
                <v-divider class="mx-5"/>
                <v-list-item>
                    <v-list-item>E-mail cím</v-list-item>
                    <v-list-item>{{ emailAddress }}</v-list-item>
                </v-list-item>
                <v-divider class="mx-5"/>
                <v-list-item>
                    <v-list-item>Telefonszám</v-list-item>
                    <v-list-item>{{ phoneNumber }}</v-list-item>
                </v-list-item>
                <v-card-actions class="justify-center">
                    <v-btn color="#2B405D" outlined text class="mr-4" @click="deleteUser" >Törlés</v-btn>
                </v-card-actions>
            </v-layout>
        </transition>
        <transition >
            <v-list-item v-if="deletResp" >
                <v-list-item-icon>
                    <v-icon color="red" class="fas fa-times"></v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="red--text" >{{ deletMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </transition>
        <transition >
            <v-list-item v-if="resp" >
                <v-list-item-icon>
                    <v-icon color="green" class="fas fa-check"></v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="green--text" >{{ deletMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </transition>
    </v-card>
</template>

<script>
import UserTasks from "@/services/userTasks";

export default {
    name: 'DeleteUser',
    data () {
        return {
            selectedItem:null,
            members:[],
            deletMem:false,
            deletMsg:"",
            deletResp:false,
            resp:false,
            userId:null,
            name: "",
            phoneNumber:"",
            emailAddress:""
        };
    },
    methods:{
        getUsersEmail(){
            UserTasks.getUsersEmail().then((res) => {
                this.members = res.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        researchUser(){
            if (this.selectedItem != null)
            {
                UserTasks.getUserEmail({ 
                    emailAddress :this.selectedItem 
                }).then((res) => {
                    this.deletMem = true;
                    this.deletResp = false;
                    this.name = res.data.username;
                    this.phoneNumber = res.data.phoneNumber;
                    this.emailAddress = res.data.emailAddress;
                    this.userId = res.data._id;
                    const userid = localStorage.getItem("userid");
                    if (this.userId == userid)
                    {
                        this.selectedItem = null;
                        this.deletMsg = "A saját felhasználót nem lehet törölni!";
                        this.deletResp = true;
                        this.deletMem = false;
                        this.resp = false;
                    }
                }).catch((err) => {
                    this.deletMsg = "A kiválasztás nem történt meg!";
                    this.deletResp = true;
                    this.deletMem = false;
                    this.resp = false;
                });
            }
        },
        deleteUser(){
            UserTasks.deleteUserEmail(
                {emailAddress : this.emailAddress}
            ).then((res) =>{
                this.selectedItem = null;
                this.deletMsg = "A törlés sikeresen megtörtént!";
                this.resp = true;
                this.deletResp = false;
                this.deletMem = false;
            }).catch((err) => {
                this.deletMsg = "Nem sikerült a törlés!";
                this.deletResp = true;
                this.deletMem = true;
                this.resp = false;
                console.log(err)
            });
        }
    },
    mounted() {
        this.getUsersEmail();
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>