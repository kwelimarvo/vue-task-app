<template>
  <div>
    <h1 class="mt-8 text-2xl font-bold uppercase">Tasks <span class="bg-green-300 border text-1xl rounded-md px-1">{{getTasks.length}}</span></h1> 
    <div class="mt-3">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 space-y-4 overflow-y-aut0 px-1" style="height: 500px">
          <div v-for="task in getTasks" :key="task.id" class="transition duration-700 ease-in-out p-8 cursor-pointer hover:bg-sky-300 font-mono font-medium hover:font-bold bg-lime-300 shadow-lg rounded-md flex items-center justify-between">
            <div>
              <div>{{task.title}}</div>
              <div class="text-orange-800">{{task.description}}</div>
              <div class="text-gray-800">{{task.date_added}}</div>
              <div class="text-red-600">{{task.deadline}}</div>
              <div class="text-green-700">{{task.date_completed}}</div>
            </div>
          

               <div class="space-x-2">
              <button @click="deleteTask(task)" class="px-2 font-bold text-red-600 text-2xl" title="Delete task">x
</button>
              <button v-if="!task.completed" @click="toggleComplete(task)" class="px-2 font-bold text-green-600 text-xl" title="Mark completed">&check;</button>
              <button v-else @click="markIncomplete(index)" class="px-2 font-bold text-green-600 text-xl" title="Mark incomplete"><i class="fa fa-undo"></i></button>
              <button class="px-2 font-bold text-amber-600 text-2xl" title="Edit task"><i style="font-size:22px" class="fa">&#xf044;</i></button>
              
            </div>
          </div>

          <div v-if="getTasks.length === 0" class="px-6 py-14 bg-white text-gray-600 shadow-lg rounded-md text-sm font-bold">
            You have no tasks
          </div>

        </div>

        <div class="col-span-6">
          <div class="p-8 bg-amber-300 shadow-lg rounded">
            <form>
              <label>
                <h1 class="font-mono font-medium text-xl">Title:</h1>
                <input v-model="task.title" type="text" class="p-2 mt-4 border rounded w-full">
              </label>
              <label>
                <h1 class="mt-2 font-mono font-medium text-xl">Description:</h1>
                <input v-model="task.description" type="text" class="p-2 mt-4 border rounded w-full">
              </label>
              <!-- <label>
                <h1 class="mt-2 font-mono font-medium text-xl">Date Added:</h1>
                 <input v-model="task.date_added" type="text" class="p-2 mt-4 border rounded w-full">
               </label> -->
              <label>
                <h1 class="mt-2 font-mono font-medium text-xl">Deadline:</h1>
                <input v-model="task.deadline" type="date" class="p-2 mt-4 border rounded w-full">
              </label>

              <!-- <label>              
              <h1 class="mt-2 font-mono font-medium text-xl">Date Completed:</h1>
                <input v-model="task.date_completed" type="text" class="p-2 mt-4 border rounded w-full">
              </label> -->

              <button type="submit" @click.prevent="createTask" class="animate-bounce bg-green-600 mt-4 p-2 rounded-md font-medium hover:bg-sky-400 hover:text-white">Add Task </button>
            </form>
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
    name: 'HomeView',
  watch: {
    // tasks = 	localStorage.setItem('tasks', JSON.stringify(this.tasks))

  },
  data () {
    return {
      id: 0,

      task: {
          // id: this.id += 1,
          title: '',
          description: '',
          completed: false,
          date_added: new Date().toLocaleDateString(),
          // date_completed: ''
      },

      action: 'save'
    }
  },
  methods: {
    createTask() {
        // console.log(`here: ${this.getTasks[this.getTasks.length -1].id}`)
        this.task.id = parseInt(this.getTasks[this.getTasks.length -1].id)+1

      this.addTask(this.task).then(() => this.task={
        title: '',
          description: '',
          completed: false,
          date_added: new Date().toLocaleDateString(),
      })
    },

    ...mapActions(['addTask', 'fetchTasks', 'completeTask', 'toggleDone','update']),
       

      toggleComplete(task) {
         task.completed=true;
        console.log('Here is the task', task)


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
      ...mapGetters(['getTasks'])
    },

    created() {
    this.fetchTasks()
},
  }
</script>