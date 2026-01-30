import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
//     blueprint: md3,
//     icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
//     theme: {
//       defaultTheme: 'light',     // 👈 ชื่อให้ตรงกับที่เราจะสลับ
//       themes: { light, dark },
//     },
  })
  app.vueApp.use(vuetify)
})