FROM node
Add . /
RUN npm install --ignore-scripts
COPY . /
WORKDIR /
EXPOSE  3000
CMD node index.js
