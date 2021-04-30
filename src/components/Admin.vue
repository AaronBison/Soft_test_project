<template>
    <v-container class="justify-center" grid-list-md>
        <v-layout row wrap >
            <v-flex xs12 sm6 md6 lg6 xl6>
                <AddUsers/>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 xl6>
                <DeleteUsers/>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 xl6>
                <InformationDepartmentAddUpdate/>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 xl6>
                <InformationBranchAddUpdate/>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 xl6>
                <InformationOthersAddUpdate/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import AddUsers from "./userTasks/addUsers.vue";
import DeleteUsers from "./userTasks/deleteUser.vue"
import InformationDepartmentAddUpdate from "./userTasks/InfDepAddUpd.vue"
import InformationBranchAddUpdate from "./userTasks/infBranchAddUpd.vue"
import InformationOthersAddUpdate from "./userTasks/infOthersAddUpd.vue"
export default {
    name: 'Admin',
    components:{AddUsers, DeleteUsers,InformationDepartmentAddUpdate,InformationBranchAddUpdate,InformationOthersAddUpdate},
    data () {
        return {
            
        };
    }
}
</script>

<style>
    #card {
        background-color: #E1E1DE;
        color: #2B405D;
    }
</style>