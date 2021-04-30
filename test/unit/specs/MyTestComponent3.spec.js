import MyComponent from '@/MyTestComponent3'
import { mount } from '@vue/test-utils'

jest.useFakeTimers()

describe('Lifecycle methods', () => {
  
  test('Mounted assigns an interval', () => {
    const wrapper = mount(MyComponent)

    expect(wrapper.vm.interval).toBeDefined()
  })

  test('Counter works', () => {

    const wrapper = mount(MyComponent)

    expect(wrapper.vm.counter).toBe(0)

    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.counter).toBe(1)

    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.counter).toBe(2)
  })

  test('Instance gets destroyed', () => {
    const beforeDestroyedSpy = jest.spyOn(MyComponent, 'beforeDestroy')
    const wrapper = mount(MyComponent)

    wrapper.vm.counter = wrapper.vm.timer - 1

    jest.advanceTimersByTime(1000)

    expect(beforeDestroyedSpy).toHaveBeenCalled()
  })

})
