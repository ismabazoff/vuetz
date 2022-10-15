<template>
    <div>
        <Button
            class="bg-blue-600 font-normal text-white px-6 py-2 mt-5 mr-2 ml-20 font-semibold"
            @click="changeCity(1)"
            >Заказать в Москву</Button
        >
        <Button
            class="bg-teal-600 font-normal text-white px-6 py-2 mt-5 ml-2 font-semibold"
            @click="changeCity(2)"
            >Заказать в Санкт-Петербург</Button
        >
    </div>
    <div class="backgroundModal" ref="backgroundModal">
        <div class="Modal" ref="Modal">
            <form action="" @submit.prevent="sendForm">
                <h2>Заказать звонок</h2>
                <div class="inform">
                    <div class="mr-5">
                        <label for="" class="mb-1">Имя*</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Ваше имя"
                            v-model="inputName"
                            @input="onInput"
                        />
                        <a v-if="!isNameValid" v-red>Введите имя*</a>
                    </div>

                    <div class="mr-5">
                        <label for="" class="mb-1">Телефон*</label>
                        <input
                            type="text"
                            placeholder="+7 (___) ___-__-__"
                            v-model="inputPhone"
                            @input="onInput"
                        />
                        <a v-if="!isPhoneValid" v-red>Введите телефона*</a>
                    </div>
                    <div class="mr-5">
                        <label for="" class="mb-1">Email*</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="you@example.com"
                            v-model="inputEmail"
                            @input="onInput"
                        />
                        <a v-if="!isEmailValid" v-red>Введите Email*</a>
                    </div>
                    <div>
                        <label for="" class="mb-1">Город*</label>
                        <select v-model="cityId">
                            <option
                                v-for="(city, index) in cities"
                                :value="city.id"
                                :key="index"
                            >
                                {{ city.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="btn">
                    <button>Отправить</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Button from './components/Button.vue'
import axios from 'axios'
export default {
    directives: {
        red: {
            mounted(el) {
                el.style.display = 'inline-block'
                el.style.color = 'red'
            },
        },
        phone: {
            mounted(el) {
                function replaceNumberForInput(value) {
                    let val = ''
                    const x = value
                        .replace(/\D/g, '')
                        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)
                    console.log(x)
                    if (!x[2] && x[1] !== '') {
                        val = x[1] === '+7' ? x[1] : '+7' + x[1]
                        console.log(1, val)
                    } else {
                        val = !x[3]
                            ? x[1] + x[2]
                            : x[1] +
                              '(' +
                              x[2] +
                              ') ' +
                              x[3] +
                              (x[4] ? '-' + x[4] : '')
                        console.log(2, val)
                    }

                    return val
                }

                function replaceNumberForPaste(value) {
                    const r = value.replace(/\D/g, '')
                    let val = r
                    if (val.charAt(0) === '7') {
                        val = '8' + val.slice(1)
                    }
                    return replaceNumberForInput(val)
                }

                el.oninput = function (e) {
                    if (!e.isTrusted) {
                        return
                    }
                    this.value = replaceNumberForInput(this.value)
                }

                el.onpaste = function () {
                    setTimeout(() => {
                        const pasteVal = el.value
                        this.value = replaceNumberForPaste(pasteVal)
                    })
                }
            },
        },
    },
    name: 'App',
    components: {
        Button,
    },

    data() {
        return {
            isNameValid: true,
            isPhoneValid: true,
            isEmailValid: true,
            buttonDisabled: true,
            inputName: '',
            inputPhone: '',
            inputEmail: '',
            cityId: '',
            cities: [
                {
                    id: 1,
                    name: 'Москва',
                },
                {
                    id: 2,
                    name: 'Санкт-Петербург',
                },
                {
                    id: 3,
                    name: 'Казань',
                },
            ],
        }
    },
    methods: {
        changeCity(id) {
            this.cityId = id
            this.$refs.Modal.style.display = 'block'
            this.$refs.backgroundModal.style.position = 'absolute'
        },
        sendForm() {
            this.validate()
            if (!this.isNameValid || !this.isPhoneValid || !this.isEmailValid) {
                return
            }

            let formData = {
                name: this.inputName,
                phone: this.inputPhone,
                email: this.inputEmail,
                city_id: this.cityId,
            }
            axios
                .post(
                    'http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
                    formData
                )
                .then(response => {
                    console.log(response)
                })
            this.inputName = ''
            this.inputPhone = ''
            this.inputEmail = ''
            this.cityId = ''
            this.$refs.Modal.style.display = 'none'
            this.$refs.backgroundModal.style.position = 'static'
        },
        onInput() {
            this.validate()
        },
        validate() {
            this.isNameValid = true
            this.isPhoneValid = true
            this.isEmailValid = true

            if (this.inputName == '') {
                this.isNameValid = false
            }
            if (this.inputPhone == '') {
                this.isPhoneValid = false
            }
            if (this.inputEmail == '') {
                this.isEmailValid = false
            }
        },
    },
}
</script>

<style>
select,
input {
    outline: 1px solid rgb(208, 208, 208);
    border-radius: 6px;
    height: 38px;
    width: 170px;
    text-align: center;
    margin-top: 5px;
    margin-right: 20px;
}
form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
}
form h2 {
    font-size: 24px;
    margin-bottom: 8px;
}
.inform > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}
.inform {
    display: flex;
}
.backgroundModal {
    /* display: none; */
    position: none;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(107, 114, 128, 0.75);
}
.Modal {
    display: none;
    height: 216px;
    width: 793px;
    left: 323.5px;
    top: 404px;
    border-radius: 8px;
    padding: 24px 27px 27px 24px;
    border-radius: 5px;
    background: white;
}
h2 {
    margin-top: 0;
    margin-bottom: 23px;
}
.btn button {
    background: #16a34a;
    height: 38px;
    width: 170px;
    margin: 18px 0 7px 0;
    padding: 5px;
    border-radius: 6px;
    float: right;
    color: white;
}
/* .btn button.disabled {
    background: grey;
} */
a {
    position: absolute;
    margin-top: 70px;
}
</style>
