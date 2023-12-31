<template>
  <v-form id="BusinessForm" method="post">
    <v-text-field label="Firstname"></v-text-field>
    <v-text-field label="Lastname"></v-text-field>

    <v-menu>
      <v-text-field slot="activator" label="Birthdate"></v-text-field>
      <v-date-picker></v-date-picker>
    </v-menu>

    <v-text-field label="Email" placeholder="example@trashmail.com" type="email"></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "BuisnessForm"
}
</script>

<style scoped>

</style>