<template>
    <div>
        <MultiSelectDropdown :options="filter.options" :label="filter.label"
            @update:selectedOptions="handleSelection" />
    </div>
</template>

<script>
import MultiSelectDropdown from "./MultiSelectDropdown.vue";
export default {
    name: "FilterComponent",
    components: { MultiSelectDropdown },
    props: {
        filter: {
            label: String,
            options: Array,
            name: String,
        }
    },
    data() {
        return {
            selectedGenres: [],
        };
    },
    methods: {
        handleSelection(selectedOptions) {
            this.$emit("apply-filters", selectedOptions);
        }
    }
};
</script>

<style lang="scss" scoped>
.genre {
    margin: 30px;

    h3 {
        text-align: start;
    }

    &-container {
        display: flex;
        gap: 15px;
    }

    &-item {
        margin: 5px 0;
    }
}


button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>