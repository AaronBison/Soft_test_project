import MyComponent from '@/MyTestComponent1'

import { mount } from '@vue/test-utils'

test('Html_MatchesSnapshot_True', () => {  
  const wrapper = mount(MyComponent)

  expect(wrapper.html()).toMatchSnapshot()
})

test('hasMovie_ContainsItem_True', () => {  
  const wrapper = mount(MyComponent)

  const containsItem = wrapper.vm.hasMovie('Avengers')
  expect(containsItem).toBe(true)
})

test('hasMovie_ContainsItem_False', () => {  
  const wrapper = mount(MyComponent)

  const containsItem = wrapper.vm.hasMovie('Avangers')
  expect(containsItem).toBe(false)
})

test('setData_MatchesSnapshot_True', async () =>{
  const wrapper = mount(MyComponent)

  const movies = wrapper.vm.marvelMovies
  await wrapper.setData({ marvelMovies: [ ...movies, 'Endgame' ]})

  expect(wrapper.html()).toMatchSnapshot()
})

