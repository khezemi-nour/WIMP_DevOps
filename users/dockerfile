FROM node
ADD . /
RUN npm install --ignore-scripts
COPY . /
WORKDIR /
EXPOSE  3002
CMD node index.js
