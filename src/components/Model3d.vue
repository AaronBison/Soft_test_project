<template>
  <v-container class="justify-center" grid-list-md>
    <v-layout row wrap>
      <!-- OBJ -->
      <!-- <model-obj
          :rotation="rotation"
          @on-load="onLoad"
          :lights="vilagitas"
          src="static/models/lowpoly_well.obj"
          mtl="static/models/lowpoly_well.mtl"
        ></model-obj> -->

      <!-- DAE -->
      <!-- <model-collada
          :rotation="rotation"
          @on-load="onLoad"
          :lights="vilagitas"
          src="static/models/lowpoly_well.dae"
        ></model-collada>-->

      <!-- FBX -->
      <!-- <model-fbx
          :rotation="rotation"
          @on-load="onLoad"
          src="static/models/lowpoly_well.fbx"
          mtl="static/models/lowpoly_well.mtl"
        ></model-fbx>-->

      <!-- STL -->
      <!-- <model-stl
          :rotation="rotation"
          @on-load="onLoad"
          src="static/models/lowpoly_well.stl"
          mtl="static/models/lowpoly_well.mtl"
        ></model-stl>-->

      <!-- PLY -->
      <!-- <model-ply
          :rotation="rotation"
          @on-load="onLoad"
          src="static/models/lowpoly_well.ply"
          mtl="static/models/lowpoly_well.mtl"
        ></model-ply>-->
      <v-flex>
        <v-select
          class="my-2"
          v-model="selectElement"
          :items="items"
          backgroundColor="#E1E1DE"
          item-text="place"
          item-value="id"
          label="Válaszd ki hová szeretnél menni!"
          @input="walkingSetUp"
          dense
          solo
        ></v-select>
      </v-flex>
      <v-flex >
        <div class="my-2">
        <v-btn class="mx-2" fab dark small color="grey" @click="stepedLeft">
          <v-icon dark> far fa-arrow-alt-circle-left </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="grey" @click="stepedUp">
          <v-icon dark> far fa-arrow-alt-circle-up </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="grey" @click="stepedRight">
          <v-icon dark> far fa-arrow-alt-circle-right </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark small color="grey" @click="stepedDown">
          <v-icon dark> far fa-arrow-alt-circle-down </v-icon>
        </v-btn>
        <v-btn
          v-if="walkingBottunDis == false"
          class="mx-2"
          fab
          dark
          small
          color="grey"
          @click="walkingWithAnimation"
        >
          <v-icon dark> fas fa-walking </v-icon>
        </v-btn>
        <v-btn
          v-if="walkingBottunDis"
          class="mx-2"
          disabled
          fab
          dark
          small
          color="grey"
        >
          <v-icon dark> fas fa-walking </v-icon>
        </v-btn>
        </div>
      </v-flex>
      <v-flex xs18 sm16 md14 lg12 xl12>
          <model-gltf
            :lights="vilagitas"
            @on-click="logCoordinates"
            :backgroundColor="backgroundcolor"
            :position="cameraPosition"
            :cameraPosition="angle"
            src="static/models/sapi3D.gltf?"
          >
          </model-gltf>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { ModelObj } from "vue-3d-model";
// import { ModelCollada } from "vue-3d-model";
// import { ModelFbx } from "vue-3d-model";
// import { ModelStl } from "vue-3d-model";
// import { ModelPly } from "vue-3d-model";
import mapping from '../../static/maps/mapping.json'
import { ModelGltf } from "vue-3d-model";
// import { OrbitControls } from "three-orbitcontrols"
// import { MglMap, MglGeolocateControl, MglNavigationControl, MglPopup, MglMarker  } from "vue-mapbox/dist/vue-mapbox.umd.js";

