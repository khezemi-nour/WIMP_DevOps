FROM node
ADD . /
RUN npm install --ignore-scripts
COPY . /
WORKDIR /
EXPOSE  3001
CMD node index.js
