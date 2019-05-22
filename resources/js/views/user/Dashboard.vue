<template>
  <div id="dashboard">
    <h1 class="title is-1">
      Mon compte
    </h1>
    <p>Bienvenu {{ $auth.user().username }}</p>
  </div>
</template>

<script>
  export default {
    name: "Dashboard"
  };
</script>
