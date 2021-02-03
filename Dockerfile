# build environment
FROM node:13.12.0-alpine as build
RUN apk add git
WORKDIR /csort
ENV PATH /csort/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY start.sh ./
COPY server/server.js ./server/server.js
COPY server/package.json ./server/package.json
RUN pwd
RUN ls
RUN npm ci
#RUN npm install react-scripts@3.4.1 -g
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /csort/build /usr/share/nginx/html
COPY --from=build /csort/start.sh ./
COPY --from=build /csort/server/server.js ./server/server.js
COPY --from=build /csort/server/package.json ./server/package.json
RUN apk update
RUN apk add screen
RUN apk add npm
RUN apk add vim
RUN pwd
RUN ls
 RUN sed -i 's/\r$//' ./start.sh  && \  
        chmod +x ./start.sh
#RUN chmod +x ./start.sh
EXPOSE 80 81
CMD ["sh" ,"./start.sh"]
#ENTRYPOINT [ "./start.sh" ]
