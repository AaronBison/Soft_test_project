<template>
    <v-form  ref="form" class="mx-5 " lazy-validation>
        <v-flex>
            <v-text-field class="ml-5" type="name" name="name" v-model="name" label="Részleg neve" dense
                :rules="[ value =>!! value || 'A részleg név megadása kötelező!']"/>
        </v-flex>
        <v-flex>
            <v-text-field class="ml-5" type="text" name="link" v-model="link" label="A részleg részletes leírásához a link"
                :rules="[ value =>!! value || 'A link megadása kötelező!']"/>
        </v-flex>
        <v-card-actions class="justify-center"> 
            <v-btn color="#2B405D" outlined text class="mr-4" @click="validateData" >Hozzáadás</v-btn>
        </v-card-actions>
        <transition >
            <v-list-item v-if="loadingButtonX" >
                <v-list-item-icon>
                    <v-icon color="red" >{{ icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="red--text" >{{ departmentAddMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </transition>
            <transition >
                <v-list-item v-if="loadingButtonTick" >
                <v-list-item-icon>
                    <v-icon color="green" >{{ icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content >
                    <v-list-item-title class="green--text" >{{ departmentAddMsg }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </transition>
    </v-form>
</template>

<script>
import UserTasks from "@/services/userTasks";

export default {
    name: 'InformationDepartmentAdd',
    data () {
        return {
            name: "",
            link: "",
            loadingButtonX: false,
            loadingButtonTick:false,
            icon: "",
            departmentAddMsg: ""
        };
    },
    methods:{
        validateData(){
            if (this.$refs.form.validate()) {
                this.newDepartment();
            }
        },
        newDepartment()
        {
            UserTasks.addDepartment({
                departmentName : this.name,
                link: this.link
            }).then((res) =>{
                this.departmentAddMsg = "Az új részleg sikeresen hozzáadodott!";
                this.loadingButtonTick = true;
                this.icon = "fas fa-check";
                setTimeout(() => (this.loadingButtonTick = false),3000);
            }).catch((err)=>{
                console.log(err)
                this.departmentAddMsg = "Az új részleg hozzáadása nem sikerült!";
                this.icon = "fas fa-times";
                this.loadingButtonX = true;
                setTimeout(() => (this.loadingButtonX = false), 3000);
            });
        }
    },
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>