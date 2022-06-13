<template>
  <div>
    <h1 class="mt-8 text-2xl font-bold uppercase">Tasks <span class="bg-green-300 border text-1xl rounded-md px-1">{{completeTasks.length}}</span></h1> 
    <div class="mt-3">
      <div>
        <div class="col-span-6 space-y-4 overflow-y-aut0 px-1" style="height: 500px">
          <div v-for="task in completeTasks" :task="task" :key="task.id" class="md:grid-cols-3 lg:grid-cols-4  hover:animate-pulse transition duration-700 ease-in-out p-8 cursor-pointer hover:bg-cyan-400 font-mono font-medium hover:font-bold bg-green-400 shadow-lg rounded-md flex items-center justify-between">
            <div>
              
              <div>{{task.title}}</div>
              <div class="text-orange-800">{{task.description}}</div>
              <div class="text-gray-800">{{task.date_added}}</div>
              <div class="text-red-600">{{task.deadline}}</div>
              <div class="text-green-700">{{task.date_completed}}</div>
            </div>
          

               <div class="space-x-2">
              <button @click="deleteTask(task)" class="px-2 font-bold text-red-600 text-2xl" title="Delete task"><i class="fa fa-trash"></i>
</button>
              <button v-if="!task.completed" @click="markComplete(task)" class="px-2 font-bold text-green-600 text-xl" title="Mark completed">&check;</button>
              <button v-else @click="markIncomplete(index)" class="px-2 font-bold text-green-600 text-xl" title="Mark incomplete"><i class="fa fa-undo"></i></button>
              <button class="px-2 font-bold text-amber-600 text-2xl" title="Edit task"><i style="font-size:22px" class="fa">&#xf044;</i></button>
              
            </div>
          </div>

          <div v-if="completeTasks.length === 0" class="animate-bounce my-10 px-6 py-14 bg-red-400 text-gray-600 shadow-lg rounded-md text-2xl font-bold">
            <marquee behavior="scroll" scrollamount="12" direction="right">NO TASKS FOR TODAY...!!</marquee>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = 'tasks';


  import { mapGetters, mapActions } from 'vuex'

  let id = 0

  export default {
    name: 'Incomplete',
  watch: {
    // tasks = 	localStorage.setItem('tasks', JSON.stringify(this.tasks))

  },
  data () {
    return {
      id: 0,

      task: {
          id: this.id += 1,
          title: '',
          description: '',
          completed: false,
          date_added: new Date().toDateString(),
          date_completed: ''
      },

      action: 'save'
    }
  },
    methods: {

      ...mapActions(['fetchTasks', 'completeTask', 'updateTask']),
      // onSubmit(e) {
      //       e.preventDefault();
      //       this.addTask(this.task);
      //   },
       

      markComplete(index) {
        this.completeTask[index].completed = true 
        alert('Task Completed')
      },

      markIncomplete(index) {
        this.tasks[index].completed = false 
        alert('Task Incomplete')
      },
   deleteTask(task) {
        if(!confirm('Are you sure..?')) {
          return
        }

        this.$store.dispatch("deleteTask", task);

        alert('Task Deleted Successfully..!!')
      }
    },

    computed: {
      ...mapGetters(['getTasks', 'completeTasks'])
    },

    created() {
    // this.fetchTasks()
},
  }
</script>