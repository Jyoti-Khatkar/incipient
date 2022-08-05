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
    <tbody v-if="list.length > 0">
      <tr>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    </tbody>
  </table>
  <div v-if="list.length <= 0" class="jumbotron">
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
          <button type="button" class="btn btn-primary" @click="save">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        activate: "",
      },

      list: [],
    };
  },
  methods: {
    create() {},
    async save() {
      let result = await axios.post("http://localhost:3000/users", {
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        activate: this.user.activate,
      });
      console.log(result);
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
