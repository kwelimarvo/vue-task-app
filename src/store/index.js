import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    tasks: [
    
    
    ],/*set to empty array now since new tasks created are saved to local storage*/
    
  },
  mutations: {
    setTasks: (state, tasks) => (state.tasks = tasks),

    addTask: (state, task) => state.tasks.push(task),

    COMPLETE_TASK(state, task){
      task.completed = !task.completed
    },



    // initialiseVars(state) {
      // if (localStorage.getItem('tasks')) {
          // state.tasks = JSON.parse(localStorage.tasks)
      // }
  // },
 
    deleteTask(state,payload){
      console. log('here')
      state.tasks = state.tasks.filter(task => task.id != payload.id)
    },
    updateTask(state,payload){
      let b = state.tasks.findIndex(task => task.id == payload.id)
      state.tasks.splice(b, 1, payload)

      console.log('here')
    }
  },
  actions: {
    // automatically get 'payload' param
    addTask(context, task) {
      // forward payload to 'dispatch' method
      console.log(task)
      context.commit('addTask', task)
    },

    // async fetchTasks({ commit }) {
    //   const response = await axios.get('https://tychak.github.io/')
    //   commit('setTasks', response.data)
    //   console.log(response.data)
    // }
    async fetchTasks({ commit }) {
      const response = await axios.get('https://tychak.github.io/');
      commit('setTasks', response.data);
  },
  
  completeTask({commit}, task){
    commit('COMPLETE_TASK', task)
   },
    
  },
  getters:{
    // getTasks: state=>state.tasks,
    getTasks: state  => state.tasks,
   incompleteTasks: state => state.tasks.filter((element) => {  
    return !element.completed;
   })
  },
})