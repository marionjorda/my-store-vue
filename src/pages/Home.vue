<template>
  <the-header class="shadow-sm"></the-header>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
    <span>{{currentPage}}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
  <div class="layout">
    <div class="section1">
      <p class="sidebar-title">Categories</p>
      <ul v-for="item in categoryList" :key="item">
        <li @click="filteredItems(item)">{{ item }}</li>
      </ul>
    </div>
    <div class="section2">
      <div class="item2" v-for="product in ProductList" :key="product.id">
        <item-card :product="product"></item-card>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "../components/ItemCard.vue";
import TheHeader from "../components/TheHeader.vue";
import { mapState } from "vuex";
export default {
  components: {
    ItemCard,
    TheHeader,
  },
  data() {
    return {
      categoryList: [],
      ProductList: [],
      allProducts: [],
      currentPage: 0,
      perPage: 10,
    };
  },
  created() {
    this.loadCategories();
    this.loadAllProducts();
  },
  computed: {
    ...mapState("cart", ["cart"]),
    cart() {
      console.log("cart chanf=ged");
    },
    totalPages() {
      return Math.ceil(this.ProductList.length / this.perPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.ProductList.slice(start, end);
    },
  },
  methods: {
    loadCategories() {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((json) => (this.categoryList = json));
    },
    loadAllProducts() {
      fetch("https://dummyjson.com/products/")
        .then((res) => res.json())
        .then((json) => {
          this.ProductList = json.products;
          this.allProducts = json.products;
        });
    },
    filteredItems(category) {
      const filteredItems = this.allProducts.filter((item) => {
        return item.category == category;
      });
      this.ProductList = filteredItems;
    },
    filteredProducts(searchTerm) {
    const filteredProducts = this.allProducts.filter((item) => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });
  this.ProductList = filteredProducts;
  this.currentPage = 1;
  },
  prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style>
.layout {
  display: grid;
  gap: 1.5rem;
  grid-template-areas: "section1 section2";
  grid-template-columns: 1fr 5fr;
}

.section2 {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}
.card {
  flex: 0 0 30%;
  margin: 10px;
}

.sidebar-title {
  text-align: center;
  font-size: 20px;
  margin-top: 25px;
  font-weight: bold;
}

.section1 > ul {
  list-style-type: none;
  text-align: center;
}

.section1 > ul:hover {
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
}
.section1 > ul {
  border: 1px solid rgb(168, 165, 165);
  margin-left: 25px;
  padding: 5px;
  border-radius: 5px;
}
</style>
