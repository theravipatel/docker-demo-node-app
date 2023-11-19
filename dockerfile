FROM node:latest
LABEL vendorl="Ravi Patel"
RUN npm install -g nodemon
#WORKDIR /app
#COPY . ./app
COPY . .
RUN npm install
EXPOSE 1000
CMD ["npm", "run", "dev"] 