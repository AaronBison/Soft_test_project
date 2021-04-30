import Model3dComponent from "@/components/Model3d"
import Vue from 'vue'
import Vuetify from "vuetify"
import { createLocalVue, mount } from "@vue/test-utils"

Vue.use(Vuetify)

describe("Player movement", () => {
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

  it('should move the character to the left when action button "Step left" is triggered', () => {
    const wrapper = mountFunction()
    
    const button = wrapper.findAll('.v-btn').at(0)

     // Trigger 'Step left' button
    const beforeStep = wrapper.vm.$data.cameraPosition.x
    button.trigger('click')
    const afterStep = wrapper.vm.$data.cameraPosition.x

    expect(beforeStep).toBeLessThan(afterStep)
  })

  it('should move the character forward when action button "Step forward" is triggered', () => {
    const wrapper = mountFunction()
    const button = wrapper.findAll('.v-btn').at(1)

     // Trigger 'Step forward' button
     const beforeStep = wrapper.vm.$data.cameraPosition.z
     button.trigger('click')
     const afterStep = wrapper.vm.$data.cameraPosition.z

     expect(beforeStep).toBeLessThan(afterStep)
  })

  it('should move the character to the right when action button "Step right" is triggered', () => {
    const wrapper = mountFunction()
    const button = wrapper.findAll('.v-btn').at(2)

     // Trigger 'Step right' button
     const beforeStep = wrapper.vm.$data.cameraPosition.x
     button.trigger('click')
     const afterStep = wrapper.vm.$data.cameraPosition.x

     expect(afterStep).toBeLessThan(beforeStep)
  })


  it('should move the character backward when action button "Step backward" is triggered', () => {
    const wrapper = mountFunction()
    const button = wrapper.findAll('.v-btn').at(3)

     // Trigger 'Step backward' button
     const beforeStep = wrapper.vm.$data.cameraPosition.z
     button.trigger('click')
     const afterStep = wrapper.vm.$data.cameraPosition.z

     expect(afterStep).toBeLessThan(beforeStep)
  })  
});
