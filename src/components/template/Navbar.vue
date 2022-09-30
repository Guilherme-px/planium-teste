<template>
    <div class="nav">
        <div id="logo">
            <img src="../../assets/logo-Planium-05.svg" alt="Logo" />
        </div>
        <div class="links" v-show="!windowWidth">
            <router-link to="/"><span>Home</span></router-link>
        </div>
        <div class="toggle" v-if="windowWidth">
            <BIconList
                class="toggle"
                v-show="windowWidth"
                @click="toggleMobile"
                :class="{ 'icon-active': mobileNav }"
            />
        </div>
        <transition name="mobile-nav">
            <div class="dropdown-nav" v-show="mobileNav" @click="toggleMobile">
                <router-link to="/">Home</router-link>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            mobileNav: null,
            windowWidth: false,
        };
    },
    methods: {
        toggleMobile() {
            this.mobileNav = !this.mobileNav;
        },

        watchScreen() {
            this.windowWidth = window.innerWidth < 760;
        },
    },
    watch: {
        windowWidth(value) {
            if (!value) {
                if (this.mobileNav) {
                    this.mobileNav = false;
                }
            }
        },
    },
    mounted() {
        this.watchScreen();
        window.addEventListener("resize", this.watchScreen, { passive: true });
    },
};
</script>

<style>
.nav {
    position: fixed;
    grid-area: nav;
    background-color: #98d7e2;
    border-bottom: 4px solid #6aa8b3;
    padding: 20px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10vh;
}

#logo {
    width: 120px;
}

.links a {
    padding-left: 2rem;
    font-size: 1.2rem;
    color: #000;
}

.links a:hover {
    color: #6aa8b3;
}

.toggle {
    font-size: 2.2rem;
    display: flex;
    color: #000;
    cursor: pointer;
}

.dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 70%;
    height: 100%;
    background-color: #98d7e2;
    top: 0;
    left: 0;
}

.dropdown-nav a {
    width: 100%;
    color: #000;
    text-align: center;
    font-size: 1.2rem;
    padding-block: 1.5rem;
}

.dropdown-nav a:hover {
    color: #6aa8b3;
}

.toggle:hover {
    color: #6aa8b3;
}
</style>
