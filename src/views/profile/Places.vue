<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center">Места</h1>
      
      <PlaceNew />
      <PlacesList />
    </div>
  </section>
</template>

<script>
  import PlaceNew from "@/components/Places/PlaceNew";
  import PlacesList from "@/components/Places/PlaceList";

  export default {
    name: "Places",
    components: {
      PlaceNew,
      PlacesList
    }
  }
</script>