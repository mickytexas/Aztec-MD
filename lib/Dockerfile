FROM quay.io/vorterx/vorterx:latest
RUN git clone https://github.com/Vorterx/Aztec-Test /root/vorterx
WORKDIR /root/vorterx/
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
