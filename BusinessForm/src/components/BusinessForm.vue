<template>
  <v-form
      class="px-3 py-3"
      id="BusinessForm"
      method="post"
      @submit="print_JSON"
  >

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
      <template v-slot:activator="{ props }">
        <v-text-field
            v-model="formattedDate"
            label="Birthdate"
            variant="underlined"
            append-icon="mdi-calendar"
            placeholder="YYYY-MM-DD"
            :readonly="true"
            v-bind="props"
            :clearable="true"
        ></v-text-field>
      </template>
      <v-date-picker v-model="user_data.birthdate"/>
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
          <v-select
              :items="countries"
              label="Country"
              variant="underlined"
              placeholder="Please Select One"
              v-model="user_data.country"
              :clearable="true"/>
        </v-col>
      </v-row>
    </v-container>

    <v-btn type="submit" class="float-right">Submit</v-btn>

  </v-form>
</template>

<script>
import moment from "moment";
export default {
  name: "BusinessForm",
  data() {
    return{
      // user credentials
      user_data:{
        firstname: null,
        lastname: null,
        birthdate: null,
        email: {
          type: null,
          value: null,
          primary: null // boolean
        },
        phone:{
          type: null,
          value: null, // +49 XXX XXX XXXX
          primary: null // boolean
        },
        street: null,
        zip: null,
        city: null,
        country: null // ISO 3166-1 Alpha 2
      },
      // available SELECT choices
      email_type: [
          "business",
          "private"
      ],
      phone_type: [
          "primary",
          "mobile",
          "business",
          "private"],
      countries:[
          'DE (Germany)',
          'BE (Belgium)',
          'GB (United Kingdom)',
          'FR (France)',
          'MY (Malaysia)'
      ],
      // helper data
      menu: false, // VMenu toggle
      formattedDate: moment().format("DD-MM-YYYY"),
      // front-end validation
      nameRules: [
          value => {
            if(!value) return 'required'
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
  methods: {
    print_JSON(e) {

      // reformat user credentials
      if(this.user_data.birthdate)
        this.user_data.birthdate = this.formattedDate

      if(this.user_data.country)
          this.user_data.country = this.user_data.country.slice(0,2)

      console.log(JSON.stringify(this.user_data))
      e.preventDefault()
    }
  },
  watch:{
    'user_data.birthdate'(newVal, oldVal){
      this.formattedDate = moment(newVal).format('YYYY-MM-DD')
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