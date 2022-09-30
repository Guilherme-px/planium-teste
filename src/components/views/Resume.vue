<template>
    <section class="container">
        <div class="card">
            <div class="beneficiaries">
                <div class="title">
                    <h1>Beneficiarios</h1>
                </div>
                <div v-for="beneficiary in beneficiaries" :key="beneficiary">
                    <div class="names-content">
                        <span
                            ><strong> Nome: </strong>
                            {{ beneficiary.name }}</span
                        >
                        <span
                            ><strong> Idade: </strong>
                            {{ beneficiary.age }}</span
                        >
                    </div>
                </div>
                <div class="beneficiaries-details">
                    <span>
                        <strong> Quantidade de beneficiarios: </strong>
                        {{ quantity }}</span
                    >
                    <span>
                        <strong> Registro do plano: </strong>
                        {{ register }}</span
                    >
                </div>
            </div>
            <div class="plan-info">
                <div class="title">
                    <h2>Informações do plano</h2>
                </div>
                <span><strong>Nome: </strong> {{ plan.nome }}</span>
                <span><strong>Registro: </strong> {{ plan.registro }}</span>
            </div>
            <div class="prices-info">
                <div class="title">
                    <h3>Valores</h3>
                </div>
                <div>
                    <div v-for="price in prices" :key="price">
                        <div class="prices-content">
                            <span
                                ><strong>Idade: </strong>
                                {{ price.idade }}</span
                            >
                            <span
                                ><strong>Preço: </strong>
                                {{ price.preço }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="result" v-for="(sumPrice, i) in sumPrices" :key="i">
                    <span><strong>Total: </strong> {{ sumPrice.total }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "../../server/axios";

export default {
    name: "Resume",
    data: () => {
        return {
            quantity: {},
            register: {},
            plan: {},
            sumPrices: [],
            prices: [],
            beneficiaries: [],
        };
    },
    methods: {
        async getBeneficiariesInfo() {
            await axios
                .get("/beneficiaries/resume")
                .then((res) => {
                    this.quantity = res.data.beneficiaries.quantity;
                    this.register = res.data.beneficiaries.plan;
                    this.beneficiaries = res.data.beneficiaries.beneficiaries;
                    this.plan = res.data.plan;
                    this.prices = res.data.pricePerBeneficiary;
                    this.sumPrices = res.data.priceTotal;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.getBeneficiariesInfo();
    },
};
</script>

<style scoped>
.container {
    padding: 60px 0;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #cedbde 35%, #98d7e2 100%);
}

.card {
    width: 60%;
    margin: auto 0;
    background-color: #f8f8f8;
    border-radius: 15px;
    box-shadow: 8px 9px 30px 7px rgba(0, 0, 0, 0.75);
    padding: 25px 50px;
}

.title {
    text-align: center;
    font-size: 1.3em;
    font-weight: bold;
    margin-block: 30px;
}

.names-content {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 15px;
}

.beneficiaries-details {
    display: flex;
    flex-direction: column;
}

.beneficiaries-details span {
    margin-bottom: 15px;
}

.plan-info {
    display: flex;
    flex-direction: column;
}

.plan-info span {
    margin-block: 15px;
}

.prices-content {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 15px;
}

.result {
    text-align: right;
}

@media (max-width: 760px) {
    .card {
        width: 80%;
    }
}
</style>