export default {
  name: "Model3D",
  components: {
    // ModelObj,
    // ModelCollada,
    // ModelFbx,
    // ModelStl,
    // ModelPly,
    ModelGltf,
    // OrbitControls
    // MglMap,
    // MglGeolocateControl,
    // MglNavigationControl,
    // MglPopup,
    // MglMarker
  },
  data() {
    return {
      enableZoom: false,
      fab: false,
      firstRoadInd: 0,
      walkingBottunDis: true,
      items: [
        { place: "Aula", id: "al" },
        { place: "Gépészmérnöki tanszék", id: "gt" },
        { place: "Gépészmérnöki labor", id: "gl" },
        { place: "Dékáni hivatal", id: "dh" },
        { place: "Villamosmérnöki tanszék", id: "vt" },
        { place: "Matematika-informatika tanszék", id: "mt" },
      ],
      selectElement: { place: "", id: "" },
      // rotation: {
      //   x: 0,
      //   y: 0,
      //   z: 0,
      // },
      backgroundcolor: "rgb(225, 225, 222)",
      vilagitas: [
        // x - jobbról
        // y - felülről
        // z - hátulról
        {
          // Álltalános fényerő az egész mezőn
          type: "HemisphereLight",
          position: { x: 0, y: 1, z: 0 },
          skyColor: 0xffd7b8,
          groundColor: 0x000000,
          intensity: 0,
        },
        {
          // Direkcionális fény, különböző irányokból
          type: "DirectionalLight",
          position: { x: -1, y: 2, z: -1 },
          color: 0xffd7b8,
          intensity: 2,
        },
        {
          // Direkcionális fény, különböző irányokból
          type: "DirectionalLight",
          position: { x: 1, y: 2, z: -1 },
          color: 0xffd7b8,
          intensity: 2,
        },
        {
          // Direkcionális fény, különböző irányokból
          type: "DirectionalLight",
          position: { x: 0, y: 1, z: 1 },
          color: 0xfffcf2,
          intensity: 2,
        },
      ],
      cameraPosition: { x: 0, y: 0, z: -60 },
      angle: { x: 0, y: 0, z: 0.1 },
      speed: 10,
      stepScale: 0.25,
      road: [],
      roadInd: 0,
      markers: mapping.markers,
    };
  },
  methods: {
    stepedLeft() {
      // ballra
      this.cameraPosition.x += 1;
    },
    stepedUp() {
      // előre
      this.cameraPosition.z += 1;
    },
    stepedRight() {
      // jobbra
      this.cameraPosition.x -= 1;
    },
    stepedDown() {
      // vissza
      this.cameraPosition.z -= 1;
    },
    roadUpload(array) {
      this.markers.forEach((element) => {
        array.forEach((element1) => {
          if (element.name == element1.el) {
            this.road.push(element);
          }
        });
      });
    },
    // Az uticel kivalasztasakor inicializalja az utvonalat
    walkingSetUp() {
      this.roadInd = 0;

      switch (this.selectElement) {
        case "al":
          this.walkingBottunDis = false;
          this.road = [];
          this.roadUpload(mapping.aula);
          break;
        case "gt":
          this.walkingBottunDis = false;
          this.road = [];
          this.roadUpload(mapping.geptan);
          break;
        case "gl":
          this.walkingBottunDis = false;
          this.road = [];
          this.roadUpload(mapping.geplab);
          break;
        case "dh":
          this.walkingBottunDis = false;
          this.road = [];
          this.roadUpload(mapping.dekhiv);
          break;
        case "vt":
          this.walkingBottunDis = false;
          this.road = [];
          this.roadUpload(mapping.viltan);
          break;
        case "mt":
          this.walkingBottunDis = false;
          this.road = [];
          this.roadUpload(mapping.mattan);
          break;
        default:
          this.walkingBottunDis = true;
          this.road = [];
          break;
      }

      this.cameraPosition.x = this.road[this.roadInd].coordinates.x;
      this.cameraPosition.y = this.road[this.roadInd].coordinates.y;
      this.cameraPosition.z = this.road[this.roadInd].coordinates.z;
    },

    // Megnezi, hogy novelnie vagy csokkentenie kell a koordinatat, hogy kozeledjen a celhoz
    stepCloser(start, destination) {
      if (start == destination) {
        return start;
      } else {
        if (start < destination) {
          return (start += this.stepScale);
        } else {
          return (start -= this.stepScale);
        }
      }
    },


    // Atvezeto animacio a megadott ponthoz
    async animation(destination) {
      // Disable-eli a gombot mig az animacio folyik, bugmegelozes celjabol
      this.walkingBottunDis = true;
      // Addig kozeledik a koordinatakhoz, amig a kezdopont es a cel meg nem egyezik
      while (
        Object.entries(this.cameraPosition).toString() !==
        Object.entries(destination).toString()
      ) {
        this.cameraPosition.x = this.stepCloser(
          this.cameraPosition.x,
          destination.x
        );
        this.cameraPosition.y = this.stepCloser(
          this.cameraPosition.y,
          destination.y
        );
        this.cameraPosition.z = this.stepCloser(
          this.cameraPosition.z,
          destination.z
        );
        await new Promise((r) => setTimeout(r, this.speed));
      }
      this.walkingBottunDis = false;
    },

    async walkingWithAnimation() {
      if (this.roadInd < this.road.length - 1) {
        await this.animation(this.road[this.roadInd + 1].coordinates)
        this.roadInd++

        // Ha koztes pont, akkor menjen mig checkpointot kap
        while(!this.road[this.roadInd].isCheckpoint){
          await this.animation(this.road[this.roadInd + 1].coordinates)
          this.roadInd++;
        }
      } else {
        this.roadInd = 0;
        this.cameraPosition.x = this.road[this.roadInd].coordinates.x;
        this.cameraPosition.y = this.road[this.roadInd].coordinates.y;
        this.cameraPosition.z = this.road[this.roadInd].coordinates.z;
      }
    },

    walkingWithWarping() {
      if (this.roadInd < this.road.length) {
        // Lepteti a road tombon, amig el nem er a vegere.
        this.cameraPosition.x = this.road[this.roadInd].coordinates.x;
        this.cameraPosition.y = this.road[this.roadInd].coordinates.y;
        this.cameraPosition.z = this.road[this.roadInd].coordinates.z;
        this.roadInd++;
      } else {
        // Visszateszi az elso pozicioba s kezdodik elolrol
        this.roadInd = 0;
        this.cameraPosition.x = this.road[this.roadInd].coordinates.x;
        this.cameraPosition.y = this.road[this.roadInd].coordinates.y;
        this.cameraPosition.z = this.road[this.roadInd].coordinates.z;
        this.roadInd++;
      }
    },
    logCoordinates(cord) {
      console.log(cord.point);
    },
  },
};
</script>