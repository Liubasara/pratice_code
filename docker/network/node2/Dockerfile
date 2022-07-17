# docker build -t node2-network-test-image .
# docker run -dit -p 8002:80 --name node2-network-test node2-network-test-image
FROM node

ADD . /opt/nodeTest
WORKDIR /opt/nodeTest

ENTRYPOINT ["node"]

CMD ["start.js"]