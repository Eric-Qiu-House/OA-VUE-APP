// 生产环境 - pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "oa-vue-prod",
      script: "npx",
      args: ["serve", "-s", "/opt/OA-VUE-APP/dist", "-p", "8080"],
      cwd: "/opt/OA-VUE-APP",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
