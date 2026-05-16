# Base image එක විදිහට Node පාවිච්චි කරනවා
FROM node:18

# Container එක ඇතුළේ වැඩ කරන folder එක හදනවා
WORKDIR /usr/src/app

# package.json ෆයිල්ස් ටික කොපි කරගන්නවා
COPY package*.json ./

# packages ටික install කරනවා
RUN npm install

# ඉතිරි කෝඩ් ඔක්කොම කොපි කරනවා
COPY . .

# Backend එක දුවන port එක
EXPOSE 5000

# Server එක run කරන command එක
CMD ["node", "server.js"]