<template>
  <div class="outer">
    <div class="modal-content main">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
      </div>
      <br /><br />
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
            <br /><br />
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
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Edit-Component",
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
  async mounted() {
    axios
      .get("http://localhost:3000/users/" + this.$route.params.id)
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push({ name: "UsersList" });
      });
  },
  methods: {
    async save() {
      if (
        !this.user.name ||
        !this.user.surname ||
        !this.user.email ||
        !this.user.phoneNumber
      ) {
        return;
      }
      let result = await axios.put(
        "http://localhost:3000/users/" + this.$route.params.id,
        {
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          activate: this.user.activate,
        }
      );
      if (result.status == 200) {
        this.$router.push({ name: "UsersList" });
      }
    },
  },
};
</script>
<style>
.outer {
  /* margin-left: 12% !important;
  width: 89%; */
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.main {
  width: 70%;
  padding: 50px;
  padding-bottom: 200px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
