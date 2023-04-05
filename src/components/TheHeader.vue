<template>
  <nav class="navbar">
  <i class="material-icons menu-icon"> menu </i>
  <div class="logo">
    <div class="text"> My Store </div>
  </div>
  <div class="item search right" tabindex="0">
    <div class="search-group">
      <input type="text" v-model="filter" @keyup.enter="searchItems(filter)" placeholder="Recherche">
        <i class="material-icons search-icon" @click="searchItems(filter)"> search </i>
      </div>
  </div>
  <div class="item search right" tabindex="0">
    <div class="search-group">
      <input type="text" placeholder="Prix">
        <i class="material-icons search-icon"> search </i>
      </div>
  </div>
  <a href="" class="item">
    <div class="group">
      <router-link to="/cart">
        <i class="material-icons" style="color: black">
          shopping_cart
        </i>
      </router-link>  
      <div class="detail">
        {{ cart.length }}
      </div>
    </div>
  </a>
</nav>

</template>

<script>
import { mapState } from "vuex";

export default {
  data(){
    return {
      title: "My Store",
      ProductList: [],
      allProducts: [],
      categoryList: [],
      filter: '',
    }
  },
  computed:{
    ...mapState('cart', ['cart']),
    dataUrl: function () {
      return "https://dummyjson.com/products";
    },
    },
  methods:{
    searchItems(searchTerm) {
      const filteredProducts = this.allProducts.filter((item) => {
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearchTerm;
  });
  const filteredCategories = this.categoryList.filter((category) => {
    return category.toLowerCase().includes(searchTerm.toLowerCase());
  });
  this.ProductList = filteredProducts;
  this.categoryList = filteredCategories;
},
  },
    watch:{
      data(newV,oldV){
        console.log(oldV+"----->"+newV)
      }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
:root {
--theme-bg-color: #9ab9f3;
--theme-color: rgb(0, 0, 0);
}
* { 
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  box-shadow: 0 0 2px 0 grey;
  align-items: center;
  font-size: 1em;
  
  background-color:#3761af;
  background-color: var(--theme-bg-color);
  
  color: white;
  color: var(--theme-color);
  

}
.item{
  padding: 10px;
  text-decoration: none;
  color: white;
  color: var(--theme-color);

}
.item.right {
  margin: 0 0 0 auto;
}
.navbar .logo {
  font-size: 1.2em;
  align-items: center;
  display: flex;
}
.logo img {
  max-width: 40px;
}
.logo .text {
  margin-left: 20px;
  font-size:30px;
  font-weight: 600;
}
.item.search {
  transition: 0.2s linear;
  display:flex;
  justify-content: center;
  flex-grow:1;
  
}
.item.search .search-icon {
  border-left: 1px solid grey;
  margin: 2px;
  padding-left: 10px;
  cursor:pointer;
  color: grey;
}
.item.search .search-icon:hover {
  
  color: black;
}
.item.search input {
  width: 100%;
  padding: 6px ;
  outline: none;
  border: 2px solid grey; 
  max-width: 100%;
  border: 0;
}
.item .search-group {
  display:flex;
  width: 100%;
  max-width: 700px;
  border-radius: 20px;
  border: 2px solid grey;
  overflow: hidden;
  background: white;
  
  border-color: white;
  color: var(--theme-color);

}
.item .search-group select{

  border: 0;
  margin: 2px;
  border-right: 1px solid grey;
  max-width: 5em;
  outline: none;
  color: grey;
  
}
.item .group {
  display:flex;
  align-items: center;
  font-size: 0.9em;
}
.item .group .sub{
  font-size: 0.8em;


}
.material-icons {
  font-size:1.8rem;
}
.menu-icon{
  display:none;
}
@media (max-width: 700px) {
  .item.search input {
    display: none;
  }
  .menu-icon {
    display:block;
  }
  .detail,.logo .text {
    display:none;

  }


}
.action-btn{
  background-color:transparent;
  border: none;
}
</style>