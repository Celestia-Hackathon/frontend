import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // basicSsl(),
    react(), 
    VitePWA({
      registerType: "prompt",
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true
      },
      includeAssets:['favicon.ico', "apple-touch-icon.png", "maskable-icon.png"],
      manifest:{
        name:"Chatspace",
        short_name:"Chatspace",
        description:"A free, engaging and fun social media",
        icons:[{
          src: '/android-chrome-192x192.png',
          sizes:'192x192',
          type:'image/png',
          purpose:'any',
        },
        {
          src:'/android-chrome-512x512.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'any',
        },
        {
          src: '/apple-touch-icon.png',
          sizes:'180x180',
          type:'image/png',
          purpose:'any',
        },
        {
          src: '/maskable_icon.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'maskable',
        },
        {
          src: '/favicon.ico',
          sizes:'48x48',
          type:'image/x-icon',
        }],
        theme_color:"#121212",
        background_color:"#121212",
        display:"standalone",
        display_override:['standalone'],
        scope:'/',
        start_url:"/",
        orientation:'portrait',
        lang:'en',
        dir:'ltr',
        categories:['social', 'fun', 'entertainment', 'games', 'crypto'],
        screenshots:[{
          src:'/screenshot_mobile_feed.png',
          sizes:'1170x2532',
          type:'image/png',
          form_factor:'narrow',
          label:'Scroll through your feed and see what people are up to!',
        },
        {
          src:'/screenshot_mobile_gacha.png',
          sizes:'1170x2532',
          type:'image/png',
          form_factor:'narrow',
          label:'Try your luck with our Gacha and win cool NFTs!',
        },
        {
          src:'/screenshot_mobile_login.png',
          sizes:'1170x2532',
          type:'image/png',
          form_factor:'narrow',
          label:'Login to your account and start your journey!',
        },
        {
          src:'/screenshot_desktop_explore.png',
          sizes:'1447x937',
          type:'image/png',
          form_factor:'wide',
          label:'Explore different topics, people and NFTs!',
        },       
      ],
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
