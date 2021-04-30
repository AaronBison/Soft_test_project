<template>
    <v-container class="justify-center">
        <v-form ref="form" class="mx-5 " lazy-validation>
            <v-flex>
            <v-combobox v-model="selectedItem" class="ml-5" dense :items="departments" 
                            label="Válaszd ki a tanszéket!" hide-selected persistent-hint small-chips
                            :rules="[ value =>!! value || 'Nincs kiválasztva elem!']"/>
            </v-flex>
            <div v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
                <v-text-field class="mx-2" v-model="textField.value1" :label="textField.label1" 
                    :rules="[ value =>!! value || 'A mezőt kötelező kitölteni!']" outlined clearable></v-text-field>
                <v-btn icon @click="removeTextField(i)">
                    <v-icon> far fa-trash-alt </v-icon>
                </v-btn>
            </div>
            <div v-for="(textLink, j) in textLinks" :key="j+5" class="text-fields-row">
                <v-text-field class="mx-2" v-model="textLink.link1" :label="textLink.label1" 
                    :rules="[ value =>!! value || 'A mezőt kötelező kitölteni!']" outlined clearable></v-text-field>
                <v-btn icon @click="removeLinkField(j)">
                    <v-icon> far fa-trash-alt </v-icon>
                </v-btn>
            </div>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="addTextField" :disabled="showPlusBottum" v-bind="attrs" v-on="on">
                        <v-icon> far fa-keyboard </v-icon>
                    </v-btn>
                </template>
                <span>Szöveg doboz hozzáadás!</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="addLinkField" :disabled="showPlusBottum" v-bind="attrs" v-on="on">
                        <v-icon> fas fa-link </v-icon>
                    </v-btn>
                </template>
                <span>Esemény link hozzáadás!</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-card-actions class="justify-center"> 
                <v-btn color="#2B405D" outlined text class="mr-4" @click="validateData" >Hozzáadás</v-btn> 
            </v-card-actions>
            <transition >
                <v-list-item v-if="loadingButtonX" >
                    <v-list-item-icon>
                        <v-icon color="red" >{{ icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <v-list-item-title class="red--text" >{{ othersBranchAddMsg }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </transition>
                <transition >
                    <v-list-item v-if="loadingButtonTick" >
                    <v-list-item-icon>
                        <v-icon color="green" >{{ icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <v-list-item-title class="green--text" >{{ othersBranchAddMsg }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </transition>
        </v-form>
    </v-container>
</template>

<script>
import UserTasks from "@/services/userTasks";

export default {
    name: 'InformationOthersAdd',
    data () {
        return {
            textFields: [],
            textLinks: [],
            showPlusBottum: false,
            departments:[],
            selectedItem:null,
            loadingButtonX: false,
            loadingButtonTick:false,
            icon: "",
            othersBranchAddMsg: ""
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
        addTextField () {
            this.textFields.push({ 
                label1: "Elem elnevezése (pl. név, email stb.)", 
                value1: ""
            });
            if (this.textFields.length + this.textLinks.length == 5)
            {
                this.showPlusBottum = true;
            }
        },
        addLinkField () {
            this.textLinks.push({ 
                label1: "Elem elnevezése (pl. link, facebook, instagram stb.)", 
                link1: "",
            });
            if (this.textFields.length + this.textLinks.length == 5)
            {
                this.showPlusBottum = true;
            }
        },
        removeTextField (index) {
            this.textFields.splice(index, 1)
            this.showPlusBottum = false;
        },
        removeLinkField (index) {
            this.textLinks.splice(index, 1)
            this.showPlusBottum = false;
        },
        validateData(){
            if (this.$refs.form.validate()) {
                this.newOthers();
            }
        },
        newOthers()
        {
            var value = [];
            this.textFields.forEach(element => {
                value.push("t:" + element.value1)
            });
            this.textLinks.forEach(element => {
                value.push("l:" + element.link1)
            });
            if(value.length < 2)
            {
                this.othersBranchAddMsg = "Legalább két mezőt ki kell tölteni!";
                this.icon = "fas fa-times";
                this.loadingButtonX = true;
                setTimeout(() => (this.loadingButtonX = false), 3000);
            }
            else
            {
                if(value.length != 5)
                {
                    for (var i = value.length; i < 5 ; ++i)
                    {
                        value.push(null);
                    }
                }
                UserTasks.addOtherBranch({
                    value1:value[0],
                    value2:value[1],
                    value3:value[2],
                    value4:value[3],
                    value5:value[4],
                    departmentName: this.selectedItem
                    }).then((res) =>{
                        this.othersBranchAddMsg = "Hozzáadás sikeres volt!";
                        this.loadingButtonTick = true;
                        this.icon = "fas fa-check";
                        setTimeout(() => (this.loadingButtonTick = false),3000);
                    }).catch((err)=>{
                        this.othersBranchAddMsg = "Hozzáadás sikertelen volt!";
                        this.icon = "fas fa-times";
                        this.loadingButtonX = true;
                        setTimeout(() => (this.loadingButtonX = false), 3000);
                });
            }
        }
    },
    mounted() {
        this.getDepartments();
        this.addTextField();
    },
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
    .text-fields-row {
        display: flex;
    }
</style>