FROM node
Add . /
RUN npm install --ignore-scripts
COPY . /
WORKDIR /app
EXPOSE  3000
CMD node index.js
