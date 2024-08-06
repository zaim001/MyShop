export const environment = {
  production: false,
    title: 'myshop-realm',
    keycloak: {
        realm: 'myshop-realm',
        clientId: 'myshop',
        url: 'http://localhost:8080'
    },
    stripe: {
      publicKey: 'pk_test_51Pk72j2LOVJKxeaXlAuEkes1aXShxx0Kej5pDc0U9kEud1km8F7gG4IUVMVsRZOuzeBRazbC63jGAlvXCTRDkYBn00PdX4nLJr',
    }
  };