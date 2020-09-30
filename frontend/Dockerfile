FROM node:14.4.0-alpine3.10
USER root
WORKDIR /frontend
COPY . /frontend
ARG API_URL=127.0.0.1:8000
ENV REACT_APP_HOST_IP_ADDRESS $API_URL
RUN yarn
RUN yarn build