<template>
    <v-container grid-list-md>
        <v-layout row wrap >
            <v-flex xs15 sm14 md13 lg12 xl11>
                <v-card id="card" elevation="10" >
                    <v-flex>
                        <v-card-title class="justify-center">
                            <a v-bind:href="card.link" target="_blank">{{ card.departmentName }}</a>
                            &nbsp;&nbsp;&nbsp;
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" icon @click="takeToThere">
                                        <v-icon>fas fa-map-marked-alt</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Vigyél el!</span>
                            </v-tooltip>
                        </v-card-title>
                    </v-flex>
                    <v-divider class="mx-12"></v-divider>
                    <v-flex>
                        <v-card-subtitle v-if="branches != null"> Alrészlegek </v-card-subtitle>
                    </v-flex>
                    <v-flex>
                        <BranchList v-for=" (branch, i) in branches" :key="i" :branch="branch"/>
                    </v-flex>
                    <v-divider v-if="branches != null" class="mx-12"></v-divider>
                    <v-flex>
                        <v-card-subtitle v-if="branches != null" > Egyebek </v-card-subtitle>
                    </v-flex>
                    <v-flex> 
                        <OtherBranchList v-for="(otherBranch, i) in othersBranch" :key="i" :otherBranch="otherBranch"/>
                    </v-flex>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BranchList from "./BranchesList"
import OtherBranchList from "./OthersBranchList"
import GeneralTasks from "@/services/generalTasks"

export default {
    name: 'DepartmentCard',
    components: {BranchList, OtherBranchList},
    props: ["card"],
    data () {
        return {
            branches:null,
            othersBranch:null
        };
    },
    methods: {
        getBranches()
        {
            GeneralTasks.getBranches(
                {
                    departmentName : this.card.departmentName
                }
            ).then((res)=>{
                if(res.data.length != 0)
                {
                    this.branches = res.data;
                }
                else
                {
                    this.othersBranch = [];
                }
            }).catch((err)=>{
                this.branches = null;
            });
        },
        getOtherBranches()
        {
            GeneralTasks.getOtherBranches(
                {
                    departmentName : this.card.departmentName
                }
            ).then((res)=>{
                if(res.data.length != 0)
                {
                    this.othersBranch = res.data;
                }
                else{
                    this.othersBranch = null;
                }
            }).catch((err)=>{
                this.othersBranch = null;
            });
        },
        takeToThere()
        {
            switch (this.card.departmentName){
				case "Matematika-Informatika Tanszék":
                    this.$router.push({ path: '/model3d', query: { road: 'mt' } })
                    break;
                case "Dékáni hivatal":
                    this.$router.push({ path: '/model3d', query: { road: 'dh' } })
                    break;
                case "Gazdasági Hivatal":
                    this.$router.push({ path: '/model3d', query: { road: 'dh' } })
                    break;
                case "Villamosmérnöki Tanszék":
                    this.$router.push({ path: '/model3d', query: { road: 'vt' } })
                    break;
                default:
					break;
            }
        }
    },
    mounted()
    {
        this.getBranches();
        this.getOtherBranches();
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>