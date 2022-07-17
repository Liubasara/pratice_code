# docker build -t node1-network-test-image .
# docker run -dit -p 8001:80 --name node1-network-test node1-network-test-image
FROM node

ADD . /opt/nodeTest
WORKDIR /opt/nodeTest

ENTRYPOINT ["node"]

CMD ["start.js"]