<template>
  <div class="top mr-5 ml-5 mb-3">
    <div>User</div>
    <div>
      <button
        @click="create()"
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Create User
      </button>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
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
          <button type="button" class="btn btn-primary">Edit</button> &nbsp;
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
                type="text"
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
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
</template>

<script>
import axios from "axios";
import userData from "../../db.json";
export default {
  name: "App",
  components: {},
  computed: {
    isAll: function () {
      if (
        !this.user.name ||
        !this.user.surname ||
        !this.user.email ||
        !this.user.phoneNumber ||
        !this.user.activate
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
        activate: "",
      },

      userList: [],
    };
  },
  mounted() {
    this.userList = userData.users;
  },
  methods: {
    async deleteUser(id) {
      console.log(id, "eeeeeeeeeeeee");
      let result = await axios.delete("http://localhost:3000/users/" + id);
      console.log(result);
    },
    async save() {
      if (
        !this.user.name ||
        !this.user.surname ||
        !this.user.email ||
        !this.user.phoneNumber ||
        !this.user.activate
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
      console.log(result);
      if (result.status == 201) {
        this.user = {
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          activate: "",
        };
      }
    },
  },
};
</script>

<style>
.top {
  display: flex;
  justify-content: space-between;
}
</style>
