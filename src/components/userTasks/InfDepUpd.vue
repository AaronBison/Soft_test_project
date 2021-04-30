<template>
    <v-container>
        <v-form ref="form" class="mx-5 my-3" lazy-validation>
            <v-combobox v-model="selectedItem" class="ml-5" dense :items="departments" 
                        label="Válaszd ki a részleget!" hide-selected persistent-hint small-chips></v-combobox>
            <v-card-actions class="justify-center">
                <v-btn color="#2B405D" outlined text class="mr-4" @click="researchDepartment">Részleg keresése</v-btn>
            </v-card-actions>
        </v-form>
        <transition>
            <v-layout  column center v-if="updDep">
                <v-flex>
                    <v-text-field class="ml-5" type="text" name="departmentName" v-model="departmentName" label="Részleg neve" dense
                        :rules="[ value =>!! value || 'A részleg név megadása kötelező!']"/>
                </v-flex>
                <v-flex>
                    <v-text-field class="ml-5" type="text" name="departmentLink" v-model="departmentLink" label="Részleg link" dense
                        :rules="[ value =>!! value || 'A részleg link megadása kötelező!']"/>
                </v-flex>
                <v-card-actions class="justify-center">
                    <v-btn color="#2B405D" outlined text class="mr-4" @click="updateDepartment" >Szerkesztés</v-btn>
                </v-card-actions>
            </v-layout>
        </transition>
        <transition>
            <v-list-item v-if="updRespFlase">
                <v-list-item-icon>
                    <v-icon color="red" class="fas fa-times"></v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="red--text" >{{ updMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </transition>
        <transition>
            <v-list-item v-if="resp" >
                <v-list-item-icon>
                    <v-icon color="green" class="fas fa-check"></v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="green--text" >{{ updMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </transition>
    </v-container>
</template>

<script>

import UserTasks from "@/services/userTasks";

export default {
    name: 'InformationDepartmentUpd',
    data () {
        return {
            selectedItem: null,
            departments: [],
            departmentName:null,
            departmentLink:null,
            id:null,
            updDep:false,
            updMsg:"",
            updRespFlase:false,
            resp:false
        };
    },
    methods:{
        getDepartments(){
            this.selectedItem = null;
            this.departments =  [];
            this.departmentName = null;
            this.departmentLink = null;
            UserTasks.getDepartmentsDepartmentName().then((res) => {
                this.departments = res.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        researchDepartment(){
            if (this.selectedItem != null)
            {
                UserTasks.getDepartment({ 
                    departmentName : this.selectedItem 
                }).then((res) => {
                    this.updDep = true;
                    this.updRespFlase = false;
                    this.id = res.data.id;
                    this.departmentName = res.data.departmentName;
                    this.departmentLink = res.data.link;
                }).catch((err) => {
                    this.updMsg = "A kiválasztott elem nem létezik!";
                    this.updRespFlase = true;
                    this.updDep = false;
                    this.resp = false;
                });
            }
        },
        updateDepartment()
        {
            UserTasks.updateDepartment(
                {
                    _id : this.id,
                    departmentName : this.departmentName,
                    link: this.departmentLink
                }       
            ).then((res) =>{
                this.selectedItem = null;
                this.updMsg = "A szerkesztés sikeresen megtörtént!";
                this.updRespFlase = false;
                this.updDep = false;
                this.resp = true
                setTimeout(() =>(this.resp = false), 3000);
                this.getDepartments()
            }).catch((err) => {
                this.updMsg = "Nem sikerült a szerkesztés!";
                this.updRespFlase = true;
                this.updDep = true;
                this.resp = false;
                setTimeout(() =>(this.updRespFlase = false), 3000);
                this.getDepartments()
            });
        }
    },
    mounted() {
        this.getDepartments();
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>