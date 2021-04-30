<template>
    <v-container>
        <v-form ref="form" class="mx-5 my-3" lazy-validation>
                <v-combobox v-model="selectedItem" class="ml-5" dense :items="branches" 
                            label="Válaszd ki a szakot!" hide-selected persistent-hint small-chips></v-combobox>
                <v-card-actions class="justify-center">
                    <v-btn color="#2B405D" outlined text class="mr-4" @click="researchBranches">Szak keresése</v-btn>
                </v-card-actions>
        </v-form>
        <transition v-if="updBran">
            <v-form  ref="formUpd" class="mx-5 " lazy-validation>
                <v-flex>
                    <v-text-field class="ml-5" type="text" name="nameBranch" v-model="nameBranch" label="Szak neve" dense
                        :rules="[ value =>!! value || 'A részleg név megadása kötelező!']"/>
                </v-flex>
                <v-flex>
                    <v-text-field class="ml-5" type="text" name="coordinatorName" v-model="coordinatorName" label="Szakkoordinátor neve" dense
                        :rules="[ value =>!! value || 'A részleg név megadása kötelező!']"/>
                </v-flex>
                <v-flex>
                    <v-text-field class="ml-5" type="e-mail" name="coordinatorEmail" v-model="coordinatorEmail" label="Szakkoordinátor e-mail címe" dense
                        :rules="[ value =>!! value || 'E-mail cím megadása kötelező!', value => /.+@.+\..+/.test(value) || 'E-mail cím helytelen']"/>
                </v-flex>
                <v-flex>
                    <v-text-field class="ml-5" type="number" name="roomNumber" v-model="roomNumber" label="Terem szám"
                        :rules="[ value =>!! value || 'Teremszám megadása kötelező!']"/>
                </v-flex>
                <v-flex>
                    <v-text-field class="ml-5" type="text" name="link" v-model="link" label="A szak részletes leírásához a link"
                        :rules="[ value =>!! value || 'A link megadása kötelező!']"/>
                </v-flex>
                <v-card-actions class="justify-center"> 
                    <v-btn color="#2B405D" outlined text class="mr-4" @click="validateData" >Szerkesztés</v-btn>
                </v-card-actions>
            </v-form>
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
    name: 'InformationBranchUpdate',
    data () {
        return {
            branches:[],
            selectedItem:null,
            updBran:false,
            updRespFlase:false,
            updMsg:"",
            resp:false,
            nameBranch: "",
            coordinatorName: "",
            coordinatorEmail:"",
            link: "",
            id:null,
            roomNumber:"",
            loadingButtonX: false,
            loadingButtonTick:false,
        };
    },
    methods:{
        getBranches()
        {
            this.selectedItem = null;
            this.nameBranch = "";
            this.coordinatorName = "";
            this.coordinatorEmail = "";
            this.link = "";
            this.id = null;
            this.roomNumber = "";
            UserTasks.getBranchesName().then((res)=>{
                this.branches = res.data;
            }).catch((err)=>{
                this.branches = [];
            })
        },
        researchBranches(){
            if (this.selectedItem != null)
            {
                UserTasks.getBranchByName({
                    branchName : this.selectedItem
                }).then((res)=>{
                    this.nameBranch = res.data.branchName;
                    this.coordinatorName = res.data.coordinatorName;
                    this.coordinatorEmail = res.data.coordinatorEmail;
                    this.link = res.data.link;
                    this.roomNumber = res.data.roomNumber;
                    this.id = res.data.id;
                    this.updBran = true;
                    this.updRespFlase = false;
                }).catch((err)=>{
                    this.updMsg = "A kiválasztott elem nem létezik!";
                    this.updRespFlase = true;
                    this.updBran = false;
                    this.resp = false;
                })
            }
        },
        validateData(){
            if (this.$refs.formUpd.validate()) {
                this.updateBranch()
            }
        },
        updateBranch(){
            UserTasks.updateBranch({
                id : this.id,
                branchName : this.nameBranch,
                coordinatorName : this.coordinatorName,
                coordinatorEmail : this.coordinatorEmail,
                roomNumber : this.roomNumber,
                link : this.link
            }).then((res)=>{
                this.updMsg = "A szerkesztés sikeresen megtörtént!";
                this.selectedItem = null;
                this.updRespFlase = false;
                this.updBran = false;
                this.resp = true
                setTimeout(() =>(this.resp = false), 3000);
                this.getBranches();
            }).catch((err)=>{
                this.updMsg = "Nem sikerült a szerkesztés!";
                this.updRespFlase = true;
                this.updBran = true;
                this.resp = false;
                setTimeout(() =>(this.updRespFlase = false), 3000);
                this.getBranches();
            })
        }
        
    },
    mounted() {
        this.getBranches()
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>