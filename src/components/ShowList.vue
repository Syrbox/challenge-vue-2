<template>
  <div>
    <h3>Filter Shows</h3>
    <FilterComponent :filter="filter" @apply-filters="updateGenreFilters" />
    <h1>Show List</h1>
    <div v-if="filteredShows.length > 0">
      <div class="container">
        <div class="card" v-for="(show, index) in filteredShows" :key="index">
          <div class="card-content">
            <img class="card-image" :src="show.image" alt="image" />
            <div class="card-description">
              <h1>{{ show.name }}</h1>
              <p class="type">{{ show.type }}</p>
              <p>Network: {{ show.network }}</p>
            </div>
          </div>
          <p class="card-button"><button>Official Site</button></p>
        </div>
      </div>
    </div>
    <div v-else>No results</div>
  </div>
</template>

<script>
import { getShowsByPage } from "@/services/ShowsService.js";
import FilterComponent from "./FilterComponent.vue";
export default {
  name: "ShowList",
  components: { FilterComponent },
  data() {
    return {
      shows: [],
      filteredShows: [],
      filter: [],
      filterByGenres: []
    };
  },
  async mounted() {
    this.shows = await getShowsByPage(1);
    this.filteredShows = this.sortByVowelsAndAlphabetically(this.shows);
    this.filter = {
      label: 'Filter Genre',
      key: 'genre',
      options: [...new Set(this.shows.flatMap(show => show.genres))],
    };
  },
  methods: {
    sortByVowelsAndAlphabetically(objects) {
      objects.sort((a, b) => {
        const vowelsCountA = this.countVowels(a.name);
        const vowelsCountB = this.countVowels(b.name);

        if (vowelsCountA === vowelsCountB) {
          // Sort alphabetically if vowels count is the same
          return a.name.localeCompare(b.name);
        }
        // Sort by vowels count
        return vowelsCountA - vowelsCountB;
      });
      return objects
    },
    countVowels(str) {
      // Regular expression to match vowels
      const vowels = str.match(/[aeiouAEIOU]/g);
      return vowels ? vowels.length : 0;
    },
    updateGenreFilters(filters) {
      this.filterByGenres = filters;
      this.applyFilters();
    },
    applyFilters() {
      this.filteredShows = this.shows.filter(show => {
        return (
          (this.filterByGenres.length === 0 || this.filterByGenres.some(genre => show.genres.includes(genre)))
        );
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: lightgray;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  flex-direction: row;
  padding-top: 15px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 80%;
  margin: auto;
  text-align: center;
  font-family: arial;
  background-color: white;
  padding-top: 10px;
  display: flex;
  flex-basis: 400px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 15px;

  &-content {
    display: flex;
    align-self: center;
    gap: 15px;
  }

  &-image {
    align-self: center;
  }

  &-description {
    display: flex;
    flex-direction: column;

    h1 {
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .type {
      color: grey;
      font-size: 18px;
      margin: 0;
    }
  }

  &-button {
    flex-basis: 100%;
    margin: 0;
  }
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

img {
  width: 100px;
  height: auto;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover,
a:hover {
  opacity: 0.7;
}
</style>
