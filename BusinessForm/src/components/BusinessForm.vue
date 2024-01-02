<template>
  <v-form class="px-3 py-3" id="BusinessForm" @submit="print_JSON" method="post">

    <v-container class="grid_container">
      <v-row>
        <v-col>
          <v-text-field
              label="Firstname"
              variant="underlined"
              :rules="nameRules"
              v-model="user_data.firstname"/>
        </v-col>
        <v-col>
          <v-text-field
              label="Lastname"
              variant="underlined"
              :rules="nameRules"
              v-model="user_data.lastname"/>
        </v-col>
      </v-row>
    </v-container>

    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
    >
      <template v-slot:activator="{on, attrs}">
        <v-text-field
            v-model="user_data.birthdate"
            label="Birthdate"
            append-icon="mdi-calendar"
            variant="underlined"
            :readonly="true"
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="user_data.birthdate"
          @input="menu = false"
      ></v-date-picker>
    </v-menu>

    <v-text-field
        label="Email"
        :rules="emailRules"
        placeholder="example@trashmail.com"
        variant="underlined"
        type="email"
        hint="Please Enter A Valid Email"
        v-model="user_data.email.value"/>

    <v-container class="grid_container">
      <v-row>
        <v-col>
          <v-select
              :items="email_type"
              label="Type"
              variant="underlined"
              placeholder="Please Select One"
              v-model="user_data.email.type"
              :clearable="true"/>
        </v-col>
        <v-col>
          <v-radio-group class="radio" label="Primary" v-model="user_data.email.primary" :inline="true">
            <v-radio
                label="Yes"
                :value="true"/>
            <v-radio
                label="No"
                :value="false"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>

    <v-text-field
        label="Phone"
        placeholder="+49 XXX XXX XXXXX"
        :rules="phoneRules"
        variant="underlined"
        hint="Please Follow The Format"
        v-model="user_data.phone.value"/>

    <v-container class="grid_container">
      <v-row>
        <v-col>
          <v-select
              :items="phone_type"
              label="Type"
              variant="underlined"
              placeholder="Please Select One"
              v-model="user_data.phone.type"
              :clearable="true"/>
        </v-col>
        <v-col>
          <v-radio-group class="radio" label="Primary" v-model="user_data.phone.primary" :inline="true">
            <v-radio
                label="Yes"
                :value="true"/>
            <v-radio
                label="No"
                :value="false"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="grid_container">
      <v-row>
        <v-col>
          <v-text-field
              label="Street"
              variant="underlined"
              placeholder="Street, No."
              v-model="user_data.street"/>
        </v-col>
        <v-col>
          <v-text-field
              label="ZIP"
              variant="underlined"
              :rules="zipRules"
              placeholder="52XXX"
              v-model="user_data.zip"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              label="City"
              variant="underlined"
              placeholder="e.g Aachen"
              v-model="user_data.city"/>
        </v-col>
        <v-col>
          <v-text-field
              label="Country"
              variant="underlined"
              placeholder="e.g Germany"
              v-model="user_data.country"/>
        </v-col>
      </v-row>
    </v-container>

    <v-btn type="submit" class="float-right">Submit</v-btn>

  </v-form>
</template>

<script>
export default {
  name: "BusinessForm",
  data() {
    return{
      // user input data (v-models)
      user_data:{
        firstname: null,
        lastname: null,
        birthdate: null,
        menu: false,
        email: {
          type: null,
          value: null,
          primary: null // boolean
        },
        phone:{
          type: null,
          value: null, // international format
          primary: null // boolean
        },
        street: null,
        zip: null,
        city: null,
        country: null
      },
      // available choices
      email_type: ["business","private"],
      phone_type: ["primary", "mobile", "business", "private"],
      // menu visibility
      menu: false,
      // front-end validation
      nameRules: [
          value => {
            if(value === '') return 'required'
            if(/\w+[^0-9]/.test(value)) return true
            return 'only characters allowed (a-z)'
          }
      ],
      emailRules:[
          value => {
            if(/^\w+@\w+.\w{2,3}$/.test(value)) return true
            return "use this format: e.g example@trash.com"
          }
      ],
      phoneRules:[
         value => {
            if(/^\+\d{2}\s\d{3}\s\d{3}\s\d{4}/.test(value)) return true
            return "use this format: +49 XXX XXX XXXX"
         }
      ],
      zipRules:[
          value => {
            if(/\d{5}/g.test(value)) return true
            return "use this format: e.g 52XXX"
          }
      ]
    }
  },
  methods:{
    print_JSON(e){
      console.log(JSON.stringify(this.user_data))
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
  .grid_container{
    padding: 0;
  }
  .radio{
    padding: 0;
    font-size: .8rem;
    height: 2rem;
  }
</style>