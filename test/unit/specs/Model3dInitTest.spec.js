import Model3dComponent from "@/components/Model3d"
import Vue from 'vue'
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"

Vue.use(Vuetify)

describe("Initialization", () => {
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

  it('should match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()

  });
  
  it('should verify if the mapping object is imported', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.$data.markers).toBeDefined()
  })
  
});

