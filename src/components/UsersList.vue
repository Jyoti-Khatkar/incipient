<template>
  <div class="outer">
    <div class="main">
      <div class="top mr-5 ml-5 mb-3">
        <div>User</div>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Create User
          </button>
        </div>
      </div>
      <table class="table setwidth">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">SurName</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Activate</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="userList.length > 0">
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.activate }}</td>
            <td>
              <button class="btn btn-primary" type="button">
                <router-link style="color: white" :to="'/edit/' + user.id"
                  >Edit
                </router-link>
              </button>

              &nbsp;
              <button
                @click="deleteUser(user.id)"
                type="button"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="userList.length <= 0" class="jumbotron">
        <h1 class="display-6">No items</h1>
      </div>

      <!-- Button trigger modal -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create User</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div style="text-align: left" class="modal-body">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.name"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Surname</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.surname"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Surname"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Phone Number</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.phoneNumber"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="user.activate"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Activate
                  </label>
                </div>
              </form>
            </div>
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li role="alert" class="alert alert-danger" v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </p>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
              :disabled="isAll"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                @click="save"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  props: {
    isOpen: Boolean,
  },
  components: {},
  computed: {
    isAll: function () {
      if (
        !this.user.name ||
        !this.user.surname ||
        !this.user.email ||
        !this.user.phoneNumber
      ) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        activate: false,
      },
      errors:[],

      userList: [],
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    checkForm: function () {
      this.errors = [];

      if (this.isAll) {
        this.errors.push("All fields are required.");
      }
      /* eslint-disable */
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)
      ) {
        this.errors.push("Please enter valid email");
      }
    },
    async deleteUser(id) {
      console.log(id, "eeeeeeeeeeeee");
      let result = await axios.delete("http://localhost:3000/users/" + id);
      console.log(result);
      this.getUser();
    },
    async getUser() {
      let result = await axios.get("http://localhost:3000/users");
      if (result.status == 200) {
        this.userList = result.data;
      }
    },
    async save() {
      /* eslint-disable */
      this.checkForm(); //eslint-disable-line
      if(this.errors.length==0){
        $('#exampleModal').modal({ show: false});
      }
      if (
        !this.user.name ||
        !this.user.surname ||
        !this.user.email ||
        !this.user.phoneNumber
      ) {
        return;
      }
      let result = await axios.post("http://localhost:3000/users", {
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        activate: this.user.activate,
      });
      
      if (result.status == 201) {
        this.user = {
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          activate: false,
        };
      }
      this.getUser();
    },
  },
};
</script>

<style>
.top {
  display: flex;
  justify-content: space-between;
}
.outer {
  /* margin-left: 12% !important;
  width: 89%; */
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.main {
  width: 70%;
  padding: 20px;
  padding-bottom: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
