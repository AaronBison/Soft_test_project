import MyComponent from '@/MyTestComponent2'

import { mount } from '@vue/test-utils'

test('Html_MatchesSnapshot_True', () => {  
  const wrapper = mount(MyComponent)

  expect(wrapper.html()).toMatchSnapshot()
})

test('Html_WithPassedPropToMatchesSnapshot_True', () => {  
  const wrapper = mount(MyComponent,{
    propsData: {
      value: "World!"
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})