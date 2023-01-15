<template>
  <section>
    <div v-if="compras"></div>
    <h2>Comprar</h2>
    <div
      class="produto-wrapper"
      v-for="(compra, index) in compras"
      :key="index"
    >
      <ProdutoItem v-if="compra.produto" :produto="compra.produto">
        <p class="vendedor"><span>Vendedor:</span> {{ compra.vendedor_id }}</p>
      </ProdutoItem>
    </div>
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioCompras",
  components: {
    ProdutoItem,
  },
  data() {
    return {
      compras: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getCompras() {
      api.get(`/transacao?tipo=comprador_id`).then((r) => {
        this.compras = r.data;
      });
    },
  },
  watch: {
    login() {
      this.getCompras();
    },
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  },
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
