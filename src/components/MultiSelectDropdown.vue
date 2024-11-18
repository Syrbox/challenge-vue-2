<template>
    <div class="dropdown-container">
        <button class="dropdown-button" @click="toggleDropdown">
            {{ label }}
        </button>

        <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="dropdown-options-container">
                <div v-for="option in options" :key="option" class="dropdown-item">
                    <input type="checkbox" :value="option" v-model="selectedOptions" />
                    <label>{{ option }}</label>
                </div>
            </div>
            <button @click="applySelection" class="apply-button">Apply</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "MultiSelectDropdown",
    data() {
        return {
            isDropdownOpen: false,
            selectedOptions: [] // Array to hold selected options
        };
    },
    props: {
        options: Array,
        label: String
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        applySelection() {
            this.isDropdownOpen = false;
            this.$emit("update:selectedOptions", this.selectedOptions); // Emit selected options
        }
    }
};
</script>

<style scoped>
.dropdown-container {
    position: relative;
    display: inline-block;
}

.dropdown-options-container {
    overflow: scroll;
    max-height: 200px;
    text-align: start;
}

.dropdown-button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.dropdown-button:hover {
    background-color: #0056b3;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    width: 200px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
    margin: 5px 0;
}

.apply-button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.apply-button:hover {
    background-color: #218838;
}
</style>