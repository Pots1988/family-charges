<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center">Категории</h1>
      
      <CategoryNew />
      <CategoryList />
    </div>
  </section>
</template>

<script>
  import CategoryNew from "@/components/Category/CategoryNew";
  import CategoryList from "@/components/Category/CategoryList";

  export default {
    name: "Categories",
    components: {
      CategoryNew,
      CategoryList
    }
  }
</script>