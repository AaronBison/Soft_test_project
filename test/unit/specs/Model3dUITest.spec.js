import Model3dComponent from "@/components/Model3d"
import Vue from 'vue'
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"

Vue.use(Vuetify)

describe("User Interface", () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = options => {
    return mount(Model3dComponent, {
      localVue,
      vuetify,
      ...options,
    })
  }
  
  it('should initialize "Walking button" with disable', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.$data.walkingBottunDis).toBe(true)
    
  })
  
});

