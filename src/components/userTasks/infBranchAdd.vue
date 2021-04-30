<template>
    <v-form  ref="form" class="mx-5 " lazy-validation>
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
        <v-combobox v-model="selectedItem" class="ml-5" dense :items="departments" 
                        label="Válaszd ki a tanszéket!" hide-selected persistent-hint small-chips
                        :rules="[ value =>!! value || 'Nincs kiválasztva elem!']"/>
        <v-card-actions class="justify-center"> 
            <v-btn color="#2B405D" outlined text class="mr-4" @click="validateData" >Hozzáadás</v-btn>
        </v-card-actions>
        <transition >
            <v-list-item v-if="loadingButtonX" >
                <v-list-item-icon>
                    <v-icon color="red" >{{ icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="red--text" >{{ branchAddMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </transition>
        <transition >
                <v-list-item v-if="loadingButtonTick" >
                <v-list-item-icon>
                    <v-icon color="green" >{{ icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="green--text" >{{ branchAddMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </transition>
    </v-form>
</template>

<script>
import UserTasks from "@/services/userTasks";

export default {
    name: 'InformationBranchAdd',
    data () {
        return {
            nameBranch: "",
            coordinatorName: "",
            coordinatorEmail:"",
            link: "",
            roomNumber:"",
            departments:[],
            loadingButtonX: false,
            loadingButtonTick:false,
            icon: "",
            branchAddMsg: "",
            selectedItem:null,
        };
    },
    methods:{
        getDepartments(){
            UserTasks.getDepartmentsDepartmentName().then((res) => {
                this.departments = res.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        validateData(){
            if (this.$refs.form.validate()) {
                this.newBranch();
            }
        },
        newBranch()
        {
            UserTasks.addBranch({
                branchName : this.nameBranch,
                coordinatorName : this.coordinatorName,
                coordinatorEmail : this.coordinatorEmail,
                roomNumber : this.roomNumber,
                link : this.link,
                departmentName: this.selectedItem
            }).then((res) =>{
                this.branchAddMsg = "Az új szak sikeresen hozzáadodott!";
                this.loadingButtonTick = true;
                this.icon = "fas fa-check";
                setTimeout(() => (this.loadingButtonTick = false),3000);
            }).catch((err)=>{
                console.log(err)
                this.branchAddMsg = "Az új szak hozzáadása nem sikerült!";
                this.icon = "fas fa-times";
                this.loadingButtonX = true;
                setTimeout(() => (this.loadingButtonX = false), 3000);
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