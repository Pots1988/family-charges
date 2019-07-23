<template>
  <section class="sect">
    <div class="container">
      <h1 class="h2 text-center">Редактирование категории</h1>

      <template v-if="currentCategory">
        <ItemsNew 
          :title="title"
          :load="loadUpdateTitle"
          :items="categories"
          @add-item="updateItem"
          @change-title="title = $event"
        >
          <template v-slot:label>Категория</template>
          <template v-slot:button>Изменить</template>
        </ItemsNew>

        <ItemsNew
          :title="titleSubcategory"
          :load="loadUpdateSubcategory"
          :items="subCategories ? subCategories : []"
          @add-item="addCategoryItem"
          @change-title="titleSubcategory = $event"
        >
          <template v-slot:label>Подкатегория</template>
          <template v-slot:button>Добавить</template>
        </ItemsNew>

        <SubCategoriesList :idCategory="id" />
      </template>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import ItemsNew from "@/components/Items/ItemsNew";
  import SubCategoriesList from "@/components/Category/SubCategoriesList";

  export default {
    name: `CategoryEdit`,
    components: {
      ItemsNew,
      SubCategoriesList
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        loadUpdateTitle: false,
        title: this.currentCategory,
        titleSubcategory: ``,
        loadUpdateSubcategory: false,
      }
    },
    computed: {
      ...mapGetters(`categories`, [`categories`, `subCategories`]),
      currentCategory() {
        if (this.categories) {
          let cat = this.categories.find(category => category.id == this.id);
          this.title = cat.title;
          return cat;
        }

        return null
      }
    },
    beforeDestroy() {
      this.clearLocalSubcategories();
    },
    methods: {
      ...mapActions(`categories`, [`updateCategory`, `addSubCategory`]),
      ...mapMutations(`categories`, [`setSubcategories`, `clearLocalSubcategories`]),
      ...mapMutations([`addMessage`]),
      updateItem() {
        this.loadUpdateTitle = true;
        this.updateCategory({
            title: this.title.toLowerCase(),
            id: this.id
          })
          .then(() => {
            this.loadUpdateTitle = false;
          })
          .catch((err) => {
            console.warn(err);
            this.loadUpdateTitle = false;
            this.addMessage({
              text: `Ошибка обновления категории`,
              type: `danger`,
              id: Date.now()
            });
          });
      },
      addCategoryItem() {
        this.loadUpdateSubcategory = true;
        this.addSubCategory({
            title: this.titleSubcategory.toLowerCase(),
            id: this.id,
            subcatId: Date.now()
          })
          .then(data => {
            this.loadUpdateSubcategory = false;
            this.titleSubcategory = ``;
          })
          .catch(err => {
            console.warn(err);
            this.loadUpdateSubcategory = false;
            this.addMessage({
              text: `Ошибка добавления категории`,
              type: `danger`,
              id: Date.now()
            });
          });
      }
    },
    watch: {
      currentCategory: {
        handler(currentCategory) {
          if (currentCategory) this.setSubcategories(currentCategory);
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>