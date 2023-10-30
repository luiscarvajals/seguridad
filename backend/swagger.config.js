import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Portal Web UCB API',
        version: '1.0.0',
        description: 'La API de la Universidad Católica Boliviana es un conjunto de endpoints que proporcionan acceso a diversas funcionalidades de tu portal web. Esta API permite a los usuarios interactuar con recursos como noticias, usuarios, autenticación, y otras características clave de la plataforma. Some useful links:  - [Repositorio](https://github.com/mcvagut34/proytecnoweb)',
        
    },
      servers: [
        {
          url: 'http://localhost:8800',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);

    export default swaggerSpec;