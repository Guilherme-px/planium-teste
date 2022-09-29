<template>
    <div class="nav">
        <router-link to="/" id="logo"><span>Logo</span></router-link>
        <div class="links" v-show="!windowWidth">
            <router-link to="/"><span>Home</span></router-link>
        </div>
        <div class="toggle">
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
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 20px 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    z-index: 20000000000000000000;
}

#logo {
    margin: auto;
    margin-left: 0;
}

#logo span {
    color: #fff;
    font-size: 1.2em;
    letter-spacing: 2px;
}

.links a {
    padding-left: 2rem;
    font-size: 1.2rem;
    color: #fff;
}

.links a:hover {
    color: rgb(250, 250, 36);
}

.toggle {
    font-size: 2.2rem;
    display: flex;
    color: #fff;
    cursor: pointer;
}

.dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 70%;
    height: 100%;
    background-color: #111;
    top: 0;
    left: 0;
}

.dropdown-nav a {
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 1.2rem;
    padding-block: 1.5rem;
}

.dropdown-nav a:hover {
    color: rgb(250, 250, 36);
}

.toggle:hover {
    color: rgb(250, 250, 36);
}
</style>
