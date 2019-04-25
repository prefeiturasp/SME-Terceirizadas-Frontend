FROM node:10.15.3-alpine as builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run-script build

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

FROM nginx:1.15.12-alpine
COPY --from=builder /app/build /usr/share/nginx/html

