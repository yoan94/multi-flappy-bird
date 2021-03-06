import { Game } from "./game";
import Vue from "vue"

export class Menu {
    constructor(
        public game: Game
    ) {}

    public el: HTMLDivElement
    public mainMenuEl: HTMLDivElement
    private id: string = "menu"

    public vue: any

    create(parentSelector: string) {

        this.el = document.createElement("div")
        this.el.id = "menu"
        this.el.setAttribute("v-if", "!hidden")
        this.el.setAttribute(":class", "darkBg?'dark-background':''")
        this.el.innerHTML = this.game.assets.getFile("menu.html")

        this.mainMenuEl = this.el.querySelector(".main-menu")

        document.querySelector(parentSelector).appendChild(this.el)

        this.initVue()
    }

    close() {
        // this.vue.hidden = true
        this.vue.hidden = false
        this.vue.darkBg = false
        this.vue.current = "in-game"
    }

    initVue() {
        let game = this.game
        this.vue = new Vue({
            el: `#${this.id}`,
            data: {
                hidden: false,
                darkBg: false,
                current: "main",
                useTouch: game.input?.useTouch,

                username: ""
            },
            methods: {            
                play: function () {
                    game.startPlay(this.username)
                }
            }
        })
    }

    home() {
        this.vue.hidden = false
        this.vue.darkBg = true
        this.vue.current = "main"
    }

    serverConnection() {
        this.vue.hidden = false
        this.vue.darkBg = true
        this.vue.current = "serverConnection"
    }

    serverReconnection() {
        this.vue.hidden = false
        this.vue.darkBg = true
        this.vue.current = "serverReconnection"
    }

    waitForMoving() {
        this.vue.hidden = false
        this.vue.darkBg = false
        this.vue.current = "waitForMoving"
    }
}