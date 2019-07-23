<template>
  <div>
    <table class="table table-bordered mt-4 table-sm">
      <thead>
        <tr class="text-center">
          <th>Название</th>
          <th>Изменить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="places-name">{{ item.title | capitalize }}</td>
          <td class="places-action text-center">
            <button type="button" class="btn btn-info btn-edit places-btn" @click="$emit('item-edit', item)">
              <BaseIcon link="edit" width="20" height="20" />
            </button>
            <button type="button" class="btn btn-danger btn-edit places-btn" @click="$emit('item-delete', item)">
              <BaseIcon link="remove" width="20" height="20" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { capitalize } from "@/filters/globalFilters";

  export default {
    name: "ItemsList",
    filters: {
      capitalize
    },
    props: {
      items: {
        type: Array
      }
    }
  }
</script>

<style lang="scss" scoped>
  .places-name {
    width: 100%;
  }

  .places-action {
    white-space: nowrap;
  }

  .places-btn {
    margin: 0 5px;
  }

  .table td {
    vertical-align: middle;
  }
</style>