<template>
    <div class="container">
        <h1>Simular plano</h1>
        <div class="form">
            <div v-if="step === 1" class="content">
                <span>Etapa 1</span>
                <label for="">Quantidade de beneficiarios:</label>
                <input type="number" v-model="datas.quantity" />
                <button @click.prevent="addInputs(datas.beneficiaries)">
                    Proximo
                </button>
            </div>
            <div v-if="this.step === 2" class="content">
                <span>Etapa 2</span>
                <div
                    v-for="quantityInput in datas.beneficiaries"
                    :key="quantityInput"
                    class="inputs-group"
                >
                    <div class="inputs">
                        <label for="">Nome:</label>
                        <input
                            type="text"
                            placeholder="Digite o nome do beneficiario"
                            v-model="quantityInput.name"
                        />
                    </div>
                    <div class="inputs">
                        <label for="">Idade:</label>
                        <input
                            type="text"
                            placeholder="Digite a idade do beneficiario"
                            v-model="quantityInput.age"
                        />
                    </div>
                </div>
                <label for="">Selecione um plano:</label>
                <select v-model="datas.plan">
                    <option
                        v-for="plan in plans"
                        :value="plan.registro"
                        :key="plan.codigo"
                    >
                        {{ plan.registro }}
                    </option>
                </select>
                <button @click.prevent="handleSubmit">Enviar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../server/axios";
export default {
    namne: "Home",
    data: function () {
        return {
            datas: {
                beneficiaries: [{}],
                quantity: 0,
                plan: "",
            },
            quantityInputs: 0,
            step: 1,
            plans: [],
        };
    },
    methods: {
        addInputs(beneficiaries) {
            this.quantityInputs = this.datas.quantity;
            this.step++;
            if (this.datas.quantity > 1) {
                beneficiaries.push({});
            }
        },
        async handleSubmit() {
            await axios
                .post("/beneficiaries", this.datas)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((e) => {
                    console.log(e.response.data.msg);
                });
        },
        async getPlans() {
            await axios
                .get("/plans")
                .then((res) => {
                    this.plans = res.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.getPlans();
    },
};
</script>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #cedbde 35%, #98d7e2 100%);
}

h1 {
    margin-bottom: 50px;
}

.form .content {
    display: flex;
    flex-direction: column;
}

.form {
    width: 60%;
    margin: 2em auto 0;
    background-color: #f8f8f8;
    border-radius: 15px;
    box-shadow: 8px 9px 30px 7px rgba(0, 0, 0, 0.75);
    padding: 50px;
}

.form span {
    text-align: center;
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 50px;
}

.form label {
    font-size: 1em;
    margin-bottom: 15px;
    text-align: center;
}

.form input {
    width: 200px;
    margin: 0 auto;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    border: solid 1px #000;
    margin-bottom: 30px;
}

button {
    padding: 15px;
    width: 120px;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 5px;
    outline: none;
    border: 0;
    background: #98d7e2;
    border: 2px solid #6aa8b3;
    cursor: pointer;
    margin: 0 auto;
}

.inputs-group {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
}

.inputs {
    display: flex;
    flex-direction: column;
}

.form select {
    width: 200px;
    margin: 0 auto;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    margin-bottom: 50px;
}
</style>
