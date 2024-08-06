# Keycloak Configuration

This directory contains the Keycloak configuration for the MyShop project.

- `myshop-realm-realm.json`: Contains the realm configuration, including clients, roles, and authentication settings.
- `myshop-realm-users-0.json`: Contains user data for the realm.

## Importing the Configuration

To import this configuration into Keycloak:

1. Log into the Keycloak admin console
2. Go to the "Import" section
3. Select the `myshop-realm-realm.json` file to import the realm configuration
4. After the realm is imported, go to the "Users" section
5. Use the "Import" feature to import the `myshop-realm-users-0.json` file

Note: Be cautious when importing user data, especially in production environments. You may want to manage users separately for security reasons.