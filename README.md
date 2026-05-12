{
  "name": "Gestão Empresarial",
  "description": "Plataforma SaaS completa para gestão de mercados, PDV, financeiro e estoque com integração de IA.",
  "requestFramePermissions": [],
  "majorCapabilities": []
}
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example

{
  "projectId": "gen-lang-client-0599021309",
  "appId": "1:672146312574:web:6cdacc31f9f2d6c51c372f",
  "apiKey": "",
  "authDomain": "gen-lang-client-0599021309.firebaseapp.com",
  "firestoreDatabaseId": "ai-studio-60690dff-d19a-4d04-a34f-f957c3c2704c",
  "storageBucket": "gen-lang-client-0599021309.firebasestorage.app",
  "messagingSenderId": "672146312574",
  "measurementId": ""
}
{
  "entities": {
    "Business": {
      "title": "Business",
      "description": "Tenant company in the ERP system",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "cnpj": { "type": "string" },
        "address": { "type": "string" },
        "ownerId": { "type": "string" },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["name", "ownerId"]
    },
    "User": {
      "title": "User",
      "description": "System user linked to a business",
      "type": "object",
      "properties": {
        "uid": { "type": "string" },
        "email": { "type": "string" },
        "displayName": { "type": "string" },
        "businessId": { "type": "string" },
        "role": { "type": "string", "enum": ["admin", "operator"] },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["uid", "email", "businessId"]
    },
    "Product": {
      "title": "Product",
      "description": "Inventory item",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "sku": { "type": "string" },
        "price": { "type": "number" },
        "costPrice": { "type": "number", "description": "Product cost price" },
        "stock": { "type": "number" },
        "category": { "type": "string" },
        "businessId": { "type": "string" },
        "updatedAt": { "type": "string", "format": "date-time" }
      },
      "required": ["name", "price", "businessId"]
    },
    "Sale": {
      "title": "Sale",
      "description": "Point of Sale transaction",
      "type": "object",
      "properties": {
        "total": { "type": "number" },
        "paymentMethod": { "type": "string" },
        "businessId": { "type": "string" },
        "customerId": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" },
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "productId": { "type": "string" },
              "name": { "type": "string" },
              "quantity": { "type": "number" },
              "price": { "type": "number" }
            }
          }
        }
      },
      "required": ["total", "paymentMethod", "businessId", "items"]
    },
    "Customer": {
      "title": "Customer",
      "description": "Client in CRM",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "document": { "type": "string" },
        "email": { "type": "string" },
        "phone": { "type": "string" },
        "businessId": { "type": "string" }
      },
      "required": ["name", "businessId"]
    },
    "FinancialTransaction": {
      "title": "Financial Transaction",
      "description": "Cash flow entry",
      "type": "object",
      "properties": {
        "amount": { "type": "number" },
        "type": { "type": "string", "enum": ["income", "expense"] },
        "category": { "type": "string" },
        "description": { "type": "string" },
        "businessId": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" }
      },
      "required": ["amount", "type", "businessId"]
    },
    "Category": {
      "title": "Category",
      "description": "Product category",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "businessId": { "type": "string" },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["name", "businessId"]
    },
    "Invoice": {
      "title": "Invoice",
      "description": "Electronic fiscal document (NF-e/NFC-e)",
      "type": "object",
      "properties": {
        "number": { "type": "string" },
        "type": { "type": "string" },
        "customer": { "type": "string" },
        "value": { "type": "number" },
        "status": { "type": "string" },
        "date": { "type": "string" },
        "businessId": { "type": "string" },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["number", "customer", "value", "businessId"]
    },
    "Config": {
      "title": "Configuration",
      "description": "Generic configuration document (interface, notifications, fiscal)",
      "type": "object",
      "properties": {
        "updatedAt": { "type": "string", "format": "date-time" }
      }
    },
    "License": {
      "title": "License",
      "description": "Activation license key",
      "type": "object",
      "properties": {
        "key": { "type": "string" },
        "active": { "type": "boolean" },
        "createdAt": { "type": "string", "format": "date-time" }
      },
      "required": ["key", "active"]
    }
  },
  "firestore": {
    "/businesses/{businessId}": {
      "schema": "Business",
      "description": "Tenant business profile"
    },
    "/users/{userId}": {
      "schema": "User",
      "description": "User profile with business linkage"
    },
    "/businesses/{businessId}/products/{productId}": {
      "schema": "Product",
      "description": "Inventory items for a specific business"
    },
    "/businesses/{businessId}/sales/{saleId}": {
      "schema": "Sale",
      "description": "Sales records"
    },
    "/businesses/{businessId}/customers/{customerId}": {
      "schema": "Customer",
      "description": "CRM records"
    },
    "/businesses/{businessId}/finance/{transactionId}": {
      "schema": "FinancialTransaction",
      "description": "Cash flow records"
    },
    "/businesses/{businessId}/categories/{categoryId}": {
      "schema": "Category",
      "description": "Product categories"
    },
    "/businesses/{businessId}/invoices/{invoiceId}": {
      "schema": "Invoice",
      "description": "Fiscal invoices"
    },
    "/businesses/{businessId}/config/{configId}": {
      "schema": "Config",
      "description": "Business settings (fiscal, interface, notifications)"
    },
    "/licenses/{licenseId}": {
      "schema": "License",
      "description": "System generated activation keys"
    }
  }
}

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Default Deny
    match /{document=**} {
      allow read, write: if false;
    }

    // Helper Functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isEmailVerified() {
      return request.auth.token.email_verified == true;
    }

    function getBusinessId() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.businessId;
    }

    function isMemberOf(businessId) {
      return isSignedIn() && getBusinessId() == businessId;
    }

    function isValidId(id) {
      return id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$');
    }

    // Users Collection
    match /users/{userId} {
      allow read: if isSignedIn() && request.auth.uid == userId;
      allow create: if isSignedIn() && request.auth.uid == userId 
        && request.resource.data.keys().hasAll(['uid', 'email', 'businessId', 'role'])
        && request.resource.data.role == 'admin'; // First user is admin
      allow update: if isSignedIn() && request.auth.uid == userId
        && request.resource.data.businessId == resource.data.businessId
        && request.resource.data.role == resource.data.role; // Immutable business and role
    }

    // Businesses Collection
    match /businesses/{businessId} {
      allow read: if isMemberOf(businessId);
      allow create: if isSignedIn(); 
      allow update: if isMemberOf(businessId) && resource.data.ownerId == request.auth.uid;

      // Products subcollection
      match /products/{productId} {
        allow read: if isMemberOf(businessId);
        allow write: if isMemberOf(businessId);
      }

      // Categories subcollection
      match /categories/{categoryId} {
        allow read: if isMemberOf(businessId);
        allow write: if isMemberOf(businessId);
      }

      // Sales subcollection
      match /sales/{saleId} {
        allow read: if isMemberOf(businessId);
        allow create: if isMemberOf(businessId);
        allow update, delete: if false; // Sales are immutable
      }

      // Customers subcollection
      match /customers/{customerId} {
        allow read, write: if isMemberOf(businessId);
      }

      // Finance subcollection
      match /finance/{transactionId} {
        allow read, write: if isMemberOf(businessId);
      }

      // Invoices subcollection
      match /invoices/{invoiceId} {
        allow read, write: if isMemberOf(businessId);
      }

      // Config subcollection
      match /config/{configId} {
        allow read, write: if isMemberOf(businessId);
      }
    }

    // Licenses Collection
    match /licenses/{licenseId} {
      allow read, write: if isSignedIn() && request.auth.token.email == 'valdneylima71@gmail.com' && request.auth.token.email_verified == true;
    }
  }
}

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestão Empresarial </title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>



package-lock.json
{
  "name": "react-example",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "react-example",
      "version": "0.0.0",
      "dependencies": {
        "@google/genai": "^1.29.0",
        "@tailwindcss/vite": "^4.1.14",
        "@vitejs/plugin-react": "^5.0.4",
        "clsx": "^2.1.1",
        "date-fns": "^4.1.0",
        "dotenv": "^17.2.3",
        "express": "^4.21.2",
        "firebase": "^12.13.0",
        "lucide-react": "^0.546.0",
        "motion": "^12.23.24",
        "react": "^19.0.1",
        "react-dom": "^19.0.1",
        "react-router-dom": "^7.15.0",
        "recharts": "^3.8.1",
        "tailwind-merge": "^3.6.0",
        "vite": "^6.2.3"
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^22.14.0",
        "autoprefixer": "^10.4.21",
        "tailwindcss": "^4.1.14",
        "tsx": "^4.21.0",
        "typescript": "~5.8.2",
        "vite": "^6.2.3"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.3",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.3.tgz",
      "integrity": "sha512-LIVqM46zQWZhj17qA8wb4nW/ixr2y1Nw+r1etiAWgRM6U1IqP+LNhL1yg440jYZR72jCWcWbLWzIosH+uP1fqg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.2.tgz",
      "integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.3",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.3.tgz",
      "integrity": "sha512-b3ctpQwp+PROvU/cttc4OYl4MzfJUWy6FZg+PMXfzmt/+39iHVF0sDfqay8TQM3JA2EUOyKcFZt75jWriQijsA==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.27.7.tgz",
      "integrity": "sha512-EKX3Qwmhz1eMdEJokhALr0YiD0lhQNwDqkPYyPhiSwKrh7/4KRjQc04sZ8db+5DVVnZ1LmbNDI1uAMPEUBnQPg==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.27.7.tgz",
      "integrity": "sha512-jbPXvB4Yj2yBV7HUfE2KHe4GJX51QplCN1pGbYjvsyCZbQmies29EoJbkEc+vYuU5o45AfQn37vZlyXy4YJ8RQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.27.7.tgz",
      "integrity": "sha512-62dPZHpIXzvChfvfLJow3q5dDtiNMkwiRzPylSCfriLvZeq0a1bWChrGx/BbUbPwOrsWKMn8idSllklzBy+dgQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.27.7.tgz",
      "integrity": "sha512-x5VpMODneVDb70PYV2VQOmIUUiBtY3D3mPBG8NxVk5CogneYhkR7MmM3yR/uMdITLrC1ml/NV1rj4bMJuy9MCg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.27.7.tgz",
      "integrity": "sha512-5lckdqeuBPlKUwvoCXIgI2D9/ABmPq3Rdp7IfL70393YgaASt7tbju3Ac+ePVi3KDH6N2RqePfHnXkaDtY9fkw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.27.7.tgz",
      "integrity": "sha512-rYnXrKcXuT7Z+WL5K980jVFdvVKhCHhUwid+dDYQpH+qu+TefcomiMAJpIiC2EM3Rjtq0sO3StMV/+3w3MyyqQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.27.7.tgz",
      "integrity": "sha512-B48PqeCsEgOtzME2GbNM2roU29AMTuOIN91dsMO30t+Ydis3z/3Ngoj5hhnsOSSwNzS+6JppqWsuhTp6E82l2w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.27.7.tgz",
      "integrity": "sha512-jOBDK5XEjA4m5IJK3bpAQF9/Lelu/Z9ZcdhTRLf4cajlB+8VEhFFRjWgfy3M1O4rO2GQ/b2dLwCUGpiF/eATNQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.27.7.tgz",
      "integrity": "sha512-RkT/YXYBTSULo3+af8Ib0ykH8u2MBh57o7q/DAs3lTJlyVQkgQvlrPTnjIzzRPQyavxtPtfg0EopvDyIt0j1rA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.27.7.tgz",
      "integrity": "sha512-RZPHBoxXuNnPQO9rvjh5jdkRmVizktkT7TCDkDmQ0W2SwHInKCAV95GRuvdSvA7w4VMwfCjUiPwDi0ZO6Nfe9A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.27.7.tgz",
      "integrity": "sha512-GA48aKNkyQDbd3KtkplYWT102C5sn/EZTY4XROkxONgruHPU72l+gW+FfF8tf2cFjeHaRbWpOYa/uRBz/Xq1Pg==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.27.7.tgz",
      "integrity": "sha512-a4POruNM2oWsD4WKvBSEKGIiWQF8fZOAsycHOt6JBpZ+JN2n2JH9WAv56SOyu9X5IqAjqSIPTaJkqN8F7XOQ5Q==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.27.7.tgz",
      "integrity": "sha512-KabT5I6StirGfIz0FMgl1I+R1H73Gp0ofL9A3nG3i/cYFJzKHhouBV5VWK1CSgKvVaG4q1RNpCTR2LuTVB3fIw==",
      "cpu": [
        "mips64el"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.27.7.tgz",
      "integrity": "sha512-gRsL4x6wsGHGRqhtI+ifpN/vpOFTQtnbsupUF5R5YTAg+y/lKelYR1hXbnBdzDjGbMYjVJLJTd2OFmMewAgwlQ==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.27.7.tgz",
      "integrity": "sha512-hL25LbxO1QOngGzu2U5xeXtxXcW+/GvMN3ejANqXkxZ/opySAZMrc+9LY/WyjAan41unrR3YrmtTsUpwT66InQ==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.27.7.tgz",
      "integrity": "sha512-2k8go8Ycu1Kb46vEelhu1vqEP+UeRVj2zY1pSuPdgvbd5ykAw82Lrro28vXUrRmzEsUV0NzCf54yARIK8r0fdw==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.27.7.tgz",
      "integrity": "sha512-hzznmADPt+OmsYzw1EE33ccA+HPdIqiCRq7cQeL1Jlq2gb1+OyWBkMCrYGBJ+sxVzve2ZJEVeePbLM2iEIZSxA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.27.7.tgz",
      "integrity": "sha512-b6pqtrQdigZBwZxAn1UpazEisvwaIDvdbMbmrly7cDTMFnw/+3lVxxCTGOrkPVnsYIosJJXAsILG9XcQS+Yu6w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.27.7.tgz",
      "integrity": "sha512-OfatkLojr6U+WN5EDYuoQhtM+1xco+/6FSzJJnuWiUw5eVcicbyK3dq5EeV/QHT1uy6GoDhGbFpprUiHUYggrw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.27.7.tgz",
      "integrity": "sha512-AFuojMQTxAz75Fo8idVcqoQWEHIXFRbOc1TrVcFSgCZtQfSdc1RXgB3tjOn/krRHENUB4j00bfGjyl2mJrU37A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.27.7.tgz",
      "integrity": "sha512-+A1NJmfM8WNDv5CLVQYJ5PshuRm/4cI6WMZRg1by1GwPIQPCTs1GLEUHwiiQGT5zDdyLiRM/l1G0Pv54gvtKIg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.27.7.tgz",
      "integrity": "sha512-+KrvYb/C8zA9CU/g0sR6w2RBw7IGc5J2BPnc3dYc5VJxHCSF1yNMxTV5LQ7GuKteQXZtspjFbiuW5/dOj7H4Yw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.27.7.tgz",
      "integrity": "sha512-ikktIhFBzQNt/QDyOL580ti9+5mL/YZeUPKU2ivGtGjdTYoqz6jObj6nOMfhASpS4GU4Q/Clh1QtxWAvcYKamA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.27.7.tgz",
      "integrity": "sha512-7yRhbHvPqSpRUV7Q20VuDwbjW5kIMwTHpptuUzV+AA46kiPze5Z7qgt6CLCK3pWFrHeNfDd1VKgyP4O+ng17CA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.27.7.tgz",
      "integrity": "sha512-SmwKXe6VHIyZYbBLJrhOoCJRB/Z1tckzmgTLfFYOfpMAx63BJEaL9ExI8x7v0oAO3Zh6D/Oi1gVxEYr5oUCFhw==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.27.7.tgz",
      "integrity": "sha512-56hiAJPhwQ1R4i+21FVF7V8kSD5zZTdHcVuRFMW0hn753vVfQN8xlx4uOPT4xoGH0Z/oVATuR82AiqSTDIpaHg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@firebase/ai": {
      "version": "2.12.0",
      "resolved": "https://registry.npmjs.org/@firebase/ai/-/ai-2.12.0.tgz",
      "integrity": "sha512-b+OL4vdyiSLZL/7dLd67V55CjKJvU9MpNmwnday7eA6GG2+J4iwUEsEHgw0/jKY3A41FfkF0SrnYFvtKbQZ65A==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check-interop-types": "0.3.4",
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x",
        "@firebase/app-types": "0.x"
      }
    },
    "node_modules/@firebase/analytics": {
      "version": "0.10.22",
      "resolved": "https://registry.npmjs.org/@firebase/analytics/-/analytics-0.10.22.tgz",
      "integrity": "sha512-8BSaq/QRGU1+xyi8L2PTLTJU7MH9aMA72RQdIxrbhWFauOZY9OXo8f2YDN/972xA8d588tlnNVEQ2Mo69pT9Ow==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/installations": "0.6.22",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/analytics-compat": {
      "version": "0.2.28",
      "resolved": "https://registry.npmjs.org/@firebase/analytics-compat/-/analytics-compat-0.2.28.tgz",
      "integrity": "sha512-lIAlqUUbBu93FJMlQfslryQtBwwzdzvp23ePC6FNgymXk6Ook5v4Uvc0vdutvoIeqmyA3LfP0ZeRFK8+11kOOQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/analytics": "0.10.22",
        "@firebase/analytics-types": "0.8.4",
        "@firebase/component": "0.7.3",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/analytics-types": {
      "version": "0.8.4",
      "resolved": "https://registry.npmjs.org/@firebase/analytics-types/-/analytics-types-0.8.4.tgz",
      "integrity": "sha512-zQ+XTgkwH6CY/eUSHJRP7e4LxM30RCxlCmob5sy2axs25GE3Ny0XdgpDscMTHHQIGqWkxPXad4w2Mw9sCgT8zQ==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/app": {
      "version": "0.14.12",
      "resolved": "https://registry.npmjs.org/@firebase/app/-/app-0.14.12.tgz",
      "integrity": "sha512-FT+HoNp1NdaZ/N26hCwV3WbxS1m6gTn3p2QRBQ3KH7YqyCQqJx0iT7126RgVk68/Rq+9DeL/zCFnHZ0C4u1nLQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "idb": "7.1.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/app-check": {
      "version": "0.11.3",
      "resolved": "https://registry.npmjs.org/@firebase/app-check/-/app-check-0.11.3.tgz",
      "integrity": "sha512-aJ4DfubWfTO8/2vhEhIAizOoOmiycESTU32e+OUgbWcS/G3PA4Vxlr/9zaiN2wfUG2AptQ7DTvj00tyuFZP5Bg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/app-check-compat": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@firebase/app-check-compat/-/app-check-compat-0.4.3.tgz",
      "integrity": "sha512-L3AKIRTJxT9b7cDUH3OyV8gWTnmW3vYkwdzRsukWt4kbPBTct12xalnyvHDkm1lKkr+cQq/4uzBx1bOWsQ2ciw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check": "0.11.3",
        "@firebase/app-check-types": "0.5.4",
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/app-check-interop-types": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/@firebase/app-check-interop-types/-/app-check-interop-types-0.3.4.tgz",
      "integrity": "sha512-zz3i6e13B8BfWiLy8MABtTh8aGIACgKbf9UVnyHcWs+yQzJXgQcl8A46b0zfaiJHdQ+niF0ouAfcpuf+3LMPQg==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/app-check-types": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/@firebase/app-check-types/-/app-check-types-0.5.4.tgz",
      "integrity": "sha512-xV7JsIyzVr15aA7f3Pi0rB9gdBuVubs89FGA8VkRYA4g0l78poADgdfrScgf7NndSg9mm7cR7PJyY0+t22KaGw==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/app-compat": {
      "version": "0.5.12",
      "resolved": "https://registry.npmjs.org/@firebase/app-compat/-/app-compat-0.5.12.tgz",
      "integrity": "sha512-Pe513OBerK/CIBxz4/za9atd5MsZtd6DzHz4cmqkvkrcDWhQChAoHBpZ3McuZNuSP8YZiKwfX/J1frR07l15/w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app": "0.14.12",
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/app-types": {
      "version": "0.9.5",
      "resolved": "https://registry.npmjs.org/@firebase/app-types/-/app-types-0.9.5.tgz",
      "integrity": "sha512-YevqTjvo7Iujsa9Dwowmd6dSoElhzmD63ZSrq6bzjvQ6POjYgNjOFHLmNIgJs48eNO093NCERibuFnxbfOvU7A==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/logger": "0.5.1"
      }
    },
    "node_modules/@firebase/auth": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/@firebase/auth/-/auth-1.13.1.tgz",
      "integrity": "sha512-/1nkKY/MicI+I9WWcx6R4NKs77AaW9NQ0IwsFdUBomWrW0/cXEmopfM2dtLm2oI1qG6z6vom3CXZDHJIJXoMuw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x",
        "@react-native-async-storage/async-storage": "^2.2.0 || ^3.0.0"
      },
      "peerDependenciesMeta": {
        "@react-native-async-storage/async-storage": {
          "optional": true
        }
      }
    },
    "node_modules/@firebase/auth-compat": {
      "version": "0.6.6",
      "resolved": "https://registry.npmjs.org/@firebase/auth-compat/-/auth-compat-0.6.6.tgz",
      "integrity": "sha512-KDJ/GAf/rt7galOpn3DRb2buFfGkZCsHTryKjXDG0eeRnok4+2B4nnkMOMdjRnPkElmcJv2Ao0vEA6kp5m98PQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/auth": "1.13.1",
        "@firebase/auth-types": "0.13.1",
        "@firebase/component": "0.7.3",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/auth-interop-types": {
      "version": "0.2.5",
      "resolved": "https://registry.npmjs.org/@firebase/auth-interop-types/-/auth-interop-types-0.2.5.tgz",
      "integrity": "sha512-1Li/YuBDBAXcKv7BzY4U28gontUmAaw53sYiqbaVOMCFb2lFKK/c3CGMUWqtwe7+TXrl3poWnTCL5umYBg85Eg==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/auth-types": {
      "version": "0.13.1",
      "resolved": "https://registry.npmjs.org/@firebase/auth-types/-/auth-types-0.13.1.tgz",
      "integrity": "sha512-0c1Mnid0uMDfGJHeUS4zfvBa4/CedJXotGy/n/NZJnBjwiJawt0ZYU+wH2VAVLiRCEfG2ncCkAX3yd1/2nrB7g==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x",
        "@firebase/util": "1.x"
      }
    },
    "node_modules/@firebase/component": {
      "version": "0.7.3",
      "resolved": "https://registry.npmjs.org/@firebase/component/-/component-0.7.3.tgz",
      "integrity": "sha512-wFofIaa2879ogD/WvkjYXJxRmfnL0scen6ORgaC3na1FNOR9ASIUANQdhqQcmWu/h77/pVHY7ch5flewa5Bcew==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/data-connect": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/@firebase/data-connect/-/data-connect-0.7.0.tgz",
      "integrity": "sha512-ar9sNOJh5poQCSMSVlnVE8eo8+usTD1POWDCv65omkKUvnFMcdXaQ7J/e7WGKqJzcEMgiezSX/TZiKHZkItMbQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/auth-interop-types": "0.2.5",
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/database": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@firebase/database/-/database-1.1.3.tgz",
      "integrity": "sha512-XwWCa+E4TvNGpGwXrycLRNfdogADwFcvuhyow6wDWma9W54roaQIhe+4PM0KiLsIftBdSCGI7OKCXrdSRHbIhw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check-interop-types": "0.3.4",
        "@firebase/auth-interop-types": "0.2.5",
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "faye-websocket": "0.11.4",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/database-compat": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@firebase/database-compat/-/database-compat-2.1.4.tgz",
      "integrity": "sha512-3pK35F1MAgmqFJQlf2nhQl44vtAXQO1uaCaQOEUI9kCRtLFqi7N+QRKR7lFZPg+xIZIyubgxQaxY69YgfZRZWg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/database": "1.1.3",
        "@firebase/database-types": "1.0.20",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/database-types": {
      "version": "1.0.20",
      "resolved": "https://registry.npmjs.org/@firebase/database-types/-/database-types-1.0.20.tgz",
      "integrity": "sha512-kegbOk/w8iU64pr0q6k2ItyNGjnQBMHFhwS7ohdWI4W+pc0/zhhdGXTdFj6X1oxItRjPoYOsSQmERgBkn/ihxw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-types": "0.9.5",
        "@firebase/util": "1.15.1"
      }
    },
    "node_modules/@firebase/firestore": {
      "version": "4.14.1",
      "resolved": "https://registry.npmjs.org/@firebase/firestore/-/firestore-4.14.1.tgz",
      "integrity": "sha512-PouS0NJZ3NYOZE/tPDvXa8VUeJ10Ll//7jIdFvMYdhQkd/P3O7nlqhyoTmY0h8Xa9hxg+H0j6gxUytJcoZ9YOg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "@firebase/webchannel-wrapper": "1.0.6",
        "@grpc/grpc-js": "~1.9.0",
        "@grpc/proto-loader": "^0.7.8",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/firestore-compat": {
      "version": "0.4.9",
      "resolved": "https://registry.npmjs.org/@firebase/firestore-compat/-/firestore-compat-0.4.9.tgz",
      "integrity": "sha512-NPtBuFr79BbIQJXFWhW4xFC6rBksK8/ewqCTYbbAYfZBDDx0/iHTUj4WpKi5D4d0Pn2Md/3T/e5V9379G5N/Zg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/firestore": "4.14.1",
        "@firebase/firestore-types": "3.0.4",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/firestore-types": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@firebase/firestore-types/-/firestore-types-3.0.4.tgz",
      "integrity": "sha512-jGn+JSS4X9zZsrfu7Yw66v5YRdOLD1oyQh4USR0xWl4CUqV/DA6bNIXRPpxH/cUl3iVTNiP6MN7g+EL42A4qfA==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x",
        "@firebase/util": "1.x"
      }
    },
    "node_modules/@firebase/functions": {
      "version": "0.13.4",
      "resolved": "https://registry.npmjs.org/@firebase/functions/-/functions-0.13.4.tgz",
      "integrity": "sha512-oB5rpm2Emxn2+IS1gRelAeT/5tSZMwM/KhqC5LnJsmTNnS1ZDhD7ZMZNgCI8vchTW6PbaXIwEnpUryGuIQsNbg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-check-interop-types": "0.3.4",
        "@firebase/auth-interop-types": "0.2.5",
        "@firebase/component": "0.7.3",
        "@firebase/messaging-interop-types": "0.2.4",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/functions-compat": {
      "version": "0.4.4",
      "resolved": "https://registry.npmjs.org/@firebase/functions-compat/-/functions-compat-0.4.4.tgz",
      "integrity": "sha512-Be+MwhseVf/eFAZwGrFJGok6S7cmsLrAPK8MgyM8LjM0MewTsx2n01WOOca9jio1UsCZOJ0aVyQobnINcdNuIQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/functions": "0.13.4",
        "@firebase/functions-types": "0.6.4",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/functions-types": {
      "version": "0.6.4",
      "resolved": "https://registry.npmjs.org/@firebase/functions-types/-/functions-types-0.6.4.tgz",
      "integrity": "sha512-zV6kgqtduR4rUAdC/ilS7kmb93XD7bEZoJDlVBZqlOw2uGGGCNBQBuleww2rr0Ulr3L9o2TDjumEt68/l1f9DQ==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/installations": {
      "version": "0.6.22",
      "resolved": "https://registry.npmjs.org/@firebase/installations/-/installations-0.6.22.tgz",
      "integrity": "sha512-ef6nn3GGQTdReCfotRMG77PJZu8CqEbiK5pEoBnM0gTu/Z9v0i/az2p3HABsa/1beQmmyh1OsOjf7P5+pgwdZw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/util": "1.15.1",
        "idb": "7.1.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/installations-compat": {
      "version": "0.2.22",
      "resolved": "https://registry.npmjs.org/@firebase/installations-compat/-/installations-compat-0.2.22.tgz",
      "integrity": "sha512-C/zpAuTP5S9OgKSPvXRupw3hoY/JZSlA1wFjD/Sb7LIQE0FNbcMdO8Y4KXVEkjVzma/DDDDIAzxEXqKMAzc88w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/installations": "0.6.22",
        "@firebase/installations-types": "0.5.4",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/installations-types": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/@firebase/installations-types/-/installations-types-0.5.4.tgz",
      "integrity": "sha512-U2eFapdHwjb43Vx9o+Pmj4dFfvcHEK1IirEFLqMtWrTHvmdrS3gBpBD1kmJk/9HjsOtoHZxJ2Paoe79e+L1ZPg==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x"
      }
    },
    "node_modules/@firebase/logger": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/@firebase/logger/-/logger-0.5.1.tgz",
      "integrity": "sha512-vZKLsqE1ABOy8OjQiE7cUTFn4gvaqlk88yp8N94Pk/sDpq61YqZGqmVFZTvOyflTwuYFcWirBdYGoJgbDaXKYQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/messaging": {
      "version": "0.12.26",
      "resolved": "https://registry.npmjs.org/@firebase/messaging/-/messaging-0.12.26.tgz",
      "integrity": "sha512-lHVTO9uLofymHVWkYeUtMddIPcmJvSzVbHRB88W6XKfxbcKF+p3QrfqKhDxremSB4NQjUla1Gwn7d9umSMmt/w==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/installations": "0.6.22",
        "@firebase/messaging-interop-types": "0.2.4",
        "@firebase/util": "1.15.1",
        "idb": "7.1.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/messaging-compat": {
      "version": "0.2.26",
      "resolved": "https://registry.npmjs.org/@firebase/messaging-compat/-/messaging-compat-0.2.26.tgz",
      "integrity": "sha512-fn0XvWOfK4tsDLSipwJUW9Cp6ahWA6z+iJHxZ0pHp9MzMSUNQx85yuxZAuI7gkGXfqs7+DqEDHyyS7jDGswrmQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/messaging": "0.12.26",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/messaging-interop-types": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/@firebase/messaging-interop-types/-/messaging-interop-types-0.2.4.tgz",
      "integrity": "sha512-wrzITQq+xw5LtygX7O0fu43/k9ABQ4x5H9/sR5m1SbNnhIRI5xd3+raSNJaJkYC4BUhM9A4ZNSnyR2sjhxnb2Q==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/performance": {
      "version": "0.7.12",
      "resolved": "https://registry.npmjs.org/@firebase/performance/-/performance-0.7.12.tgz",
      "integrity": "sha512-fe7nV8teUU3OBHlMUZ9Lw4gLhCW2k4m5Uc3pfWGV+fl8uwJQBGp9Q3lqsJ+HSrFu3Q2pJyLAgrClPGSKyDeYgQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/installations": "0.6.22",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0",
        "web-vitals": "^4.2.4"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/performance-compat": {
      "version": "0.2.25",
      "resolved": "https://registry.npmjs.org/@firebase/performance-compat/-/performance-compat-0.2.25.tgz",
      "integrity": "sha512-q6NjTXpIPoFuUmCmMN/maCdTgzT6aExs9xZo+PxfVLj6uLVGvpyAD6XWjmcrb7jChsFBYbq7E5dyNDF7Zhy9kA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/performance": "0.7.12",
        "@firebase/performance-types": "0.2.4",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/performance-types": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/@firebase/performance-types/-/performance-types-0.2.4.tgz",
      "integrity": "sha512-kJSEk7b0uhpcPRyL4SQ/GPujLqk52XNKcXlnsKDbWGAb9vugcLvOU3u6zfEdwd+d8hWJb5S5ZizV1JFFI0nkKg==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/remote-config": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/@firebase/remote-config/-/remote-config-0.8.3.tgz",
      "integrity": "sha512-ggGKAaLy9YNOvpFoQZgm5p5SiFw3ZFtwti08dojnBQmQicpThTxvG5xZMSpCTYMj2o3gM/yK9CVd2w+kZub8YA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/installations": "0.6.22",
        "@firebase/logger": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/remote-config-compat": {
      "version": "0.2.24",
      "resolved": "https://registry.npmjs.org/@firebase/remote-config-compat/-/remote-config-compat-0.2.24.tgz",
      "integrity": "sha512-EWZTt6fJ7YmPHodQNsSxAIDZY2x8P5kRPvXAc5CmzzBm+NyPFhODbfDsNllDXDL8jlzp50bVWjDY+BXepZS9Mg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/logger": "0.5.1",
        "@firebase/remote-config": "0.8.3",
        "@firebase/remote-config-types": "0.5.1",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/remote-config-types": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/@firebase/remote-config-types/-/remote-config-types-0.5.1.tgz",
      "integrity": "sha512-cX/1LT6KQwkXzck2eSzeKnuvXZCyr8qaPpDcikoJs7jmI+oBOXixpDLeDtWj1U6GNMkIoXrEDNoyT2Ypcyp5/A==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/storage": {
      "version": "0.14.3",
      "resolved": "https://registry.npmjs.org/@firebase/storage/-/storage-0.14.3.tgz",
      "integrity": "sha512-YX4/YL6P6/fufSSeGnVhjWddcIXbFq2cWIhMKFTZo1E/Rtcl2mJj/BYUQTwJfcE1Tl8un1FOya4L05jcSLN/Eg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app": "0.x"
      }
    },
    "node_modules/@firebase/storage-compat": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@firebase/storage-compat/-/storage-compat-0.4.3.tgz",
      "integrity": "sha512-gruVqjtUGX8tEoeNbaWXZm0Zfcfcb7fvmDmBxV8yPAbWvExRnZYLO2+qw9idxNE7BvPXt5csyjSYHy//dAizxw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.7.3",
        "@firebase/storage": "0.14.3",
        "@firebase/storage-types": "0.8.4",
        "@firebase/util": "1.15.1",
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@firebase/app-compat": "0.x"
      }
    },
    "node_modules/@firebase/storage-types": {
      "version": "0.8.4",
      "resolved": "https://registry.npmjs.org/@firebase/storage-types/-/storage-types-0.8.4.tgz",
      "integrity": "sha512-BT7cwxJOx8SWwlQfrlC+bD/Sk3Cw+1odCi8UZNFNWTVZoPsBnA5W+mqtZzVnvsdJpXCFGSGQ7R7vOR6dtM/BRA==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "@firebase/app-types": "0.x",
        "@firebase/util": "1.x"
      }
    },
    "node_modules/@firebase/util": {
      "version": "1.15.1",
      "resolved": "https://registry.npmjs.org/@firebase/util/-/util-1.15.1.tgz",
      "integrity": "sha512-LUdM4Wg7YM9Pq/49nGYySJA0CSQEKnGffFzWV8+6gXN7mGxn+FL1IqvFbuZUtAQcfZgHYDwCE1wwlK7rB7gl2g==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@firebase/webchannel-wrapper": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/@firebase/webchannel-wrapper/-/webchannel-wrapper-1.0.6.tgz",
      "integrity": "sha512-Vr/Mqu79dMwGRAyGbJ4uN4+BtXB3/mRTdzetD1daWNeG8QaWuzhhbG77GltO5c0yYmYls8i250iX73624GJd7Q==",
      "license": "Apache-2.0"
    },
    "node_modules/@google/genai": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/@google/genai/-/genai-1.52.0.tgz",
      "integrity": "sha512-gwSvbpiN/17O9TbsqSsE/OzZcpv5Fo4RQjdngGgogtuB9RsyJ8ZHhX5KjHj1bp5N9snN2eK8LDGXSaWW2hof8Q==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "google-auth-library": "^10.3.0",
        "p-retry": "^4.6.2",
        "protobufjs": "^7.5.4",
        "ws": "^8.18.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@modelcontextprotocol/sdk": "^1.25.2"
      },
      "peerDependenciesMeta": {
        "@modelcontextprotocol/sdk": {
          "optional": true
        }
      }
    },
    "node_modules/@grpc/grpc-js": {
      "version": "1.9.15",
      "resolved": "https://registry.npmjs.org/@grpc/grpc-js/-/grpc-js-1.9.15.tgz",
      "integrity": "sha512-nqE7Hc0AzI+euzUwDAy0aY5hCp10r734gMGRdU+qOPX0XSceI2ULrcXB5U2xSc5VkWwalCj4M7GzCAygZl2KoQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@grpc/proto-loader": "^0.7.8",
        "@types/node": ">=12.12.47"
      },
      "engines": {
        "node": "^8.13.0 || >=10.10.0"
      }
    },
    "node_modules/@grpc/proto-loader": {
      "version": "0.7.15",
      "resolved": "https://registry.npmjs.org/@grpc/proto-loader/-/proto-loader-0.7.15.tgz",
      "integrity": "sha512-tMXdRCfYVixjuFK+Hk0Q1s38gV9zDiDJfWL3h1rv4Qc39oILCu1TRTDt7+fGUI8K4G1Fj125Hx/ru3azECWTyQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "lodash.camelcase": "^4.3.0",
        "long": "^5.0.0",
        "protobufjs": "^7.2.5",
        "yargs": "^17.7.2"
      },
      "bin": {
        "proto-loader-gen-types": "build/bin/proto-loader-gen-types.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@protobufjs/aspromise": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/aspromise/-/aspromise-1.1.2.tgz",
      "integrity": "sha512-j+gKExEuLmKwvz3OgROXtrJ2UG2x8Ch2YZUxahh+s1F2HZ+wAceUNLkvy6zKCPVRkU++ZWQrdxsUeQXmcg4uoQ==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/base64": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/base64/-/base64-1.1.2.tgz",
      "integrity": "sha512-AZkcAA5vnN/v4PDqKyMR5lx7hZttPDgClv83E//FMNhR2TMcLUhfRUBHCmSl0oi9zMgDDqRUJkSxO3wm85+XLg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/codegen": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@protobufjs/codegen/-/codegen-2.0.5.tgz",
      "integrity": "sha512-zgXFLzW3Ap33e6d0Wlj4MGIm6Ce8O89n/apUaGNB/jx+hw+ruWEp7EwGUshdLKVRCxZW12fp9r40E1mQrf/34g==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/eventemitter": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/eventemitter/-/eventemitter-1.1.0.tgz",
      "integrity": "sha512-j9ednRT81vYJ9OfVuXG6ERSTdEL1xVsNgqpkxMsbIabzSo3goCjDIveeGv5d03om39ML71RdmrGNjG5SReBP/Q==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/fetch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/fetch/-/fetch-1.1.0.tgz",
      "integrity": "sha512-lljVXpqXebpsijW71PZaCYeIcE5on1w5DlQy5WH6GLbFryLUrBD4932W/E2BSpfRJWseIL4v/KPgBFxDOIdKpQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@protobufjs/aspromise": "^1.1.1",
        "@protobufjs/inquire": "^1.1.0"
      }
    },
    "node_modules/@protobufjs/float": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/float/-/float-1.0.2.tgz",
      "integrity": "sha512-Ddb+kVXlXst9d+R9PfTIxh1EdNkgoRe5tOX6t01f1lYWOvJnSPDBlG241QLzcyPdoNTsblLUdujGSE4RzrTZGQ==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/inquire": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@protobufjs/inquire/-/inquire-1.1.1.tgz",
      "integrity": "sha512-mnzgDV26ueAvk7rsbt9L7bE0SuAoqyuys/sMMrmVcN5x9VsxpcG3rqAUSgDyLp0UZlmNfIbQ4fHfCtreVBk8Ew==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/path": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/path/-/path-1.1.2.tgz",
      "integrity": "sha512-6JOcJ5Tm08dOHAbdR3GrvP+yUUfkjG5ePsHYczMFLq3ZmMkAD98cDgcT2iA1lJ9NVwFd4tH/iSSoe44YWkltEA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/pool": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/pool/-/pool-1.1.0.tgz",
      "integrity": "sha512-0kELaGSIDBKvcgS4zkjz1PeddatrjYcmMWOlAuAPwAeccUrPHdUqo/J6LiymHHEiJT5NrF1UVwxY14f+fy4WQw==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@protobufjs/utf8": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@protobufjs/utf8/-/utf8-1.1.1.tgz",
      "integrity": "sha512-oOAWABowe8EAbMyWKM0tYDKi8Yaox52D+HWZhAIJqQXbqe0xI/GV7FhLWqlEKreMkfDjshR5FKgi3mnle0h6Eg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@reduxjs/toolkit": {
      "version": "2.11.2",
      "resolved": "https://registry.npmjs.org/@reduxjs/toolkit/-/toolkit-2.11.2.tgz",
      "integrity": "sha512-Kd6kAHTA6/nUpp8mySPqj3en3dm0tdMIgbttnQ1xFMVpufoj+ADi8pXLBsd4xzTRHQa7t/Jv8W5UnCuW4kuWMQ==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/spec": "^1.0.0",
        "@standard-schema/utils": "^0.3.0",
        "immer": "^11.0.0",
        "redux": "^5.0.1",
        "redux-thunk": "^3.1.0",
        "reselect": "^5.1.0"
      },
      "peerDependencies": {
        "react": "^16.9.0 || ^17.0.0 || ^18 || ^19",
        "react-redux": "^7.2.1 || ^8.1.3 || ^9.0.0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-redux": {
          "optional": true
        }
      }
    },
    "node_modules/@reduxjs/toolkit/node_modules/immer": {
      "version": "11.1.8",
      "resolved": "https://registry.npmjs.org/immer/-/immer-11.1.8.tgz",
      "integrity": "sha512-/tbkHMW7y10Lx6i1crLjD4/OhNkRG+Fo7byZHtah0547nIeXYcpIXaUh0IAQY6gO5459qpGGYapcEOHtFXkIuA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/immer"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.3",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.3.tgz",
      "integrity": "sha512-eybk3TjzzzV97Dlj5c+XrBFW57eTNhzod66y9HrBlzJ6NsCrWCp/2kaPS3K9wJmurBC0Tdw4yPjXKZqlznim3Q==",
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.60.3.tgz",
      "integrity": "sha512-x35CNW/ANXG3hE/EZpRU8MXX1JDN86hBb2wMGAtltkz7pc6cxgjpy1OMMfDosOQ+2hWqIkag/fGok1Yady9nGw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.60.3.tgz",
      "integrity": "sha512-xw3xtkDApIOGayehp2+Rz4zimfkaX65r4t47iy+ymQB2G4iJCBBfj0ogVg5jpvjpn8UWn/+q9tprxleYeNp3Hw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.60.3.tgz",
      "integrity": "sha512-vo6Y5Qfpx7/5EaamIwi0WqW2+zfiusVihKatLvtN1VFVy3D13uERk/6gZLU1UiHRL6fDXqj/ELIeVRGnvcTE1g==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.60.3.tgz",
      "integrity": "sha512-D+0QGcZhBzTN82weOnsSlY7V7+RMmPuF1CkbxyMAGE8+ZHeUjyb76ZiWmBlCu//AQQONvxcqRbwZTajZKqjuOw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.60.3.tgz",
      "integrity": "sha512-6HnvHCT7fDyj6R0Ph7A6x8dQS/S38MClRWeDLqc0MdfWkxjiu1HSDYrdPhqSILzjTIC/pnXbbJbo+ft+gy/9hQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.60.3.tgz",
      "integrity": "sha512-KHLgC3WKlUYW3ShFKnnosZDOJ0xjg9zp7au3sIm2bs/tGBeC2ipmvRh/N7JKi0t9Ue20C0dpEshi8WUubg+cnA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.60.3.tgz",
      "integrity": "sha512-DV6fJoxEYWJOvaZIsok7KrYl0tPvga5OZ2yvKHNNYyk/2roMLqQAbGhr78EQ5YhHpnhLKJD3S1WFusAkmUuV5g==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.60.3.tgz",
      "integrity": "sha512-mQKoJAzvuOs6F+TZybQO4GOTSMUu7v0WdxEk24krQ/uUxXoPTtHjuaUuPmFhtBcM4K0ons8nrE3JyhTuCFtT/w==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.60.3.tgz",
      "integrity": "sha512-Whjj2qoiJ6+OOJMGptTYazaJvjOJm+iKHpXQM1P3LzGjt7Ff++Tp7nH4N8J/BUA7R9IHfDyx4DJIflifwnbmIA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.60.3.tgz",
      "integrity": "sha512-4YTNHKqGng5+yiZt3mg77nmyuCfmNfX4fPmyUapBcIk+BdwSwmCWGXOUxhXbBEkFHtoN5boLj/5NON+u5QC9tg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.60.3.tgz",
      "integrity": "sha512-SU3kNlhkpI4UqlUc2VXPGK9o886ZsSeGfMAX2ba2b8DKmMXq4AL7KUrkSWVbb7koVqx41Yczx6dx5PNargIrEA==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.60.3.tgz",
      "integrity": "sha512-6lDLl5h4TXpB1mTf2rQWnAk/LcXrx9vBfu/DT5TIPhvMhRWaZ5MxkIc8u4lJAmBo6klTe1ywXIUHFjylW505sg==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.60.3.tgz",
      "integrity": "sha512-BMo8bOw8evlup/8G+cj5xWtPyp93xPdyoSN16Zy90Q2QZ0ZYRhCt6ZJSwbrRzG9HApFabjwj2p25TUPDWrhzqQ==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.60.3.tgz",
      "integrity": "sha512-E0L8X1dZN1/Rph+5VPF6Xj2G7JJvMACVXtamTJIDrVI44Y3K+G8gQaMEAavbqCGTa16InptiVrX6eM6pmJ+7qA==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.60.3.tgz",
      "integrity": "sha512-oZJ/WHaVfHUiRAtmTAeo3DcevNsVvH8mbvodjZy7D5QKvCefO371SiKRpxoDcCxB3PTRTLayWBkvmDQKTcX/sw==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.60.3.tgz",
      "integrity": "sha512-Dhbyh7j9FybM3YaTgaHmVALwA8AkUwTPccyCQ79TG9AJUsMQqgN1DDEZNr4+QUfwiWvLDumW5vdwzoeUF+TNxQ==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.60.3.tgz",
      "integrity": "sha512-cJd1X5XhHHlltkaypz1UcWLA8AcoIi1aWhsvaWDskD1oz2eKCypnqvTQ8ykMNI0RSmm7NkTdSqSSD7zM0xa6Ig==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.60.3.tgz",
      "integrity": "sha512-DAZDBHQfG2oQuhY7mc6I3/qB4LU2fQCjRvxbDwd/Jdvb9fypP4IJ4qmtu6lNjes6B531AI8cg1aKC2di97bUxA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.60.3.tgz",
      "integrity": "sha512-cRxsE8c13mZOh3vP+wLDxpQBRrOHDIGOWyDL93Sy0Ga8y515fBcC2pjUfFwUe5T7tqvTvWbCpg1URM/AXdWIXA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.60.3.tgz",
      "integrity": "sha512-QaWcIgRxqEdQdhJqW4DJctsH6HCmo5vHxY0krHSX4jMtOqfzC+dqDGuHM87bu4H8JBeibWx7jFz+h6/4C8wA5Q==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.60.3.tgz",
      "integrity": "sha512-AaXwSvUi3QIPtroAUw1t5yHGIyqKEXwH54WUocFolZhpGDruJcs8c+xPNDRn4XiQsS7MEwnYsHW2l0MBLDMkWg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.60.3.tgz",
      "integrity": "sha512-65LAKM/bAWDqKNEelHlcHvm2V+Vfb8C6INFxQXRHCvaVN1rJfwr4NvdP4FyzUaLqWfaCGaadf6UbTm8xJeYfEg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.60.3.tgz",
      "integrity": "sha512-EEM2gyhBF5MFnI6vMKdX1LAosE627RGBzIoGMdLloPZkXrUN0Ckqgr2Qi8+J3zip/8NVVro3/FjB+tjhZUgUHA==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.60.3.tgz",
      "integrity": "sha512-E5Eb5H/DpxaoXH++Qkv28RcUJboMopmdDUALBczvHMf7hNIxaDZqwY5lK12UK1BHacSmvupoEWGu+n993Z0y1A==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.60.3.tgz",
      "integrity": "sha512-hPt/bgL5cE+Qp+/TPHBqptcAgPzgj46mPcg/16zNUmbQk0j+mOEQV/+Lqu8QRtDV3Ek95Q6FeFITpuhl6OTsAA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@standard-schema/spec": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
      "integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/utils": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/utils/-/utils-0.3.0.tgz",
      "integrity": "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g==",
      "license": "MIT"
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.0.tgz",
      "integrity": "sha512-aFb4gUhFOgdh9AXo4IzBEOzBkkAxm9VigwDJnMIYv3lcfXCJVesNfbEaBl4BNgVRyid92AmdviqwBUBRKSeY3g==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.21.0",
        "jiti": "^2.6.1",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.0"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.0.tgz",
      "integrity": "sha512-F7HZGBeN9I0/AuuJS5PwcD8xayx5ri5GhjYUDBEVYUkexyA/giwbDNjRVrxSezE3T250OU2K/wp/ltWx3UOefg==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.0",
        "@tailwindcss/oxide-darwin-arm64": "4.3.0",
        "@tailwindcss/oxide-darwin-x64": "4.3.0",
        "@tailwindcss/oxide-freebsd-x64": "4.3.0",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.0",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.0",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.0",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.0",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.0",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.0",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.0",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.0"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.0.tgz",
      "integrity": "sha512-TJPiq67tKlLuObP6RkwvVGDoxCMBVtDgKkLfa/uyj7/FyxvQwHS+UOnVrXXgbEsfUaMgiVvC4KbJnRr26ho4Ng==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.0.tgz",
      "integrity": "sha512-oMN/WZRb+SO37BmUElEgeEWuU8E/HXRkiODxJxLe1UTHVXLrdVSgfaJV7pSlhRGMSOiXLuxTIjfsF3wYvz8cgQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.0.tgz",
      "integrity": "sha512-N6CUmu4a6bKVADfw77p+iw6Yd9Q3OBhe0veaDX+QazfuVYlQsHfDgxBrsjQ/IW+zywL8mTrNd0SdJT/zgtvMdA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.0.tgz",
      "integrity": "sha512-zDL5hBkQdH5C6MpqbK3gQAgP80tsMwSI26vjOzjJtNCMUo0lFgOItzHKBIupOZNQxt3ouPH7RPhvNhiTfCe5CQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.0.tgz",
      "integrity": "sha512-R06HdNi7A7OEoMsf6d4tjZ71RCWnZQPHj2mnotSFURjNLdBC+cIgXQ7l81CqeoiQftjf6OOblxXMInMgN2VzMA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.0.tgz",
      "integrity": "sha512-qTJHELX8jetjhRQHCLilkVLmybpzNQAtaI/gaoVoidn/ufbNDbAo8KlK2J+yPoc8wQxvDxCmh/5lr8nC1+lTbg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.0.tgz",
      "integrity": "sha512-Z6sukiQsngnWO+l39X4pPbiWT81IC+PLKF+PHxIlyZbGNb9MODfYlXEVlFvej5BOZInWX01kVyzeLvHsXhfczQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.0.tgz",
      "integrity": "sha512-DRNdQRpSGzRGfARVuVkxvM8Q12nh19l4BF/G7zGA1oe+9wcC6saFBHTISrpIcKzhiXtSrlSrluCfvMuledoCTQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.0.tgz",
      "integrity": "sha512-Z0IADbDo8bh6I7h2IQMx601AdXBLfFpEdUotft86evd/8ZPflZe9COPO8Q1vw+pfLWIUo9zN/JGZvwuAJqduqg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.0.tgz",
      "integrity": "sha512-HNZGOUxEmElksYR7S6sC5jTeNGpobAsy9u7Gu0AskJ8/20FR9GqebUyB+HBcU/ax6BHuiuJi+Oda4B+YX6H1yA==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.10.0",
        "@emnapi/runtime": "^1.10.0",
        "@emnapi/wasi-threads": "^1.2.1",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.1",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.0.tgz",
      "integrity": "sha512-Pe+RPVTi1T+qymuuRpcdvwSVZjnll/f7n8gBxMMh3xLTctMDKqpdfGimbMyioqtLhUYZxdJ9wGNhV7MKHvgZsQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.0.tgz",
      "integrity": "sha512-Mvrf2kXW/yeW/OTezZlCGOirXRcUuLIBx/5Y12BaPM7wJoryG6dfS/NJL8aBPqtTEx/Vm4T4vKzFUcKDT+TKUA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.3.0.tgz",
      "integrity": "sha512-t6J3OrB5Fc0ExuhohouH0fWUGMYL6PTLhW+E7zIk/pdbnJARZDCwjBznFnkh5ynRnIRSI4YjtTH0t6USjJISrw==",
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.3.0",
        "@tailwindcss/oxide": "4.3.0",
        "tailwindcss": "4.3.0"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7 || ^8"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.1.8",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.1.8.tgz",
      "integrity": "sha512-lae0iWfcDeR7qt7rA88BNiqdvPS5pFVPpo5OfjElwNaT2yyekbM0C9vK+yqBqEmHr6lDkRnYNoTBYlAgJa7a4w==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "license": "MIT"
    },
    "node_modules/@types/express": {
      "version": "4.17.25",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.25.tgz",
      "integrity": "sha512-dVd04UKsfpINUnK0yBoYHDF3xu7xVH4BuDotC/xGuycx4CgbP48X/KF/586bcObxT0HENHXEU8Nqtu6NR+eKhw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^4.17.33",
        "@types/qs": "*",
        "@types/serve-static": "^1"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "4.19.8",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.19.8.tgz",
      "integrity": "sha512-02S5fmqeoKzVZCHPZid4b8JH2eM5HzQLZWN2FohQEy/0eXTq8VXZfSN6Pcr3F6N9R/vNrj7cpgbhjie6m/1tCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/mime": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.5.tgz",
      "integrity": "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "22.19.18",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-22.19.18.tgz",
      "integrity": "sha512-9v00a+dn2yWVsYDEunWC4g/TcRKVq3r8N5FuZp7u0SGrPvdN9c2yXI9bBuf5Fl0hNCb+QTIePTn5pJs2pwBOQQ==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.15.1",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.15.1.tgz",
      "integrity": "sha512-GZHUBZR9hckSUhrxmp1nG6NwdpM9fCunJwyThLW1X3AyHgd9IlHb6VANpQQqDr2o/qQp6McZ3y/IA2rVzKzSbw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/retry": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/@types/retry/-/retry-0.12.0.tgz",
      "integrity": "sha512-wWKOClTTiizcZhXnPY4wikVAwmdYHp8q6DmC+EJUzAMsycb7HB32Kh9RN4+0gExjmPmZSAQjgURXIGATPegAvA==",
      "license": "MIT"
    },
    "node_modules/@types/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
      "integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "1.15.10",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.10.tgz",
      "integrity": "sha512-tRs1dB+g8Itk72rlSI2ZrW6vZg0YrLI81iQSTkMmOqnqCaNr/8Ek4VwWcN5vZgCYWbg/JJSGBlUaYGAOP73qBw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*",
        "@types/send": "<1"
      }
    },
    "node_modules/@types/serve-static/node_modules/@types/send": {
      "version": "0.17.6",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.6.tgz",
      "integrity": "sha512-Uqt8rPBE8SY0RK8JB1EzVOIZ32uqy8HwdxCnoCOsYrvnswqmFZ/k+9Ikidlk/ImhsdvBsloHbAlewb2IEBV/Og==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/mime": "^1",
        "@types/node": "*"
      }
    },
    "node_modules/@types/use-sync-external-store": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/@types/use-sync-external-store/-/use-sync-external-store-0.0.6.tgz",
      "integrity": "sha512-zFDAD+tlpf2r4asuHEj0XH6pY6i0g5NeAHPn+15wk3BV6JA69eERFXC1gyGThDkVa1zCyKr5jox1+2LbV/AMLg==",
      "license": "MIT"
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-5.2.0.tgz",
      "integrity": "sha512-YmKkfhOAi3wsB1PhJq5Scj3GXMn3WvtQ/JC0xoopuHoXSdmtdStOpFrYaT1kie2YgFBcIe64ROzMYRjCrYOdYw==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.29.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-rc.3",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.18.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/agent-base": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.4.tgz",
      "integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.5.0",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.0.tgz",
      "integrity": "sha512-FMhOoZV4+qR6aTUALKX2rEqGG+oyATvwBt9IIzVR5rMa2HRWPkxf+P+PAJLD1I/H5/II+HuZcBJYEFBpq39ong==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.2",
        "caniuse-lite": "^1.0.30001787",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.29",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.29.tgz",
      "integrity": "sha512-Asa2krT+XTPZINCS+2QcyS8WTkObE77RwkydwF7h6DmnKqbvlalz93m/dnphUyCa6SWSP51VgtEUf2FN+gelFQ==",
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/bignumber.js": {
      "version": "9.3.1",
      "resolved": "https://registry.npmjs.org/bignumber.js/-/bignumber.js-9.3.1.tgz",
      "integrity": "sha512-Ko0uX15oIUS7wJ3Rb30Fs6SkVbLmPBAKdlm7q9+ak9bbIeFf0MwuBsQV6z7+X768/cHsfg+WlysDWJcmthjsjQ==",
      "license": "MIT",
      "engines": {
        "node": "*"
      }
    },
    "node_modules/body-parser": {
      "version": "1.20.5",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.5.tgz",
      "integrity": "sha512-3grm+/2tUOvu2cjJkvsIxrv/wVpfXQW4PsQHYm7yk4vfpu7Ekl6nEsYBoJUL6qDwZUx8wUhQ8tR2qz+ad9c9OA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "content-type": "~1.0.5",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "~1.2.0",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "on-finished": "~2.4.1",
        "qs": "~6.15.1",
        "raw-body": "~2.5.3",
        "type-is": "~1.6.18",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/body-parser/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/body-parser/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/body-parser/node_modules/qs": {
      "version": "6.15.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.15.1.tgz",
      "integrity": "sha512-6YHEFRL9mfgcAvql/XhwTvf5jKcOiiupt2FiJxHkiX1z4j7WL8J/jRHYLluORvc1XxB5rV20KoeK00gVJamspg==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001792",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001792.tgz",
      "integrity": "sha512-hVLMUZFgR4JJ6ACt1uEESvQN1/dBVqPAKY0hgrV70eN3391K6juAfTjKZLKvOMsx8PxA7gsY1/tLMMTcfFLLpw==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/content-disposition": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
      "integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/data-uri-to-buffer": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/data-uri-to-buffer/-/data-uri-to-buffer-4.0.1.tgz",
      "integrity": "sha512-0R9ikRb668HB7QDxT1vkpuUBtqc53YyAwMwGeUFKRojY/NWKvdZ+9UYtRfGmhqNbRkTSVpMbmyhXipFFv2cb/A==",
      "license": "MIT",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/date-fns": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-4.1.0.tgz",
      "integrity": "sha512-Ukq0owbQXxa/U3EGtsdVBkR1w7KOQ5gIBqdH2hkvknzZPYvBxb/aa6E8L7tmjFtkwZBu3UXBbjIgPo/Ez4xaNg==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/kossnocorp"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/destroy": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dotenv": {
      "version": "17.4.2",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-17.4.2.tgz",
      "integrity": "sha512-nI4U3TottKAcAD9LLud4Cb7b2QztQMUEfHbvhTH09bqXTxnSie8WnjPALV/WMCrJZ6UV/qHJ6L03OqO3LcdYZw==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.353",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.353.tgz",
      "integrity": "sha512-kOrWphBi8TOZyiJZqsgqIle0lw+tzmnQK83pV9dZUd01Nm2POECSyFQMAuarzZdYqQW7FH9RaYOuaRo3h+bQ3w==",
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.21.2",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.21.2.tgz",
      "integrity": "sha512-xe9vQb5kReirPUxgQrXA3ihgbCqssmTiM7cOZ+Gzu+VeGWgpV98lLZvp0dl4yriyAePcewxGUs9UpKD8PET9KQ==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-toolkit": {
      "version": "1.46.1",
      "resolved": "https://registry.npmjs.org/es-toolkit/-/es-toolkit-1.46.1.tgz",
      "integrity": "sha512-5eNtXOs3tbfxXOj04tjjseeWkRWaoCjdEI+96DgwzZoe6c9juL49pXlzAFTI72aWC9Y8p7168g6XIKjh7k6pyQ==",
      "license": "MIT",
      "workspaces": [
        "docs",
        "benchmarks"
      ]
    },
    "node_modules/esbuild": {
      "version": "0.27.7",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.27.7.tgz",
      "integrity": "sha512-IxpibTjyVnmrIQo5aqNpCgoACA/dTKLTlhMHihVHhdkxKyPO1uBBthumT0rdHmcsk9uMonIWS0m4FljWzILh3w==",
      "devOptional": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.27.7",
        "@esbuild/android-arm": "0.27.7",
        "@esbuild/android-arm64": "0.27.7",
        "@esbuild/android-x64": "0.27.7",
        "@esbuild/darwin-arm64": "0.27.7",
        "@esbuild/darwin-x64": "0.27.7",
        "@esbuild/freebsd-arm64": "0.27.7",
        "@esbuild/freebsd-x64": "0.27.7",
        "@esbuild/linux-arm": "0.27.7",
        "@esbuild/linux-arm64": "0.27.7",
        "@esbuild/linux-ia32": "0.27.7",
        "@esbuild/linux-loong64": "0.27.7",
        "@esbuild/linux-mips64el": "0.27.7",
        "@esbuild/linux-ppc64": "0.27.7",
        "@esbuild/linux-riscv64": "0.27.7",
        "@esbuild/linux-s390x": "0.27.7",
        "@esbuild/linux-x64": "0.27.7",
        "@esbuild/netbsd-arm64": "0.27.7",
        "@esbuild/netbsd-x64": "0.27.7",
        "@esbuild/openbsd-arm64": "0.27.7",
        "@esbuild/openbsd-x64": "0.27.7",
        "@esbuild/openharmony-arm64": "0.27.7",
        "@esbuild/sunos-x64": "0.27.7",
        "@esbuild/win32-arm64": "0.27.7",
        "@esbuild/win32-ia32": "0.27.7",
        "@esbuild/win32-x64": "0.27.7"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/eventemitter3": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-5.0.4.tgz",
      "integrity": "sha512-mlsTRyGaPBjPedk6Bvw+aqbsXDtoAyAzm5MO7JgU+yVRyMQ5O8bD4Kcci7BS85f93veegeCPkL8R4GLClnjLFw==",
      "license": "MIT"
    },
    "node_modules/express": {
      "version": "4.22.1",
      "resolved": "https://registry.npmjs.org/express/-/express-4.22.1.tgz",
      "integrity": "sha512-F2X8g9P1X7uCPZMA3MVf9wcTqlyNp7IhH5qPCI0izhaOIYXaW9L535tGA3qmjRzpH+bZczqq7hVKxTR4NWnu+g==",
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1",
        "body-parser": "~1.20.3",
        "content-disposition": "~0.5.4",
        "content-type": "~1.0.4",
        "cookie": "~0.7.1",
        "cookie-signature": "~1.0.6",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "~1.3.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.0",
        "merge-descriptors": "1.0.3",
        "methods": "~1.1.2",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "path-to-regexp": "~0.1.12",
        "proxy-addr": "~2.0.7",
        "qs": "~6.14.0",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.2.1",
        "send": "~0.19.0",
        "serve-static": "~1.16.2",
        "setprototypeof": "1.2.0",
        "statuses": "~2.0.1",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/express/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/express/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==",
      "license": "MIT"
    },
    "node_modules/faye-websocket": {
      "version": "0.11.4",
      "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.4.tgz",
      "integrity": "sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g==",
      "license": "Apache-2.0",
      "dependencies": {
        "websocket-driver": ">=0.5.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/fetch-blob": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/fetch-blob/-/fetch-blob-3.2.0.tgz",
      "integrity": "sha512-7yAQpD2UMJzLi1Dqv7qFYnPbaPx7ZfFK6PiIxQ4PfkGPyNyl2Ugx+a/umUonmKqjhM4DnfbMvdX6otXq83soQQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/jimmywarting"
        },
        {
          "type": "paypal",
          "url": "https://paypal.me/jimmywarting"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "node-domexception": "^1.0.0",
        "web-streams-polyfill": "^3.0.3"
      },
      "engines": {
        "node": "^12.20 || >= 14.13"
      }
    },
    "node_modules/finalhandler": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
      "integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "statuses": "~2.0.2",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/finalhandler/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/finalhandler/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/firebase": {
      "version": "12.13.0",
      "resolved": "https://registry.npmjs.org/firebase/-/firebase-12.13.0.tgz",
      "integrity": "sha512-iutR8ejvAqk6qUClnsPz3U3VIjTWp243AX4cD3iifak5t56to1J29xUIQgSDDzaAqKvhshZerzSahwMQj2TlvA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/ai": "2.12.0",
        "@firebase/analytics": "0.10.22",
        "@firebase/analytics-compat": "0.2.28",
        "@firebase/app": "0.14.12",
        "@firebase/app-check": "0.11.3",
        "@firebase/app-check-compat": "0.4.3",
        "@firebase/app-compat": "0.5.12",
        "@firebase/app-types": "0.9.5",
        "@firebase/auth": "1.13.1",
        "@firebase/auth-compat": "0.6.6",
        "@firebase/data-connect": "0.7.0",
        "@firebase/database": "1.1.3",
        "@firebase/database-compat": "2.1.4",
        "@firebase/firestore": "4.14.1",
        "@firebase/firestore-compat": "0.4.9",
        "@firebase/functions": "0.13.4",
        "@firebase/functions-compat": "0.4.4",
        "@firebase/installations": "0.6.22",
        "@firebase/installations-compat": "0.2.22",
        "@firebase/messaging": "0.12.26",
        "@firebase/messaging-compat": "0.2.26",
        "@firebase/performance": "0.7.12",
        "@firebase/performance-compat": "0.2.25",
        "@firebase/remote-config": "0.8.3",
        "@firebase/remote-config-compat": "0.2.24",
        "@firebase/storage": "0.14.3",
        "@firebase/storage-compat": "0.4.3",
        "@firebase/util": "1.15.1"
      }
    },
    "node_modules/formdata-polyfill": {
      "version": "4.0.10",
      "resolved": "https://registry.npmjs.org/formdata-polyfill/-/formdata-polyfill-4.0.10.tgz",
      "integrity": "sha512-buewHzMvYL29jdeQTVILecSaZKnt/RJWjoZCF5OW60Z67/GmSLBkOFM7qh1PI3zFNtJbaZL5eQu1vLfazOwj4g==",
      "license": "MIT",
      "dependencies": {
        "fetch-blob": "^3.1.2"
      },
      "engines": {
        "node": ">=12.20.0"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/framer-motion": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.38.0.tgz",
      "integrity": "sha512-rFYkY/pigbcswl1XQSb7q424kSTQ8q6eAC+YUsSKooHQYuLdzdHjrt6uxUC+PRAO++q5IS7+TamgIw1AphxR+g==",
      "license": "MIT",
      "dependencies": {
        "motion-dom": "^12.38.0",
        "motion-utils": "^12.36.0",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gaxios": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/gaxios/-/gaxios-7.1.4.tgz",
      "integrity": "sha512-bTIgTsM2bWn3XklZISBTQX7ZSddGW+IO3bMdGaemHZ3tbqExMENHLx6kKZ/KlejgrMtj8q7wBItt51yegqalrA==",
      "license": "Apache-2.0",
      "dependencies": {
        "extend": "^3.0.2",
        "https-proxy-agent": "^7.0.1",
        "node-fetch": "^3.3.2"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/gcp-metadata": {
      "version": "8.1.2",
      "resolved": "https://registry.npmjs.org/gcp-metadata/-/gcp-metadata-8.1.2.tgz",
      "integrity": "sha512-zV/5HKTfCeKWnxG0Dmrw51hEWFGfcF2xiXqcA3+J90WDuP0SvoiSO5ORvcBsifmx/FoIjgQN3oNOGaQ5PhLFkg==",
      "license": "Apache-2.0",
      "dependencies": {
        "gaxios": "^7.0.0",
        "google-logging-utils": "^1.0.0",
        "json-bigint": "^1.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-tsconfig": {
      "version": "4.14.0",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.14.0.tgz",
      "integrity": "sha512-yTb+8DXzDREzgvYmh6s9vHsSVCHeC0G3PI5bEXNBHtmshPnO+S5O7qgLEOn0I5QvMy6kpZN8K1NKGyilLb93wA==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "resolve-pkg-maps": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
      }
    },
    "node_modules/google-auth-library": {
      "version": "10.6.2",
      "resolved": "https://registry.npmjs.org/google-auth-library/-/google-auth-library-10.6.2.tgz",
      "integrity": "sha512-e27Z6EThmVNNvtYASwQxose/G57rkRuaRbQyxM2bvYLLX/GqWZ5chWq2EBoUchJbCc57eC9ArzO5wMsEmWftCw==",
      "license": "Apache-2.0",
      "dependencies": {
        "base64-js": "^1.3.0",
        "ecdsa-sig-formatter": "^1.0.11",
        "gaxios": "^7.1.4",
        "gcp-metadata": "8.1.2",
        "google-logging-utils": "1.1.3",
        "jws": "^4.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/google-logging-utils": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/google-logging-utils/-/google-logging-utils-1.1.3.tgz",
      "integrity": "sha512-eAmLkjDjAFCVXg7A1unxHsLf961m6y17QFqXqAXGj/gVkKFrEICfStRfwUlGNfeCEjNRa32JEWOUTlYXPyyKvA==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.3.tgz",
      "integrity": "sha512-ej4AhfhfL2Q2zpMmLo7U1Uv9+PyhIZpgQLGT1F9miIGmiCJIoCgSmczFdrc97mWT4kVY72KA+WnnhJ5pghSvSg==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/http-parser-js": {
      "version": "0.5.10",
      "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.5.10.tgz",
      "integrity": "sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA==",
      "license": "MIT"
    },
    "node_modules/https-proxy-agent": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
      "integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/idb": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/idb/-/idb-7.1.1.tgz",
      "integrity": "sha512-gchesWBzyvGHRO9W8tzUWFDycow5gwjvFKfyV9FF32Y7F50yZMp7mP+T2mJIWFx49zicqyC4uefHM17o6xKIVQ==",
      "license": "ISC"
    },
    "node_modules/immer": {
      "version": "10.2.0",
      "resolved": "https://registry.npmjs.org/immer/-/immer-10.2.0.tgz",
      "integrity": "sha512-d/+XTN3zfODyjr89gM3mPq1WNX2B8pYsu7eORitdwyA2sBubnTl3laYlBk4sXY5FUa5qTZGBDPJICVbvqzjlbw==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/immer"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-bigint": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-bigint/-/json-bigint-1.0.0.tgz",
      "integrity": "sha512-SiPv/8VpZuWbvLSMtTDU8hEfrZWg/mH/nV/b4o0CYbSxu1UIQPLdwKOCIyLQX+VIPO5vrLX3i8qtqFyhdPSUSQ==",
      "license": "MIT",
      "dependencies": {
        "bignumber.js": "^9.0.0"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jwa": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-2.0.1.tgz",
      "integrity": "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg==",
      "license": "MIT",
      "dependencies": {
        "buffer-equal-constant-time": "^1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/jws": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jws/-/jws-4.0.1.tgz",
      "integrity": "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==",
      "license": "MIT",
      "dependencies": {
        "jwa": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lodash.camelcase": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.camelcase/-/lodash.camelcase-4.3.0.tgz",
      "integrity": "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA==",
      "license": "MIT"
    },
    "node_modules/long": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/long/-/long-5.3.2.tgz",
      "integrity": "sha512-mNAgZ1GmyNhD7AuqnTG3/VQ26o760+ZYBPKjPvugO8+nLbYfX6TVpJPseBvopbdY+qpZ/lKUnmEc1LeZYS3QAA==",
      "license": "Apache-2.0"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.546.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.546.0.tgz",
      "integrity": "sha512-Z94u6fKT43lKeYHiVyvyR8fT7pwCzDu7RyMPpTvh054+xahSgj4HFQ+NmflvzdXsoAjYGdCguGaFKYuvq0ThCQ==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/motion": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/motion/-/motion-12.38.0.tgz",
      "integrity": "sha512-uYfXzeHlgThchzwz5Te47dlv5JOUC7OB4rjJ/7XTUgtBZD8CchMN8qEJ4ZVsUmTyYA44zjV0fBwsiktRuFnn+w==",
      "license": "MIT",
      "dependencies": {
        "framer-motion": "^12.38.0",
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/motion-dom": {
      "version": "12.38.0",
      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-12.38.0.tgz",
      "integrity": "sha512-pdkHLD8QYRp8VfiNLb8xIBJis1byQ9gPT3Jnh2jqfFtAsWUA3dEepDlsWe/xMpO8McV+VdpKVcp+E+TGJEtOoA==",
      "license": "MIT",
      "dependencies": {
        "motion-utils": "^12.36.0"
      }
    },
    "node_modules/motion-utils": {
      "version": "12.36.0",
      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-12.36.0.tgz",
      "integrity": "sha512-eHWisygbiwVvf6PZ1vhaHCLamvkSbPIeAYxWUuL3a2PD/TROgE7FvfHWTIH4vMl798QLfMw15nRqIaRDXTlYRg==",
      "license": "MIT"
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.12",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.12.tgz",
      "integrity": "sha512-ZB9RH/39qpq5Vu6Y+NmUaFhQR6pp+M2Xt76XBnEwDaGcVAqhlvxrl3B2bKS5D3NH3QR76v3aSrKaF/Kiy7lEtQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/node-domexception": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz",
      "integrity": "sha512-/jKZoMpw0F8GRwl4/eLROPA3cfcXtLApP0QzLmUT/HuPCZWyB7IY9ZrMeKw2O/nFIqPQB3PVM9aYm0F312AXDQ==",
      "deprecated": "Use your platform's native DOMException instead",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/jimmywarting"
        },
        {
          "type": "github",
          "url": "https://paypal.me/jimmywarting"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=10.5.0"
      }
    },
    "node_modules/node-fetch": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-3.3.2.tgz",
      "integrity": "sha512-dRB78srN/l6gqWulah9SrxeYnxeddIG30+GOqK/9OlLVyLg3HPnr6SqOWTWOXKRwC2eGYCkZ59NNuSgvSrpgOA==",
      "license": "MIT",
      "dependencies": {
        "data-uri-to-buffer": "^4.0.0",
        "fetch-blob": "^3.1.4",
        "formdata-polyfill": "^4.0.10"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/node-fetch"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.38",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.38.tgz",
      "integrity": "sha512-3qT/88Y3FbH/Kx4szpQQ4HzUbVrHPKTLVpVocKiLfoYvw9XSGOX2FmD2d6DrXbVYyAQTF2HeF6My8jmzx7/CRw==",
      "license": "MIT"
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/p-retry": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/p-retry/-/p-retry-4.6.2.tgz",
      "integrity": "sha512-312Id396EbJdvRONlngUx0NydfrIQ5lsYu0znKVUzVvArzEIt08V1qhtyESbGVd1FGX7UKtiFp5uwKZdM8wIuQ==",
      "license": "MIT",
      "dependencies": {
        "@types/retry": "0.12.0",
        "retry": "^0.13.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.13.tgz",
      "integrity": "sha512-A/AGNMFN3c8bOlvV9RreMdrv7jsmF9XIfDeCd87+I8RNg6s78BhJxMu69NEMHBSJFxKidViTEdruRwEk/WIKqA==",
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.14",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.14.tgz",
      "integrity": "sha512-SoSL4+OSEtR99LHFZQiJLkT59C5B1amGO1NzTwj7TT1qCUgUO6hxOvzkOYxD+vMrXBM3XJIKzokoERdqQq/Zmg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/protobufjs": {
      "version": "7.5.7",
      "resolved": "https://registry.npmjs.org/protobufjs/-/protobufjs-7.5.7.tgz",
      "integrity": "sha512-NGnrxS/nLKUo5nkbVQxlC71sB4hdfImdYIbFeSCidxtwATx0AHRPcANSLd0q5Bb2BkoSWo2iisQhGg5/r+ihbA==",
      "hasInstallScript": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@protobufjs/aspromise": "^1.1.2",
        "@protobufjs/base64": "^1.1.2",
        "@protobufjs/codegen": "^2.0.5",
        "@protobufjs/eventemitter": "^1.1.0",
        "@protobufjs/fetch": "^1.1.0",
        "@protobufjs/float": "^1.0.2",
        "@protobufjs/inquire": "^1.1.1",
        "@protobufjs/path": "^1.1.2",
        "@protobufjs/pool": "^1.1.0",
        "@protobufjs/utf8": "^1.1.1",
        "@types/node": ">=13.7.0",
        "long": "^5.0.0"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/qs": {
      "version": "6.14.2",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.2.tgz",
      "integrity": "sha512-V/yCWTTF7VJ9hIh18Ugr2zhJMP01MY7c5kh4J870L7imm6/DIzBsNLTXzMwUA3yZ5b/KBqLx8Kp3uRvd7xSe3Q==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
      "integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/react": {
      "version": "19.2.6",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.6.tgz",
      "integrity": "sha512-sfWGGfavi0xr8Pg0sVsyHMAOziVYKgPLNrS7ig+ivMNb3wbCBw3KxtflsGBAwD3gYQlE/AEZsTLgToRrSCjb0Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.6",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.6.tgz",
      "integrity": "sha512-0prMI+hvBbPjsWnxDLxlCGyM8PN6UuWjEUCYmZhO67xIV9Xasa/r/vDnq+Xyq4Lo27g8QSbO5YzARu0D1Sps3g==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.6"
      }
    },
    "node_modules/react-is": {
      "version": "19.2.6",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-19.2.6.tgz",
      "integrity": "sha512-XjBR15BhXuylgWGuslhDKqlSayuqvqBX91BP8pauG8kd1zY8kotkNWbXksTCNRarse4kuGbe2kIY05ARtwNIvw==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/react-redux": {
      "version": "9.2.0",
      "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-9.2.0.tgz",
      "integrity": "sha512-ROY9fvHhwOD9ySfrF0wmvu//bKCQ6AeZZq1nJNtbDC+kk5DuSuNX/n6YWYF/SYy7bSba4D4FSz8DJeKY/S/r+g==",
      "license": "MIT",
      "dependencies": {
        "@types/use-sync-external-store": "^0.0.6",
        "use-sync-external-store": "^1.4.0"
      },
      "peerDependencies": {
        "@types/react": "^18.2.25 || ^19",
        "react": "^18.0 || ^19",
        "redux": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "redux": {
          "optional": true
        }
      }
    },
    "node_modules/react-refresh": {
      "version": "0.18.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.18.0.tgz",
      "integrity": "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "7.15.0",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.15.0.tgz",
      "integrity": "sha512-HW9vYwuM8f4yx66Izy8xfrzCM+SBJluoZcCbww9A1TySax11S5Vgw6fi3ZjMONw9J4gQwngL7PzkyIpJJpJ7RQ==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.15.0",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.15.0.tgz",
      "integrity": "sha512-VcrVg64Fo8nwBvDscajG8gRTLIuTC6N50nb22l2HOOV4PTOHgoGp8mUjy9wLiHYoYTSYI36tUnXZgasSRFZorQ==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.15.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/react-router/node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/recharts": {
      "version": "3.8.1",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-3.8.1.tgz",
      "integrity": "sha512-mwzmO1s9sFL0TduUpwndxCUNoXsBw3u3E/0+A+cLcrSfQitSG62L32N69GhqUrrT5qKcAE3pCGVINC6pqkBBQg==",
      "license": "MIT",
      "workspaces": [
        "www"
      ],
      "dependencies": {
        "@reduxjs/toolkit": "^1.9.0 || 2.x.x",
        "clsx": "^2.1.1",
        "decimal.js-light": "^2.5.1",
        "es-toolkit": "^1.39.3",
        "eventemitter3": "^5.0.1",
        "immer": "^10.1.1",
        "react-redux": "8.x.x || 9.x.x",
        "reselect": "5.1.1",
        "tiny-invariant": "^1.3.3",
        "use-sync-external-store": "^1.2.2",
        "victory-vendor": "^37.0.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-is": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/redux": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/redux/-/redux-5.0.1.tgz",
      "integrity": "sha512-M9/ELqF6fy8FwmkpnF0S3YKOqMyoWJ4+CS5Efg2ct3oY9daQvd/Pc71FpGZsVsbl3Cpb+IIcjBDUnnyBdQbq4w==",
      "license": "MIT"
    },
    "node_modules/redux-thunk": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/redux-thunk/-/redux-thunk-3.1.0.tgz",
      "integrity": "sha512-NW2r5T6ksUKXCabzhL9z+h206HQw/NJkcLm1GPImRQ8IzfXwRGqjVhKJGauHirT0DAuyy6hjdnMZaRoAcy0Klw==",
      "license": "MIT",
      "peerDependencies": {
        "redux": "^5.0.0"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/reselect": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/reselect/-/reselect-5.1.1.tgz",
      "integrity": "sha512-K/BG6eIky/SBpzfHZv/dd+9JBFiS4SWV7FIujVyJRux6e45+73RaUHXLmIR1f7WOMaQ0U1km6qwklRQxpJJY0w==",
      "license": "MIT"
    },
    "node_modules/resolve-pkg-maps": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
      "integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
      "devOptional": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
      }
    },
    "node_modules/retry": {
      "version": "0.13.1",
      "resolved": "https://registry.npmjs.org/retry/-/retry-0.13.1.tgz",
      "integrity": "sha512-XQBQ3I8W1Cge0Seh+6gjj03LbmRFWuoszgK9ooCpwYIrhhoO80pfq4cUkU5DkknwfOfFteRwlZ56PYOGYyFWdg==",
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/rollup": {
      "version": "4.60.3",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.60.3.tgz",
      "integrity": "sha512-pAQK9HalE84QSm4Po3EmWIZPd3FnjkShVkiMlz1iligWYkWQ7wHYd1PF/T7QZ5TVSD6uSTon5gBVMSM4JfBV+A==",
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.60.3",
        "@rollup/rollup-android-arm64": "4.60.3",
        "@rollup/rollup-darwin-arm64": "4.60.3",
        "@rollup/rollup-darwin-x64": "4.60.3",
        "@rollup/rollup-freebsd-arm64": "4.60.3",
        "@rollup/rollup-freebsd-x64": "4.60.3",
        "@rollup/rollup-linux-arm-gnueabihf": "4.60.3",
        "@rollup/rollup-linux-arm-musleabihf": "4.60.3",
        "@rollup/rollup-linux-arm64-gnu": "4.60.3",
        "@rollup/rollup-linux-arm64-musl": "4.60.3",
        "@rollup/rollup-linux-loong64-gnu": "4.60.3",
        "@rollup/rollup-linux-loong64-musl": "4.60.3",
        "@rollup/rollup-linux-ppc64-gnu": "4.60.3",
        "@rollup/rollup-linux-ppc64-musl": "4.60.3",
        "@rollup/rollup-linux-riscv64-gnu": "4.60.3",
        "@rollup/rollup-linux-riscv64-musl": "4.60.3",
        "@rollup/rollup-linux-s390x-gnu": "4.60.3",
        "@rollup/rollup-linux-x64-gnu": "4.60.3",
        "@rollup/rollup-linux-x64-musl": "4.60.3",
        "@rollup/rollup-openbsd-x64": "4.60.3",
        "@rollup/rollup-openharmony-arm64": "4.60.3",
        "@rollup/rollup-win32-arm64-msvc": "4.60.3",
        "@rollup/rollup-win32-ia32-msvc": "4.60.3",
        "@rollup/rollup-win32-x64-gnu": "4.60.3",
        "@rollup/rollup-win32-x64-msvc": "4.60.3",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/send": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
      "integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.1",
        "mime": "1.6.0",
        "ms": "2.1.3",
        "on-finished": "~2.4.1",
        "range-parser": "~1.2.1",
        "statuses": "~2.0.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/send/node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/send/node_modules/debug/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/serve-static": {
      "version": "1.16.3",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
      "integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "~0.19.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.6.0.tgz",
      "integrity": "sha512-uxL7qAVQriqRQPAyK3pj66VqskWqoZ37PW94jwOTwNfq/z9oyu1V+eqrZqtR2+fCiXdYOZe/Modt8GtvqNzu+w==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.0.tgz",
      "integrity": "sha512-y6nxMGB1nMW9R6k96e5gdIFzcfL/gTJRNaqGes1YvkLnPVXzWgbqFF2yLC0T8G774n24cx3Pe8XrKoniCOAH+Q==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.16",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.16.tgz",
      "integrity": "sha512-pn99VhoACYR8nFHhxqix+uvsbXineAasWm5ojXoN8xEwK5Kd3/TrhNn1wByuD52UxWRLy8pu+kRMniEi6Eq9Zg==",
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tsx": {
      "version": "4.21.0",
      "resolved": "https://registry.npmjs.org/tsx/-/tsx-4.21.0.tgz",
      "integrity": "sha512-5C1sg4USs1lfG0GFb2RLXsdpXqBSEhAaA/0kPL01wxzpMqLILNxIxIOKiILz+cdg/pLnOUxFYOR5yhHU666wbw==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "~0.27.0",
        "get-tsconfig": "^4.7.5"
      },
      "bin": {
        "tsx": "dist/cli.mjs"
      },
      "engines": {
        "node": ">=18.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      }
    },
    "node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typescript": {
      "version": "5.8.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.3.tgz",
      "integrity": "sha512-p1diW6TqL9L07nNxvRMM7hMMw4c5XOo/1ibL4aAIGmSAt9slTE1Xgw5KWuof2uTOvCg9BY7ZRi+GaF+7sfgPeQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/victory-vendor": {
      "version": "37.3.6",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-37.3.6.tgz",
      "integrity": "sha512-SbPDPdDBYp+5MJHhBCAyI7wKM3d5ivekigc2Dk2s7pgbZ9wIgIBYGVw4zGHBml/qTFbexrofXW6Gu4noGxrOwQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "6.4.2",
      "resolved": "https://registry.npmjs.org/vite/-/vite-6.4.2.tgz",
      "integrity": "sha512-2N/55r4JDJ4gdrCvGgINMy+HH3iRpNIz8K6SFwVsA+JbQScLiC+clmAxBgwiSPgcG9U15QmvqCGWzMbqda5zGQ==",
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.25.0",
        "fdir": "^6.4.4",
        "picomatch": "^4.0.2",
        "postcss": "^8.5.3",
        "rollup": "^4.34.9",
        "tinyglobby": "^0.2.13"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "jiti": ">=1.21.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite/node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.12.tgz",
      "integrity": "sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/android-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.12.tgz",
      "integrity": "sha512-VJ+sKvNA/GE7Ccacc9Cha7bpS8nyzVv0jdVgwNDaR4gDMC/2TTRc33Ip8qrNYUcpkOHUT5OZ0bUcNNVZQ9RLlg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/android-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.12.tgz",
      "integrity": "sha512-6AAmLG7zwD1Z159jCKPvAxZd4y/VTO0VkprYy+3N2FtJ8+BQWFXU+OxARIwA46c5tdD9SsKGZ/1ocqBS/gAKHg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/android-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.12.tgz",
      "integrity": "sha512-5jbb+2hhDHx5phYR2By8GTWEzn6I9UqR11Kwf22iKbNpYrsmRB18aX/9ivc5cabcUiAT/wM+YIZ6SG9QO6a8kg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.12.tgz",
      "integrity": "sha512-N3zl+lxHCifgIlcMUP5016ESkeQjLj/959RxxNYIthIg+CQHInujFuXeWbWMgnTo4cp5XVHqFPmpyu9J65C1Yg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/darwin-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.12.tgz",
      "integrity": "sha512-HQ9ka4Kx21qHXwtlTUVbKJOAnmG1ipXhdWTmNXiPzPfWKpXqASVcWdnf2bnL73wgjNrFXAa3yYvBSd9pzfEIpA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.12.tgz",
      "integrity": "sha512-gA0Bx759+7Jve03K1S0vkOu5Lg/85dou3EseOGUes8flVOGxbhDDh/iZaoek11Y8mtyKPGF3vP8XhnkDEAmzeg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.12.tgz",
      "integrity": "sha512-TGbO26Yw2xsHzxtbVFGEXBFH0FRAP7gtcPE7P5yP7wGy7cXK2oO7RyOhL5NLiqTlBh47XhmIUXuGciXEqYFfBQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.12.tgz",
      "integrity": "sha512-lPDGyC1JPDou8kGcywY0YILzWlhhnRjdof3UlcoqYmS9El818LLfJJc3PXXgZHrHCAKs/Z2SeZtDJr5MrkxtOw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.12.tgz",
      "integrity": "sha512-8bwX7a8FghIgrupcxb4aUmYDLp8pX06rGh5HqDT7bB+8Rdells6mHvrFHHW2JAOPZUbnjUpKTLg6ECyzvas2AQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.12.tgz",
      "integrity": "sha512-0y9KrdVnbMM2/vG8KfU0byhUN+EFCny9+8g202gYqSSVMonbsCfLjUO+rCci7pM0WBEtz+oK/PIwHkzxkyharA==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-loong64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.12.tgz",
      "integrity": "sha512-h///Lr5a9rib/v1GGqXVGzjL4TMvVTv+s1DPoxQdz7l/AYv6LDSxdIwzxkrPW438oUXiDtwM10o9PmwS/6Z0Ng==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.12.tgz",
      "integrity": "sha512-iyRrM1Pzy9GFMDLsXn1iHUm18nhKnNMWscjmp4+hpafcZjrr2WbT//d20xaGljXDBYHqRcl8HnxbX6uaA/eGVw==",
      "cpu": [
        "mips64el"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.12.tgz",
      "integrity": "sha512-9meM/lRXxMi5PSUqEXRCtVjEZBGwB7P/D4yT8UG/mwIdze2aV4Vo6U5gD3+RsoHXKkHCfSxZKzmDssVlRj1QQA==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.12.tgz",
      "integrity": "sha512-Zr7KR4hgKUpWAwb1f3o5ygT04MzqVrGEGXGLnj15YQDJErYu/BGg+wmFlIDOdJp0PmB0lLvxFIOXZgFRrdjR0w==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-s390x": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.12.tgz",
      "integrity": "sha512-MsKncOcgTNvdtiISc/jZs/Zf8d0cl/t3gYWX8J9ubBnVOwlk65UIEEvgBORTiljloIWnBzLs4qhzPkJcitIzIg==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/linux-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.12.tgz",
      "integrity": "sha512-uqZMTLr/zR/ed4jIGnwSLkaHmPjOjJvnm6TVVitAa08SLS9Z0VM8wIRx7gWbJB5/J54YuIMInDquWyYvQLZkgw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-xXwcTq4GhRM7J9A8Gv5boanHhRa/Q9KLVmcyXHCTaM4wKfIpWkdXiMog/KsnxzJ0A1+nD+zoecuzqPmCRyBGjg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.12.tgz",
      "integrity": "sha512-Ld5pTlzPy3YwGec4OuHh1aCVCRvOXdH8DgRjfDy/oumVovmuSzWfnSJg+VtakB9Cm0gxNO9BzWkj6mtO1FMXkQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-fF96T6KsBo/pkQI950FARU9apGNTSlZGsv1jZBAlcLL1MLjLNIWPBkj5NlSz8aAzYKg+eNqknrUJ24QBybeR5A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.12.tgz",
      "integrity": "sha512-MZyXUkZHjQxUvzK7rN8DJ3SRmrVrke8ZyRusHlP+kuwqTcfWLyqMOE3sScPPyeIXN/mDJIfGXvcMqCgYKekoQw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.12.tgz",
      "integrity": "sha512-rm0YWsqUSRrjncSXGA7Zv78Nbnw4XL6/dzr20cyrQf7ZmRcsovpcRBdhD43Nuk3y7XIoW2OxMVvwuRvk9XdASg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/sunos-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.12.tgz",
      "integrity": "sha512-3wGSCDyuTHQUzt0nV7bocDy72r2lI33QL3gkDNGkod22EsYl04sMf0qLb8luNKTOmgF/eDEDP5BFNwoBKH441w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/win32-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.12.tgz",
      "integrity": "sha512-rMmLrur64A7+DKlnSuwqUdRKyd3UE7oPJZmnljqEptesKM8wx9J8gx5u0+9Pq0fQQW8vqeKebwNXdfOyP+8Bsg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/win32-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.12.tgz",
      "integrity": "sha512-HkqnmmBoCbCwxUKKNPBixiWDGCpQGVsrQfJoVGYLPT41XWF8lHuE5N6WhVia2n4o5QK5M4tYr21827fNhi4byQ==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/@esbuild/win32-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.12.tgz",
      "integrity": "sha512-alJC0uCZpTFrSL0CCDjcgleBXPnCrEAhTBILpeAp7M/OFgoqtAetfBzX0xM00MUsVVPpVjlPuMbREqnZCXaTnA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/vite/node_modules/esbuild": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.12.tgz",
      "integrity": "sha512-bbPBYYrtZbkt6Os6FiTLCTFxvq4tt3JKall1vRwshA3fdVztsLAatFaZobhkBC8/BrPetoa0oksYoKXoG4ryJg==",
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.12",
        "@esbuild/android-arm": "0.25.12",
        "@esbuild/android-arm64": "0.25.12",
        "@esbuild/android-x64": "0.25.12",
        "@esbuild/darwin-arm64": "0.25.12",
        "@esbuild/darwin-x64": "0.25.12",
        "@esbuild/freebsd-arm64": "0.25.12",
        "@esbuild/freebsd-x64": "0.25.12",
        "@esbuild/linux-arm": "0.25.12",
        "@esbuild/linux-arm64": "0.25.12",
        "@esbuild/linux-ia32": "0.25.12",
        "@esbuild/linux-loong64": "0.25.12",
        "@esbuild/linux-mips64el": "0.25.12",
        "@esbuild/linux-ppc64": "0.25.12",
        "@esbuild/linux-riscv64": "0.25.12",
        "@esbuild/linux-s390x": "0.25.12",
        "@esbuild/linux-x64": "0.25.12",
        "@esbuild/netbsd-arm64": "0.25.12",
        "@esbuild/netbsd-x64": "0.25.12",
        "@esbuild/openbsd-arm64": "0.25.12",
        "@esbuild/openbsd-x64": "0.25.12",
        "@esbuild/openharmony-arm64": "0.25.12",
        "@esbuild/sunos-x64": "0.25.12",
        "@esbuild/win32-arm64": "0.25.12",
        "@esbuild/win32-ia32": "0.25.12",
        "@esbuild/win32-x64": "0.25.12"
      }
    },
    "node_modules/web-streams-polyfill": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-3.3.3.tgz",
      "integrity": "sha512-d2JWLCivmZYTSIoge9MsgFCZrt571BikcWGYkjC1khllbTeDlGqZ2D8vD8E/lJa8WGWbb7Plm8/XJYV7IJHZZw==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/web-vitals": {
      "version": "4.2.4",
      "resolved": "https://registry.npmjs.org/web-vitals/-/web-vitals-4.2.4.tgz",
      "integrity": "sha512-r4DIlprAGwJ7YM11VZp4R884m0Vmgr6EAKe3P+kO0PPj3Unqyvv59rczf6UiGcb9Z8QxZVcqKNwv/g0WNdWwsw==",
      "license": "Apache-2.0"
    },
    "node_modules/websocket-driver": {
      "version": "0.7.4",
      "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.4.tgz",
      "integrity": "sha512-b17KeDIQVjvb0ssuSDF2cYXSg2iztliJ4B9WdsuB6J952qCPKmnVq4DyW5motImXHDC1cBT/1UezrJVsKw5zjg==",
      "license": "Apache-2.0",
      "dependencies": {
        "http-parser-js": ">=0.5.1",
        "safe-buffer": ">=5.1.0",
        "websocket-extensions": ">=0.1.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/websocket-extensions": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.4.tgz",
      "integrity": "sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/ws": {
      "version": "8.20.0",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.20.0.tgz",
      "integrity": "sha512-sAt8BhgNbzCtgGbt2OxmpuryO63ZoDk/sqaB/znQm94T4fCEsy/yV+7CdC1kJhOU9lboAEU7R3kquuycDoibVA==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "license": "ISC"
    },
    "node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "license": "MIT",
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    }
  }
}
package.json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^1.29.0",
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "firebase": "^12.13.0",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "react-router-dom": "^7.15.0",
    "recharts": "^3.8.1",
    "tailwind-merge": "^3.6.0",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "autoprefixer": "^10.4.21",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}
server.ts
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for ERP
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Example API routes for the ERP
  app.get("/api/dashboard/summary", (req, res) => {
    res.json({
      salesToday: 1250.80,
      activeUsers: 42,
      lowStockItems: 15,
      profit: 450.20,
      ticketAverage: 29.78
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GestÃ£o Empresarial ERP running on http://localhost:${PORT}`);
  });
}

startServer();
simport React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  BadgeDollarSign, 
  Users, 
  FileText, 
  Settings, 
  Bell,
  Search,
  Store,
  TrendingUp,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Page Imports
import { DashboardPage } from './pages/Dashboard';
import { POSPage } from './pages/POS';
import { InventoryPage } from './pages/Inventory';
import { FinancePage } from './pages/Finance';
import { CRMPage } from './pages/CRM';
import { InvoicesPage } from './pages/Invoices';
import { SettingsPage } from './pages/Settings';
import { UpgradePage } from './pages/Upgrade';
import { LoginPage } from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { dataService } from './services/dataService';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-graphite-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <LoginPage />;
  }
  
  return <>{children}</>;
};

const SidebarItem = ({ icon: Icon, label, path, active, locked }: any) => (
  <Link 
    to={locked ? '#' : path}
    onClick={(e) => locked && e.preventDefault()}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-neon-green text-graphite-dark font-semibold shadow-[0_0_15px_rgba(204,255,0,0.3)]" 
        : "text-soft-white/60 hover:text-neon-green hover:bg-white/5",
      locked && "opacity-50 cursor-not-allowed hover:!bg-transparent hover:!text-soft-white/60"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-graphite-dark" : "group-hover:scale-110 transition-transform")} />
    <span>{label}</span>
    {locked && <span className="ml-auto text-[8px] font-bold bg-white/10 px-2 py-0.5 rounded-full">PRO</span>}
  </Link>
);

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isPro } = useAuth();
  const isPDV = pathname === '/pdv';

  if (isPDV) return null;
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ShoppingCart, label: 'PDV', path: '/pdv', locked: !isPro },
    { icon: Package, label: 'Estoque', path: '/estoque' },
    { icon: BadgeDollarSign, label: 'Financeiro', path: '/financeiro' },
    { icon: Users, label: 'Clientes', path: '/clientes' },
    { icon: FileText, label: 'Notas Fiscais', path: '/notas' },
    { icon: Settings, label: 'Ajustes', path: '/ajustes' },
  ];

  return (
    <aside className="w-64 h-screen bg-graphite border-r border-white/5 flex flex-col p-4 sticky top-0 hidden lg:flex">
      <div className="flex items-center gap-2 px-4 mb-10">
        <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center">
            <Store className="text-graphite-dark w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none tracking-tight">Gestão Empresarial</h1>
          <span className="text-[10px] text-neon-green font-mono uppercase tracking-widest">ERP PREMIUM</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.path} 
            {...item} 
            active={pathname === item.path} 
          />
        ))}
      </nav>

      <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5 overflow-hidden relative text-center">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-neon-green/10 blur-2xl rounded-full"></div>
        <div className="flex items-center justify-center gap-2 text-gold mb-2 relative z-10">
          <TrendingUp className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Acesso Pro</span>
        </div>
        <button 
          onClick={() => navigate('/upgrade')}
          className="w-full py-2 bg-white/10 hover:bg-neon-green hover:text-graphite-dark text-[10px] rounded-lg transition-all font-bold relative z-10 uppercase tracking-widest flex items-center justify-center">
          Upgrade
        </button>
      </div>
    </aside>
  );
};

const Topbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isPDV = location.pathname === '/pdv';

  if (isPDV) return null;

  return (
    <header className="h-16 border-b border-white/5 bg-graphite-dark/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
           <input 
            type="text" 
            placeholder="Pesquisa rápida..." 
            className="w-full bg-white/5 border border-white/5 rounded-xl py-1.5 pl-10 pr-4 text-xs outline-none focus:border-neon-green/50 transition-all"
           />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-soft-white/60 hover:text-soft-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-green rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <div className="relative group">
          <button className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-bold leading-none">{user?.displayName || 'Usuário'}</div>
              <div className="text-[10px] text-neon-green font-mono uppercase">Loja Principal</div>
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 overflow-hidden group-hover:border-neon-green transition-all">
               <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=CCFF00&color=1C1C1C`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDown className="w-4 h-4 text-soft-white/30 group-hover:text-neon-green transition-all" />
          </button>
          
          <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="bg-graphite border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[160px]">
              <button 
                onClick={() => logout()}
                className="w-full px-4 py-3 text-left text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
              >
                Encerrar Sessão
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const { businessId } = useAuth();
  const [interfaceConfig, setInterfaceConfig] = useState<any>(null);

  useEffect(() => {
    if (!businessId) return;
    return dataService.subscribeConfig(businessId, 'interface', setInterfaceConfig);
  }, [businessId]);

  const isDark = interfaceConfig?.darkMode !== false; // Default to dark if not set or set to true

  useEffect(() => {
    if (!isDark) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isDark]);

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeManager>
          <ProtectedRoute>
            <div className="flex min-h-screen bg-graphite-dark text-soft-white">
              <Sidebar />
              <div className="flex-1 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/pdv" element={<POSPage />} />
                    <Route path="/estoque" element={<InventoryPage />} />
                    <Route path="/financeiro" element={<FinancePage />} />
                    <Route path="/clientes" element={<CRMPage />} />
                    <Route path="/notas" element={<InvoicesPage />} />
                    <Route path="/ajustes" element={<SettingsPage />} />
                    <Route path="/upgrade" element={<UpgradePage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        </ThemeManager>
      </AuthProvider>
    </BrowserRouter>
  );
}


const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const { businessId } = useAuth();
  const [interfaceConfig, setInterfaceConfig] = useState<any>(null);

  useEffect(() => {
    if (!businessId) return;
    return dataService.subscribeConfig(businessId, 'interface', setInterfaceConfig);
  }, [businessId]);

  const isDark = interfaceConfig?.darkMode !== false; // Default to dark if not set or set to true

  useEffect(() => {
    if (!isDark) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isDark]);

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeManager>
          <ProtectedRoute>
            <div className="flex min-h-screen bg-graphite-dark text-soft-white">
              <Sidebar />
              <div className="flex-1 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/pdv" element={<POSPage />} />
                    <Route path="/estoque" element={<InventoryPage />} />
                    <Route path="/financeiro" element={<FinancePage />} />
                    <Route path="/clientes" element={<CRMPage />} />
                    <Route path="/notas" element={<InvoicesPage />} />
                    <Route path="/ajustes" element={<SettingsPage />} />
                    <Route path="/upgrade" element={<UpgradePage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        </ThemeManager>
      </AuthProvider>
    </BrowserRouter>
  );
}

src/contexts/AuthContext.tsximport React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  businessId: string | null;
  isPro: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      setUser(firebaseUser);
      if (!firebaseUser) {
        setBusinessId(null);
        setIsPro(false);
        setLoading(false);
        return;
      }

      // Ensure user doc exists
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        const newBusinessId = `biz_${firebaseUser.uid.slice(0, 8)}`;
        await setDoc(doc(db, 'businesses', newBusinessId), {
          name: 'Meu Mercado Flow',
          ownerId: firebaseUser.uid,
          createdAt: new Date().toISOString()
        });
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          businessId: newBusinessId,
          role: 'admin',
          isPro: false,
          createdAt: new Date().toISOString()
        });
      }

      // Set up real-time listener
      unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setBusinessId(snapshot.data().businessId);
          setIsPro(!!snapshot.data().isPro);
        }
        setLoading(false);
      });
    });

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, businessId, isPro, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
src/index.css@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  
  --color-graphite: #1C1C1C;
  --color-graphite-dark: #111111;
  --color-neon-green: #CCFF00;
  --color-gold: #D4AF37;
  --color-soft-white: #F8F9FA;
}

@layer base {
  body {
    @apply bg-graphite-dark text-soft-white font-sans antialiased transition-colors duration-300;
  }
}

.light-theme {
  --color-graphite: #FFFFFF;
  --color-graphite-dark: #F5F5F7;
  --color-soft-white: #1C1C1C;
  --color-neon-green: #2B2D42; /* A dark color for the neon contrast in light mode */
}

.light-theme .text-soft-white {
  color: #1c1c1c;
}

.light-theme .bg-graphite {
  background-color: #ffffff;
}

.light-theme .bg-graphite-dark {
  background-color: #F5F5F7;
}

.light-theme .border-white\/5,
.light-theme .border-white\/10 {
  border-color: rgba(0, 0, 0, 0.05);
}

.light-theme .bg-white\/5 {
  background-color: rgba(0, 0, 0, 0.03);
}

.light-theme .bg-white\/10 {
  background-color: rgba(0, 0, 0, 0.06);
}

.light-theme .text-soft-white\/40,
.light-theme .text-soft-white\/60 {
  color: rgba(0, 0, 0, 0.5);
}

.light-theme .text-neon-green {
  color: #000000;
}

.light-theme .bg-neon-green {
  background-color: #000000;
  color: #ffffff;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #111111;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #CCFF00;
}
src/lib/exportUtils.ts
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers
        .map(fieldName => {
          const value = row[fieldName];
          // Handle values that might contain commas or newlines
          const stringified = typeof value === 'object' ? JSON.stringify(value) : String(value);
          const escaped = stringified.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
src/lib/firebase.tsimport { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app, firebaseConfig.storageBucket);
src/lib/utils.tsimport { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
src/main.tsximport {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
src/pages/CRM.tsximport React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  Star,
  History,
  TrendingUp,
  Award,
  Users,
  X,
  Edit2,
  Trash2,
  Calendar,
  CreditCard,
  MessageSquare,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';

export const CRMPage = () => {
  const { businessId } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    totalSpends: '',
    phone: '',
    document: '',
    vip: false
  });
  const [customerSuccess, setCustomerSuccess] = useState<any | null>(null);

  useEffect(() => {
    if (!businessId) return;
    return dataService.subscribeCustomers(businessId, setCustomers);
  }, [businessId]);

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setNewCustomer({ name: '', totalSpends: '', phone: '', document: '', vip: false });
    setShowAddModal(true);
  };

  const handleOpenEdit = (customer: any) => {
    setEditingCustomer(customer);
    setNewCustomer({
      name: customer.name,
      totalSpends: (customer.totalSpends || 0).toString(),
      phone: customer.phone || '',
      document: customer.document || '',
      vip: !!customer.vip
    });
    setShowAddModal(true);
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    try {
      const customerData = {
        ...newCustomer,
        totalSpends: Number(newCustomer.totalSpends) || 0
      };

      if (editingCustomer) {
        await dataService.updateCustomer(businessId, editingCustomer.id, customerData);
      } else {
        const docRef = await dataService.addCustomer(businessId, {
          ...customerData,
          cashback: 0,
          lastPurchase: 'Novo Cliente'
        });

        if (docRef) {
          setCustomerSuccess({ id: docRef.id, ...customerData });
        }
      }

      setNewCustomer({ name: '', totalSpends: '', phone: '', document: '', vip: false });
      setShowAddModal(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (!businessId) return;
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      await dataService.deleteCustomer(businessId, customerId);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    (c.document && c.document.includes(searchTerm))
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">CRM & Fidelidade</h1>
          <p className="text-soft-white/60">Gerencie o relacionamento com seus clientes e programas de mensagens.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Novo Cliente
        </button>
      </header>

      {/* Modal Novo Cliente */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 shadow-2xl">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/90 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-graphite rounded-3xl border border-white/10 overflow-hidden"
            >
              <form onSubmit={handleAddCustomer} className="p-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}</h3>
                  <button type="button" onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                    <X className="w-6 h-6 text-soft-white/40" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome Completo</label>
                    <input 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.name} 
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Valor da Compra (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.totalSpends} 
                      onChange={(e) => setNewCustomer({...newCustomer, totalSpends: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Telefone</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.phone} 
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} 
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">CPF / CNPJ</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={newCustomer.document} 
                      onChange={(e) => setNewCustomer({...newCustomer, document: e.target.value})} 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Cliente VIP?</label>
                    <button 
                      type="button" 
                      onClick={() => setNewCustomer({...newCustomer, vip: !newCustomer.vip})}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
                        newCustomer.vip ? "bg-neon-green" : "bg-white/10"
                      )}
                    >
                      <motion.div 
                        animate={{ x: newCustomer.vip ? 24 : 0 }}
                        className={cn("w-4 h-4 rounded-full", newCustomer.vip ? "bg-graphite-dark" : "bg-soft-white/40")} 
                      />
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  {editingCustomer ? 'ATUALIZAR CLIENTE' : 'CADASTRAR CLIENTE'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Sucesso Cadastro */}
      <AnimatePresence>
        {customerSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setCustomerSuccess(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-neon-green/20">
                <UserPlus className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cliente Cadastrado!</h3>
              <p className="text-soft-white/60 mb-8 text-sm">O cliente <strong>{customerSuccess.name}</strong> foi adicionado com sucesso. Deseja enviar uma mensagem de boas-vindas?</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    window.open(`https://wa.me/${customerSuccess.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá¡ ${customerSuccess.name}, AGRADECEMOS A PREFERÊNCIA, VOLTE SEMPRE!`)}`, '_blank');
                    setCustomerSuccess(null);
                  }}
                  className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                   <MessageSquare className="w-5 h-5" /> ENVIAR MENSAGEM
                </button>
                <button 
                  onClick={() => setCustomerSuccess(null)}
                  className="w-full py-3 text-soft-white/40 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  FECHAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-graphite p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="p-3 bg-neon-green/10 rounded-xl">
              <Users className="w-6 h-6 text-neon-green" />
           </div>
           <div>
              <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Total Clientes</div>
              <div className="text-2xl font-black">{customers.length}</div>
           </div>
        </div>
        <div className="bg-graphite p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="p-3 bg-gold/10 rounded-xl">
              <Award className="w-6 h-6 text-gold" />
           </div>
           <div>
              <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Clientes VIP</div>
              <div className="text-2xl font-black">{customers.filter(c => c.vip).length}</div>
           </div>
        </div>
        <div className="bg-graphite p-6 rounded-2xl border border-white/5 flex items-center gap-4">
           <div className="p-3 bg-blue-500/10 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-500" />
           </div>
           <div>
              <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Ativos (Novo)</div>
              <div className="text-2xl font-black">{customers.filter(c => c.totalSpends > 0).length}</div>
           </div>
        </div>
      </div>

      <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Buscar cliente por nome, CPF ou telefone..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-neon-green outline-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Contato</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Total Compras</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Mensagem</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Última Visita</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                            {customer.name.split(' ').map((n: string) => n[0]).join('')}
                         </div>
                         <div>
                            <div className="font-semibold flex items-center gap-2">
                                {customer.name}
                                {customer.vip && <Star className="w-3 h-3 fill-gold text-gold" />}
                            </div>
                            <div className="text-[10px] text-soft-white/30 uppercase font-bold tracking-tighter">ID: #{customer.id.slice(-6).toUpperCase()}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs flex items-center gap-1.5 text-soft-white/60">
                           <Phone className="w-3 h-3" /> {customer.phone}
                        </div>
                        <div className="text-xs flex items-center gap-1.5 text-soft-white/60">
                           <Mail className="w-3 h-3" /> {customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-sm text-soft-white">R$ {(customer.totalSpends || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button 
                        className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors"
                        onClick={() => window.open(`https://wa.me/${customer.phone?.replace(/\D/g, '')}?text=${encodeURIComponent('AGRADECEMOS A PREFERÊNCIA, VOLTE SEMPRE!')}`, '_blank')}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Enviar</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-xs text-soft-white/60">{customer.lastPurchase}</td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                         <button 
                            onClick={() => handleOpenEdit(customer)}
                            className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-neon-green hover:text-graphite-dark rounded-lg transition-all" title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => window.open(`https://wa.me/${customer.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá¡ ${customer.name}, AGRADECEMOS A PREFERÊNCIA, VOLTE SEMPRE!`)}`, '_blank')}
                            className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-neon-green hover:text-graphite-dark rounded-lg transition-all" title="Enviar WhatsApp"
                          >
                            <Send className="w-4 h-4" />
                         </button>
                         <button className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-white/10 rounded-lg transition-all" title="HistÃ³rico">
                            <History className="w-4 h-4" />
                         </button>
                         <button 
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-2 opacity-0 group-hover:opacity-100 bg-white/5 hover:bg-red-500 rounded-lg transition-all" title="Excluir">
                            <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="p-20 text-center text-soft-white/20">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p>Nenhum cliente encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
src/pages/Dashboard.tsximport React from 'react';
import { 
  BadgeDollarSign, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { useState, useEffect } from 'react';

const data = [
  { name: 'Seg', sales: 4000 },
  { name: 'Ter', sales: 3000 },
  { name: 'Qua', sales: 2000 },
  { name: 'Qui', sales: 2780 },
  { name: 'Sex', sales: 1890 },
  { name: 'Sab', sales: 4390 },
  { name: 'Dom', sales: 3490 },
];

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => (
  <div className="bg-graphite p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
    <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10", color)}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-white/5 rounded-lg">
        <Icon className={cn("w-5 h-5", color.replace('bg-', 'text-'))} />
      </div>
      {trend != null && (
        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", trend > 0 ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500")}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="text-soft-white/60 text-xs font-medium uppercase tracking-wider mb-1">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export const DashboardPage = () => {
  const { businessId } = useAuth();
  const [salesData, setSalesData] = useState<any[]>([]);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) return;
    
    const unsubs = [
      dataService.subscribeSales(businessId, (data) => {
        setSalesData(data);
        setLoading(false);
      }),
      dataService.subscribeProducts(businessId, setInventoryData)
    ];

    return () => unsubs.forEach(u => u());
  }, [businessId]);

  const todaySales = salesData
    .filter(s => {
      const date = s.timestamp?.toDate ? s.timestamp.toDate() : new Date();
      return date.toDateString() === new Date().toDateString();
    })
    .reduce((acc, curr) => acc + curr.total, 0);

  const lowStockCount = inventoryData.filter(p => p.stock <= (p.minStock || 5)).length;
  const avgTicket = salesData.length > 0 ? (salesData.reduce((acc, curr) => acc + curr.total, 0) / salesData.length) : 0;

  // Chart aggregation
  const chartPoints = Object.values(salesData.reduce((acc: any, sale) => {
    const d = sale.timestamp?.toDate ? sale.timestamp.toDate() : new Date();
    const key = d.toLocaleDateString('pt-BR', { weekday: 'short' });
    if (!acc[key]) acc[key] = { name: key, sales: 0 };
    acc[key].sales += sale.total;
    return acc;
  }, {})).slice(-7);

  const handleRefresh = () => {
    setLoading(true);
    // Real-time listeners are already active, so we just provide visual feedback
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Painel Administrativo</h1>
          <p className="text-soft-white/60">Monitore o desempenho do Gestão Empresarial em tempo real.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={handleRefresh}
            className="flex-1 sm:flex-none px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Atualizar
          </button>
          <Link to="/pdv" className="flex-1 sm:flex-none px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            Frente de Caixa
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Vendas Hoje" value={`R$ ${todaySales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={BadgeDollarSign} color="bg-neon-green" trend={todaySales > 0 ? 100 : 0} />
        <StatCard label="Ticket MÃ©dio" value={`R$ ${avgTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={TrendingUp} color="bg-gold" trend={5} />
        <StatCard label="Vendas Totais" value={salesData.length} icon={Users} color="bg-blue-500" />
        <StatCard label="Estoque Baixo" value={`${lowStockCount} Itens`} icon={AlertCircle} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-graphite p-6 rounded-3xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Fluxo de Caixa Recente</h2>
            <Link to="/financeiro" className="text-xs text-neon-green hover:underline font-bold uppercase tracking-widest flex items-center gap-2">
              Ver Detalhes <TrendingUp className="w-3 h-3" />
            </Link>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartPoints.length > 0 ? chartPoints : [ {name: 'Seg', sales: 0}, {name: 'Dom', sales: 0} ]}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#CCFF00' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#CCFF00" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-graphite p-6 rounded-3xl border border-white/5 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-neon-green/20 rounded-lg">
                <Sparkles className="w-4 h-4 text-neon-green" />
            </div>
            <h2 className="text-lg font-bold font-mono uppercase tracking-wider text-sm">Flow Intelligence</h2>
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm space-y-2 border-l-2 border-l-neon-green">
              <p className="text-soft-white/80 leading-relaxed font-semibold">Análise de Comportamento</p>
              <p className="text-soft-white/50 text-xs">O setor de Padaria teve pico de vendas ás 07:30. Sugerimos dobrar a produção de Pão Francês nas quartas.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm space-y-2">
              <p className="text-soft-white/80 leading-relaxed font-semibold">Risco de Ruptura</p>
              <p className="text-soft-white/50 text-xs">"Café Especial 500g" acabará em 2 dias se o ritmo de venda continuar. Pedido de reposição sugerido.</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between p-4 bg-neon-green/5 rounded-2xl border border-neon-green/10">
            <div className="text-xs text-soft-white/70">Score Operacional</div>
            <div className="text-neon-green font-bold text-lg">9.4</div>
          </div>
        </div>
      </div>
    </div>
  )
};
src/pages/Finance.tsximport React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Wallet,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';
import { exportToCSV } from '../lib/exportUtils';

export const FinancePage = () => {
  const { businessId } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [newTx, setNewTx] = useState({
    description: '',
    amount: '',
    category: 'Fixa',
    type: 'expense'
  });

  useEffect(() => {
    if (!businessId) return;
    return dataService.subscribeTransactions(businessId, setTransactions);
  }, [businessId]);

  const handleExportCSV = () => {
    const dataToExport = transactions.map(t => ({
      Descrição: t.description,
      Valor: t.amount,
      Tipo: t.type === 'income' ? 'Entrada' : 'SaÃ­da',
      Categoria: t.category,
      Data: t.timestamp?.toDate ? t.timestamp.toDate().toLocaleString('pt-BR') : 'N/A'
    }));
    exportToCSV(dataToExport, `relatorio-financeiro-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const totalIn = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIn - totalOut;

  const chartData = [
    { name: 'Entradas', amount: totalIn, color: '#CCFF00' },
    { name: 'SaÃ­das', amount: totalOut, color: '#FF4444' },
  ];

  const handleAddTx = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    await dataService.addTransaction(businessId, {
      ...newTx,
      amount: Number(newTx.amount)
    });

    setNewTx({ description: '', amount: '', category: 'Fixa', type: 'expense' });
    setShowAddModal(false);
  };
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Módulo Financeiro</h1>
          <p className="text-soft-white/60">Controle total sobre seu fluxo de caixa e rentabilidade.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Relatório CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            Lançar Despesa
          </button>
        </div>
      </header>

      {/* Modal Lançamentos */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-xl">
                    <ArrowDownLeft className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold">Lançar Saída / Despesa</h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-soft-white/40" />
                </button>
              </div>

              <form onSubmit={handleAddTx} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Descrição</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-red-500" placeholder="Ex: Pagamento Internet" value={newTx.description} onChange={(e) => setNewTx({...newTx, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Valor</label>
                      <input type="number" step="0.01" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-red-500" value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Categoria</label>
                      <select required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-red-500 appearance-none" value={newTx.category} onChange={(e) => setNewTx({...newTx, category: e.target.value})}>
                        <option value="Fixa">Fixa</option>
                        <option value="Estoque">Estoque</option>
                        <option value="Operacional">Operacional</option>
                        <option value="Pessoal">Pessoal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-red-500 text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  CONFIRMAR LANÇAMENTO
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-graphite p-6 rounded-2xl border border-white/5 border-l-4 border-l-neon-green">
                <div className="text-soft-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Saldo Atual</div>
                <div className="text-2xl font-black">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
             </div>
             <div className="bg-graphite p-6 rounded-2xl border border-white/5 border-l-4 border-l-blue-500">
                <div className="text-soft-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Total Entradas</div>
                <div className="text-2xl font-black">R$ {totalIn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
             </div>
             <div className="bg-graphite p-6 rounded-2xl border border-white/5 border-l-4 border-l-orange-500">
                <div className="text-soft-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Total Saídas</div>
                <div className="text-2xl font-black text-orange-500">R$ {totalOut.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
             </div>
          </div>

          <div className="bg-graphite p-6 rounded-3xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Resumo Mensal</h2>
              <div className="flex items-center gap-2 text-xs text-soft-white/40">
                <Calendar className="w-4 h-4" />
                Maio 2026
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={12} width={70} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-graphite rounded-3xl border border-white/5 flex flex-col h-full">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-bold">Fluxo Recente</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {transactions.slice(0, 10).map(tx => {
              const txDate = tx.timestamp?.toDate ? tx.timestamp.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Acabou de lançar';
              return (
                <div key={tx.id} className="flex items-center gap-3 p-4 hover:bg-white/5 rounded-2xl transition-all group">
                    <div className={cn(
                      "p-2 rounded-xl transition-transform group-hover:scale-110",
                      tx.type === 'income' ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500"
                    )}>
                      {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{tx.description}</div>
                      <div className="text-[10px] text-soft-white/40 flex items-center gap-1 uppercase tracking-wider font-bold">
                          {tx.category} â€¢ {txDate}
                      </div>
                    </div>
                    <div className={cn(
                      "text-sm font-black",
                      tx.type === 'income' ? "text-neon-green" : "text-red-500"
                    )}>
                      {tx.type === 'expense' ? '-' : ''} R$ {tx.amount.toFixed(2)}
                    </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => setShowFullHistory(true)}
            className="m-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
          >
            Ver Todos Lançamentos
          </button>
        </div>
      </div>

      {/* Modal Histórico Completo */}
      <AnimatePresence>
        {showFullHistory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowFullHistory(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Histórico Completo</h3>
                  <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Todos os lançamentos do perí­odo</p>
                </div>
                <button onClick={() => setShowFullHistory(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-soft-white/40" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-graphite z-10">
                    <tr>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5">Data</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5">Descrição</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5">Categoria</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-soft-white/40 uppercase tracking-widest border-b border-white/5 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-4 py-4 text-sm text-soft-white/60">
                          {tx.timestamp?.toDate ? tx.timestamp.toDate().toLocaleString('pt-BR') : 'Recent'}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-1.5 rounded-lg",
                              tx.type === 'income' ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500"
                            )}>
                              {tx.type === 'income' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                            </div>
                            <span className="text-sm font-bold">{tx.description}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-soft-white/40">
                            {tx.category}
                          </span>
                        </td>
                        <td className={cn(
                          "px-4 py-4 text-right font-black",
                          tx.type === 'income' ? "text-neon-green" : "text-red-500"
                        )}>
                          {tx.type === 'expense' ? '-' : ''} R$ {tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
};
src/pages/Inventory.tsximport React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  AlertTriangle,
  X,
  Package,
  Edit2,
  Trash2,
  Save,
  Download
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';
import { exportToCSV } from '../lib/exportUtils';

export const InventoryPage = () => {
  const { businessId } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    barcode: '',
    costPrice: '',
    price: '',
    stock: '',
    minStock: '',
    category: ''
  });

  useEffect(() => {
    if (!businessId) return;
    const unsubProducts = dataService.subscribeProducts(businessId, setProducts);
    const unsubCategories = dataService.subscribeCategories(businessId, setCategories);
    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, [businessId]);

  const handleAddCategory = async () => {
    if (!businessId || !newCategoryName.trim()) return;
    await dataService.addCategory(businessId, newCategoryName.trim());
    setNewCategoryName('');
    setShowNewCategoryInput(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    await dataService.addProduct(businessId, {
      ...newProduct,
      costPrice: Number(newProduct.costPrice) || 0,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      minStock: Number(newProduct.minStock)
    });

    setNewProduct({ name: '', sku: '', barcode: '', costPrice: '', price: '', stock: '', minStock: '', category: '' });
    setShowAddModal(false);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      sku: product.sku || '',
      barcode: product.barcode || '',
      costPrice: (product.costPrice || '').toString(),
      price: product.price.toString(),
      stock: product.stock.toString(),
      minStock: (product.minStock || '').toString(),
      category: product.category || ''
    });
    setShowEditModal(true);
    setActiveMenuId(null);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId || !editingProduct) return;

    await dataService.updateProduct(businessId, editingProduct.id, {
      ...newProduct,
      costPrice: Number(newProduct.costPrice) || 0,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      minStock: Number(newProduct.minStock)
    });

    setNewProduct({ name: '', sku: '', barcode: '', costPrice: '', price: '', stock: '', minStock: '', category: '' });
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!businessId) return;
    await dataService.deleteProduct(businessId, productId);
    setProductToDelete(null);
    setActiveMenuId(null);
  };

  const handleExportCSV = () => {
    const dataToExport = products.map(p => ({
      Nome: p.name,
      SKU: p.sku || '',
      'CÃ³digo de Barras': p.barcode || '',
      Categoria: p.category || 'Geral',
      'PreÃ§o de Custo': p.costPrice || 0,
      'PreÃ§o de Venda': p.price,
      Estoque: p.stock,
      'Estoque MÃ­nimo': p.minStock || 5
    }));
    exportToCSV(dataToExport, `inventario-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.includes(searchTerm);
    if (!matchesSearch) return false;

    if (activeTab === 'low') return p.stock <= (p.minStock || 5);
    if (activeTab === 'out') return p.stock === 0;
    return true;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Controle de Estoque</h1>
          <p className="text-soft-white/60">Gerencie seus produtos, fornecedores e níveis de estoque.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        </div>
      </header>

     {/* Modal Adição/Edição */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setEditingProduct(null);
              }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-green/10 rounded-xl">
                    <Package className="w-5 h-5 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold">{showEditModal ? 'Editar Produto' : 'Novo Produto'}</h3>
                </div>
                <button 
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingProduct(null);
                  }} 
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-soft-white/40" />
                </button>
              </div>

              <form onSubmit={showEditModal ? handleUpdateProduct : handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome do Produto</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">SKU / Código</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.sku} onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Código de Barras</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.barcode} onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Preço de Custo</label>
                    <input type="number" step="0.01" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.costPrice} onChange={(e) => setNewProduct({...newProduct, costPrice: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Preço de Venda</label>
                    <input type="number" step="0.01" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Estoque Atual</label>
                    <input type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Esq. Mí­nimo</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" value={newProduct.minStock} onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Categoria</label>
                    <div className="flex gap-2">
                      <select 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        <option value="" className="bg-graphite">Selecione uma categoria</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name} className="bg-graphite">{cat.name}</option>
                        ))}
                      </select>
                      <button 
                        type="button"
                        onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                        className="px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-neon-green"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    {showNewCategoryInput && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-4 bg-white/5 rounded-xl border border-white/10 space-y-3"
                      >
                        <p className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nova Categoria</p>
                        <div className="flex gap-2">
                          <input 
                            className="flex-1 bg-white/5 border border-neon-green/30 rounded-lg py-2 px-3 text-sm outline-none focus:border-neon-green" 
                            placeholder="Nome da categoria"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                          />
                          <button 
                            type="button"
                            onClick={handleAddCategory}
                            className="px-4 py-2 bg-neon-green text-graphite-dark font-bold rounded-lg text-xs"
                          >
                            GERAR
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2">
                  {showEditModal ? <><Save className="w-5 h-5"/> SALVAR ALTERAÃ‡Ã•ES</> : 'ADICIONAR AO INVENTÁRIO'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Deletar */}
      <AnimatePresence>
        {productToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setProductToDelete(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-graphite rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excluir Produto?</h3>
              <p className="text-soft-white/60 mb-8 text-sm">Esta ação não pode ser desfeita. O produto será removido permanentemente do estoque.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setProductToDelete(null)}
                  className="py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  CANCELAR
                </button>
                <button 
                  onClick={() => handleDeleteProduct(productToDelete)}
                  className="py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                >
                  EXCLUIR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 p-1 bg-white/5 rounded-2xl w-fit">
        {['all', 'low', 'out'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider",
              activeTab === tab ? "bg-white/10 text-neon-green" : "text-soft-white/40 hover:text-soft-white"
            )}
          >
            {tab === 'all' ? 'Todos' : tab === 'low' ? 'Estoque Baixo' : 'Esgotados'}
          </button>
        ))}
      </div>

      <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Buscar por nome, SKU ou categoria..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-neon-green outline-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4 text-soft-white/60" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Produto</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Categoria</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">PreÃ§o</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Qty</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map(product => {
                const isLow = product.stock <= (product.minStock || 5);
                const isOut = product.stock === 0;

                return (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-[10px] font-mono text-soft-white/30">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-white/5 border border-white/5 rounded-lg text-soft-white/60">
                        {product.category || 'Geral'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-sm">R$ {product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={cn("font-bold text-sm", isLow ? "text-orange-500" : "")}>{product.stock} un</span>
                        <span className="text-[10px] text-soft-white/30">Min: {product.minStock || 5}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isOut ? (
                        <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3" /> Esgotado
                        </div>
                      ) : isLow ? (
                        <div className="flex items-center gap-1.5 text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3" /> Reposição
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-neon-green text-[10px] font-bold uppercase tracking-wider">
                          SaudÃ¡vel
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === product.id ? null : product.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all"
                        >
                          <MoreVertical className="w-4 h-4 text-soft-white/60" />
                        </button>
                        
                        <AnimatePresence>
                          {activeMenuId === product.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, x: 10 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: 10 }}
                                className="absolute right-full top-0 mr-2 w-48 bg-graphite border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                              >
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }}
                                  className="w-full px-4 py-3 text-left text-xs font-bold flex items-center gap-3 hover:bg-white/5 transition-colors"
                                >
                                  <Edit2 className="w-4 h-4 text-neon-green" /> Alterar
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setProductToDelete(product.id); }}
                                  className="w-full px-4 py-3 text-left text-xs font-bold flex items-center gap-3 hover:bg-red-500/10 text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" /> Excluir
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }}
                                  className="w-full px-4 py-3 text-left text-xs font-bold flex items-center gap-3 hover:bg-white/5 transition-colors border-t border-white/5"
                                >
                                  <Save className="w-4 h-4 text-blue-400" /> Salvar
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};
src/pages/Invoices.tsximport React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  XCircle,
  FileCheck,
  Zap,
  Info,
  X,
  FilePlus2,
  User,
  Package,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';

export const InvoicesPage = () => {
  const { businessId } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [isEmitting, setIsEmitting] = useState(false);
  const [successEmit, setSuccessEmit] = useState(false);
  const [fiscalConfig, setFiscalConfig] = useState<any>(null);
  
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    value: '',
    type: 'NF-e',
    items: '',
    observations: ''
  });

  const [certForm, setCertForm] = useState({
    type: 'A1',
    password: '',
    fileName: '',
    expiryDate: ''
  });

  useEffect(() => {
    if (!businessId) return;
    const unsubInvoices = dataService.subscribeInvoices(businessId, setInvoices);
    const unsubFiscal = dataService.subscribeFiscalConfig(businessId, (config) => {
      setFiscalConfig(config);
      if (config) {
        setCertForm({
          type: config.certType || 'A1',
          password: config.certPassword || '',
          fileName: config.certFileName || '',
          expiryDate: config.certExpiry || ''
        });
      }
    });
    return () => {
      unsubInvoices();
      unsubFiscal();
    };
  }, [businessId]);

  const handleUpdateCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;
    
    await dataService.updateFiscalConfig(businessId, {
      certType: certForm.type,
      certPassword: certForm.password,
      certFileName: certForm.fileName,
      certExpiry: certForm.expiryDate,
      hasCertificate: true
    });
    
    setShowCertModal(false);
  };

  const handleEmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;

    setIsEmitting(true);
    
    // Simular delay de processamento SEFAZ
    await new Promise(resolve => setTimeout(resolve, 2000));

    const invoiceNumber = `000.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}.${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
    
    await dataService.addInvoice(businessId, {
      number: invoiceNumber,
      type: newInvoice.type,
      customer: newInvoice.customer,
      value: parseFloat(newInvoice.value),
      status: 'authorized',
      date: new Date().toLocaleString('pt-BR'),
      items: newInvoice.items,
      observations: newInvoice.observations
    });

    setIsEmitting(false);
    setSuccessEmit(true);
    
    setTimeout(() => {
      setSuccessEmit(false);
      setShowAddModal(false);
      setNewInvoice({ customer: '', value: '', type: 'NF-e', items: '', observations: '' });
    }, 2000);
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.number.includes(searchTerm) || 
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Notas Fiscais</h1>
          <p className="text-soft-white/60">Gerenciamento fiscal, emissão de NFC-e e NF-e integrada ao SEFAZ.</p>
        </div>
        <div className="flex gap-3">
           <div className="flex flex-col items-end mr-4">
              <div className="text-[10px] text-soft-white/40 font-bold uppercase tracking-widest">Status SEFAZ</div>
              <div className="flex items-center gap-1.5 text-neon-green text-xs font-bold">
                 <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div> Operacional
              </div>
           </div>
           <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all"
          >
             <Zap className="w-4 h-4" />
             Emitir NF-e
           </button>
        </div>
      </header>

      {/* Modal Emitir NF-e */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/90 backdrop-blur-sm"
              onClick={() => !isEmitting && !successEmit && setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {successEmit ? (
                <div className="p-12 text-center space-y-4">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto border border-neon-green/20"
                  >
                    <CheckCircle2 className="w-10 h-10 text-neon-green" />
                  </motion.div>
                  <h3 className="text-2xl font-bold">NF-e Autorizada!</h3>
                  <p className="text-soft-white/40">Nota enviada com sucesso para o SEFAZ.</p>
                </div>
              ) : (
                <form onSubmit={handleEmit} className="p-8 space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neon-green/10 rounded-lg">
                        <FilePlus2 className="w-5 h-5 text-neon-green" />
                      </div>
                      <h3 className="text-xl font-bold">Emitir Nova NF-e</h3>
                    </div>
                    <button type="button" onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <X className="w-6 h-6 text-soft-white/40" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3" /> Destinatário (Nome ou Empresa)
                      </label>
                      <input 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                        value={newInvoice.customer}
                        onChange={(e) => setNewInvoice({...newInvoice, customer: e.target.value})}
                        disabled={isEmitting}
                        placeholder="Ex: Restaurante Sabor & Cia"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Valor Total (R$)</label>
                      <input 
                        required type="number" step="0.01"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                        value={newInvoice.value}
                        onChange={(e) => setNewInvoice({...newInvoice, value: e.target.value})}
                        disabled={isEmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Tipo de Nota</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                        value={newInvoice.type}
                        onChange={(e) => setNewInvoice({...newInvoice, type: e.target.value})}
                        disabled={isEmitting}
                      >
                        <option value="NF-e">NF-e (Venda)</option>
                        <option value="NFC-e">NFC-e (Consumidor)</option>
                        <option value="Devolução">Devolução</option>
                      </select>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest flex items-center gap-2">
                        <Package className="w-3 h-3" /> Itens / Descrição
                      </label>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green h-24 resize-none" 
                        value={newInvoice.items}
                        onChange={(e) => setNewInvoice({...newInvoice, items: e.target.value})}
                        disabled={isEmitting}
                        placeholder="Dê uma breve descrição dos produtos..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isEmitting}
                    className={cn(
                      "w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
                      isEmitting && "bg-neon-green/50"
                    )}
                  >
                    {isEmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-graphite-dark border-r-transparent rounded-full animate-spin"></div>
                        TRANSMITINDO SEFAZ...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" /> AUTORIZAR NF-e
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="p-6 bg-graphite rounded-2xl border border-white/5 space-y-2">
            <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest">Emitidas (MÃªs)</div>
            <div className="text-2xl font-black">{invoices.filter(i => i.status === 'authorized').length + 1450}</div>
         </div>
         <div className="p-6 bg-graphite rounded-2xl border border-white/5 space-y-2">
            <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest">Canceladas</div>
            <div className="text-2xl font-black text-red-500">{invoices.filter(i => i.status === 'cancelled').length + 12}</div>
         </div>
         <div className="p-6 bg-graphite rounded-2xl border border-white/5 space-y-2">
            <div className="text-soft-white/40 text-[10px] uppercase font-bold tracking-widest">Total Impostos</div>
            <div className="text-2xl font-black text-gold">R$ {(2140 + (invoices.reduce((acc, curr) => acc + curr.value, 0) * 0.1)).toFixed(2)}</div>
         </div>
         <button 
          onClick={() => setShowCertModal(true)}
          className="p-6 bg-neon-green/5 rounded-2xl border border-neon-green/20 border-dashed flex flex-col justify-center items-center text-center hover:bg-neon-green/10 transition-all group"
         >
            <div className="flex items-center gap-2 text-neon-green font-bold uppercase tracking-widest mb-1">
              <Info className="w-3 h-3" />
              <span>Certificado Digital</span>
            </div>
            {fiscalConfig?.hasCertificate ? (
              <div className="text-[10px] text-soft-white/40">Vence em {fiscalConfig.certExpiry || '365'} dias</div>
            ) : (
              <div className="text-[10px] text-red-500 font-bold">Não Configurado</div>
            )}
         </button>
      </div>

      {/* Modal Certificado Digital */}
      <AnimatePresence>
        {showCertModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowCertModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-green/10 rounded-lg">
                    <Info className="w-5 h-5 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Configurar Certificado</h3>
                </div>
                <button onClick={() => setShowCertModal(false)}>
                  <X className="w-6 h-6 text-soft-white/20 hover:text-white transition-colors" />
                </button>
              </div>

              <form onSubmit={handleUpdateCert} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Tipo</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                        value={certForm.type}
                        onChange={(e) => setCertForm({...certForm, type: e.target.value})}
                      >
                        <option value="A1">A1 (Arquivo)</option>
                        <option value="A3">A3 (Token/Cartão)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Expiração (dias)</label>
                       <input 
                         type="number"
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                         value={certForm.expiryDate}
                         onChange={(e) => setCertForm({...certForm, expiryDate: e.target.value})}
                         placeholder="Ex: 365"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome do Arquivo / Alias</label>
                    <input 
                      disabled={certForm.type === 'A3'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green disabled:opacity-30" 
                      value={certForm.fileName}
                      onChange={(e) => setCertForm({...certForm, fileName: e.target.value})}
                      placeholder="Ex: certificado_2024.pfx"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Senha do Certificado</label>
                    <input 
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={certForm.password}
                      onChange={(e) => setCertForm({...certForm, password: e.target.value})}
                     placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="p-4 bg-neon-green/5 border border-neon-green/10 rounded-2xl flex items-start gap-3">
                   <Info className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
                   <p className="text-[10px] text-soft-white/60 leading-relaxed uppercase font-bold tracking-wider">
                      O certificado A1 é essencial para a automação da emissão em nuvem. Certifique-se de que a senha esteja correta para evitar erros no SEFAZ.
                   </p>
                </div>

                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  SALVAR CONFIGURAÇÃO
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Pesquisar por número, cliente ou chave de acesso..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-neon-green outline-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4 text-soft-white/60" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">NÂº Nota / Tipo</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">DestinatÃ¡rio</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-soft-white/40 uppercase tracking-widest">EmissÃ£o</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-sm">{invoice.number}</div>
                    <div className="text-[10px] font-mono text-soft-white/30 tracking-widest">{invoice.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-soft-white/80">{invoice.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold font-mono">R$ {invoice.value.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    {invoice.status === 'authorized' ? (
                      <div className="flex items-center gap-1.5 text-neon-green text-[10px] font-bold uppercase tracking-wider">
                         <FileCheck className="w-3 h-3" /> Autorizada
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-wider">
                         <XCircle className="w-3 h-3" /> Cancelada
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-soft-white/40">{invoice.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all">
                       <button title="Imprimir Danfe" className="p-2 hover:bg-white/5 rounded-lg text-soft-white/40 hover:text-neon-green"><Printer className="w-4 h-4" /></button>
                       <button title="Download XML" className="p-2 hover:bg-white/5 rounded-lg text-soft-white/40 hover:text-blue-500"><Download className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-soft-white/20">
                       <FileText className="w-12 h-12 mx-auto mb-4 opacity-5" />
                       <p className="text-sm italic">Nenhuma nota encontrada nesta busca.</p>
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
src/pages/Login.tsximport React, { useState } from 'react';
import { LogIn, Github, Mail, ShieldCheck, Zap, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';

export const LoginPage = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-graphite-dark flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-green/10 via-transparent to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-neon-green rounded-2xl flex items-center justify-center rotate-12 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              <Zap className="w-8 h-8 text-graphite-dark -rotate-12" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-white">GESTÃO EMPRESARIAL</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Bem-vindo ao Meu mercado ERP</h1>
          <p className="text-soft-white/60 text-sm">Acesse sua loja de qualquer lugar, em tempo real.</p>
        </div>

        <div className="bg-graphite p-8 rounded-3xl border border-white/5 shadow-2xl space-y-4">
          <button 
            onClick={signInWithGoogle}
            className="w-full py-4 bg-white text-graphite-dark font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" referrerPolicy="no-referrer" />
            Entrar com Google
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-graphite px-4 text-soft-white/30 font-bold tracking-widest">ou</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="space-y-2">
              <label className="text-xs font-bold text-soft-white/40 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/20" />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-neon-green outline-none" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-soft-white/40 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-white/20" />
                <input 
                  type="password" 
                  placeholder="********" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:ring-1 focus:ring-neon-green outline-none" 
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-neon-green text-graphite-dark font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 hover:bg-neon-green/90"
            >
              <LogIn className="w-4 h-4" /> {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
            <p className="text-center text-xs text-soft-white/60">
              {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-neon-green ml-1 font-bold"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </form>
        </div>

        <div className="text-center space-y-4">
          <p className="text-[10px] text-soft-white/30 uppercase tracking-[0.2em] font-bold">SeguranÃ§a de dados Enterprise</p>
          <div className="flex justify-center gap-6 opacity-40 grayscale contrast-125">
             <ShieldCheck className="w-5 h-5 text-neon-green" />
             <div className="text-[10px] items-center flex gap-1 font-bold text-white"><Github className="w-4 h-4" /> Open Source Core</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
src/pages/POS.tsximport React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Minus, 
  Plus, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Receipt,
  ScanLine,
  X,
  Printer,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Product, SaleItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { useEffect } from 'react';

export const POSPage = () => {
  const navigate = useNavigate();
  const { businessId, isPro, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [cashReceived, setCashReceived] = useState<number | string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<{ name: string, id: string } | null>(null);
  const [products, setProducts] = useState<SaleItem[]>([]);
  const [interfaceConfig, setInterfaceConfig] = useState<any>(null);

  useEffect(() => {
    if (!loading && !isPro) {
      navigate('/upgrade');
    }
  }, [isPro, loading, navigate]);


  useEffect(() => {
    if (!businessId) return;
    const unsubProducts = dataService.subscribeProducts(businessId, (data) => {
      setProducts(data as SaleItem[]);
    });
    const unsubInterface = dataService.subscribeConfig(businessId, 'interface', setInterfaceConfig);
    
    return () => {
      unsubProducts();
      unsubInterface();
    };
  }, [businessId]);

  // Handle barcode scanning automatically
  useEffect(() => {
    if (!searchTerm) return;
    
    // Check if searchTerm matches an exact SKU/barcode
    const matchedProduct = products.find(p => p.sku === searchTerm);
    if (matchedProduct) {
      addToCart(matchedProduct as unknown as Product);
      setSearchTerm(''); // Clear search after adding
    }
  }, [searchTerm, products]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.includes(searchTerm)
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const change = paymentMethod === 'cash' && Number(cashReceived) >= total 
    ? Number(cashReceived) - total 
    : 0;

  const [isFinishing, setIsFinishing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isAskingPrint, setIsAskingPrint] = useState(false);
  const [completedSale, setCompletedSale] = useState<{ 
    id: string, 
    total: number, 
    items: SaleItem[], 
    method: string,
    cashReceived?: number | null,
    change?: number | null,
    customer?: { name: string, id: string } | null
  } | null>(null);

  const handleFinishSale = async () => {
    if (!businessId) return;
    setIsFinishing(true);
    
    const saleData = {
      total,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod: paymentMethod || '',
      cashReceived: paymentMethod === 'cash' ? Number(cashReceived) : null,
      change: paymentMethod === 'cash' ? change : null,
      customer: selectedCustomer
    };

    try {
      const saleRef = await dataService.addSale(businessId, saleData);
      
      setCompletedSale({
        ...saleData,
        id: saleRef?.id.slice(-6).toUpperCase() || Math.floor(Math.random() * 999999).toString().padStart(6, '0'),
        method: paymentMethod || ''
      });
      
      // Add balance to finance
      await dataService.addTransaction(businessId, {
        amount: total,
        type: 'income',
        category: 'Venda PDV',
        description: `Venda #${saleRef?.id.slice(-6).toUpperCase()}`,
        saleId: saleRef?.id
      });

      setIsFinishing(false);
      setShowReceipt(true);
      setIsAskingPrint(true);
      setCart([]);
      setPaymentMethod(null);
      setCashReceived('');
    } catch (error) {
      setIsFinishing(false);
      alert('Erro ao salvar venda. Verifique sua conexão.');
    }
  };

  const handlePrint = () => {
    if (!completedSale) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const receiptContent = `
      <html>
        <head>
          <title>Cupom Fiscal - Gestão Empresarial</title>
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 0; padding: 2mm; }
            }
            body { 
              font-family: 'Courier New', Courier, monospace; 
              width: 80mm; 
              margin: 0 auto;
              font-size: 13px;
              line-height: 1.5;
              color: #000;
              background: #fff;
              padding: 4mm;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .header { margin-bottom: 5mm; border-bottom: 1px dashed #000; padding-bottom: 3mm; }
            .store-name { font-size: 18px; margin: 0; letter-spacing: 1px; }
            .line { display: flex; justify-content: space-between; gap: 2mm; width: 100%; }
            .items { margin: 3mm 0; }
            .item-row { margin-bottom: 2mm; border-bottom: 0.5px solid #eee; padding-bottom: 1mm; }
            .total-section { margin-top: 3mm; border-top: 2px double #000; padding-top: 3mm; font-size: 15px; }
            .footer { margin-top: 6mm; border-top: 1px dashed #000; padding-top: 3mm; text-align: center; font-size: 11px; }
            .customer-info { margin: 3mm 0; padding: 3mm; border: 1px solid #000; font-size: 12px; background: #f9f9f9; }
            .divider { border-top: 1px dashed #000; margin: 3mm 0; }
            .price-calc { font-size: 11px; color: #333; margin-top: 0.5mm; }
          </style>
        </head>
        <body>
          <div class="header center">
            <p class="store-name bold uppercase">Gestão Empresarial</p>
            <p class="bold leading-tight">Supermercado Silva</p>
            <p>CNPJ: 12.345.678/0001-90</p>
            <p>Rua das Flores, 123 - SÃo Paulo/SP</p>
            <p class="divider"></p>
            <p class="bold">CUPOM DE VENDA (NÃO FISCAL)</p>
            <p>Data: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}</p>
            <p>Venda: #${completedSale.id}</p>
          </div>
          
          ${completedSale.customer ? `
          <div class="customer-info">
            <p class="bold uppercase">Cliente:</p>
            <p>${completedSale.customer.name}</p>
            <p>Doc: ${completedSale.customer.id}</p>
          </div>
          ` : ''}

          <div class="items">
            <div class="line bold">
              <span>DESCRIÇÃO</span>
              <span>TOTAL</span>
            </div>
            ${completedSale.items.map(item => `
              <div class="item-row">
                <div class="line">
                  <span class="bold">${item.name.toUpperCase()}</span>
                  <span class="bold">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="price-calc">
                  Qtd: ${item.quantity} x R$ ${item.price.toFixed(2)}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="total-section">
            <div class="line bold">
              <span>VALOR BRUTO</span>
              <span>R$ ${completedSale.total.toFixed(2)}</span>
            </div>
            <div class="line">
                <span>PAGAMENTO (${completedSale.method.toUpperCase()})</span>
            </div>
            
            ${completedSale.method === 'cash' ? `
              <div class="line">
                <span>RECEBIDO:</span>
                <span>R$ ${completedSale.cashReceived?.toFixed(2)}</span>
              </div>
              <div class="line bold">
                <span>TROCO:</span>
                <span>R$ ${completedSale.change?.toFixed(2)}</span>
              </div>
            ` : ''}

            <div class="line bold" style="font-size: 15px; margin-top: 2mm;">
              <span>TOTAL PAGO</span>
              <span>R$ ${completedSale.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>Volte Sempre!</p>
            <p>Desenvolvido por Delta Automações Comerciais v1.0</p>
            <p>www.deltaautomacoes.com.br</p>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(receiptContent);
    printWindow.document.close();
  };

  const handlePrintOrder = () => {
    if (cart.length === 0) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const receiptContent = `
      <html>
        <head>
          <title>Conferência de Pedido - Gestão Empresarial</title>
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 0; padding: 2mm; }
            }
            body { 
              font-family: 'Courier New', Courier, monospace; 
              width: 80mm; 
              margin: 0 auto;
              font-size: 13px;
              line-height: 1.5;
              color: #000;
              background: #fff;
              padding: 4mm;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .header { margin-bottom: 5mm; border-bottom: 1px dashed #000; padding-bottom: 3mm; }
            .store-name { font-size: 18px; margin: 0; letter-spacing: 1px; }
            .line { display: flex; justify-content: space-between; gap: 2mm; width: 100%; }
            .items { margin: 3mm 0; }
            .item-row { margin-bottom: 2mm; border-bottom: 0.5px solid #eee; padding-bottom: 1mm; }
            .total-section { margin-top: 3mm; border-top: 2px double #000; padding-top: 3mm; font-size: 15px; }
            .footer { margin-top: 6mm; border-top: 1px dashed #000; padding-top: 3mm; text-align: center; font-size: 11px; }
            .customer-info { margin: 3mm 0; padding: 3mm; border: 1px solid #000; font-size: 12px; background: #f9f9f9; }
            .divider { border-top: 1px dashed #000; margin: 3mm 0; }
            .price-calc { font-size: 11px; color: #333; margin-top: 0.5mm; }
          </style>
        </head>
        <body>
          <div class="header center">
            <p class="store-name bold uppercase">Gestão Empresarial ERP</p>
            <p class="bold">PREVIA DE PEDIDO</p>
            <p>Data: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}</p>
          </div>
          
          ${selectedCustomer ? `
          <div class="customer-info">
            <p class="bold uppercase">Cliente:</p>
            <p>${selectedCustomer.name}</p>
          </div>
          ` : ''}

          <div class="items">
            ${cart.map(item => `
              <div class="item-row">
                <div class="line">
                  <span class="bold">${item.name.toUpperCase()}</span>
                  <span class="bold">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="price-calc">
                  Qtd: ${item.quantity} x R$ ${item.price.toFixed(2)}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="total-section">
            <div class="line bold">
              <span>TOTAL DO PEDIDO</span>
              <span>R$ ${total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>Este documento não é cupom fiscal</p>
            <p>Apenas para conferência</p>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(receiptContent);
    printWindow.document.close();
  };

  return (
    <div className="h-screen flex bg-graphite-dark">
      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceipt && completedSale && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/90 backdrop-blur-sm"
              onClick={() => setShowReceipt(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md max-h-[90vh] bg-white text-graphite-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <AnimatePresence>
                {isAskingPrint && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-graphite-dark/95 backdrop-blur-sm flex items-center justify-center p-8 text-center"
                  >
                    <div className="space-y-6">
                      <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto">
                        <Printer className="w-8 h-8 text-neon-green" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Imprimir Comprovante?</h3>
                        <p className="text-soft-white/60 text-sm mt-2">Deseja enviar para a impressora agora?</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => {
                            handlePrint();
                            setIsAskingPrint(false);
                          }}
                          className="py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                          SIM
                        </button>
                        <button 
                          onClick={() => setIsAskingPrint(false)}
                          className="py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 active:scale-95 transition-all border border-white/10"
                        >
                          NÃƒO
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-6 text-center shrink-0 border-b border-gray-100">
                <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-3">
                   <Receipt className="w-6 h-6 text-graphite-dark" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">Venda Finalizada</h3>
                <p className="text-xs text-gray-500">Comprovante #{completedSale.id}</p>
                {completedSale.customer && (
                  <div className="mt-2 text-[10px] font-bold text-neon-green uppercase bg-neon-green/5 px-2 py-1 rounded-full border border-neon-green/20 w-fit mx-auto">
                    Cliente: {completedSale.customer.name}
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2 border-b border-dashed border-gray-200">
                {completedSale.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs font-medium">
                    <span className="text-gray-600">{item.quantity}x {item.name}</span>
                    <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 space-y-3 shrink-0">
                 <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-400">
                        <span>MÃ©todo</span>
                        <span>{completedSale.method}</span>
                    </div>
                    {completedSale.method === 'cash' && (
                      <>
                        <div className="flex justify-between items-center text-xs font-medium text-gray-600">
                            <span>Recebido</span>
                            <span>R$ {completedSale.cashReceived?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-neon-green bg-neon-green/5 p-1 rounded">
                            <span>TROCO</span>
                            <span>R$ {completedSale.change?.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                 </div>
                 
                 <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-sm font-black italic text-gray-400">VALOR TOTAL</span>
                    <span className="text-2xl font-black">R$ {completedSale.total.toFixed(2)}</span>
                 </div>

                 <button 
                  onClick={() => setShowReceipt(false)}
                  className="w-full py-3 bg-graphite-dark text-white font-bold rounded-xl hover:bg-black transition-colors text-sm"
                 >
                   FECHAR COMPROVANTE
                 </button>

                 <div className="flex justify-center gap-6 pt-1">
                    <button 
                      onClick={handlePrint}
                      className="text-[10px] font-bold text-gray-400 hover:text-graphite-dark flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" /> IMPRIMIR
                    </button>
                    <button className="text-[10px] font-bold text-gray-400 hover:text-graphite-dark flex items-center gap-1.5 transition-colors">
                      <Smartphone className="w-3.5 h-3.5" /> WHATSAPP
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Side: Product Selection */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-white/30" />
            <input 
              type="text" 
              placeholder="Pesquisar produto pelo nome ou código de barras..." 
              className="w-full bg-graphite border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-soft-white placeholder:text-soft-white/20 focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-neon-green/10 rounded-lg">
                <ScanLine className="w-5 h-5 text-neon-green" />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedCustomer(selectedCustomer ? null : { name: 'João Silva', id: '123.456.789-00' })}
              className={cn(
                "p-4 border rounded-2xl transition-all flex items-center gap-2",
                selectedCustomer ? "bg-neon-green border-neon-green text-graphite-dark" : "bg-graphite border-white/10 text-soft-white hover:bg-white/5"
              )}
              title={selectedCustomer ? "Remover Cliente" : "Identificar Cliente"}
            >
              <Users className="w-6 h-6" />
              {selectedCustomer && <span className="text-xs font-bold truncate max-w-[100px]">{selectedCustomer.name.split(' ')[0]}</span>}
            </button>
            <button 
              onClick={() => navigate('/')}
              className="p-4 bg-graphite border border-white/10 rounded-2xl hover:bg-white/5 transition-colors"
            >
                <X className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </header>

        
      </div>

      {/* Right Side: Cart and Payment */}
      <div className="w-[420px] bg-graphite border-l border-white/10 flex flex-col shadow-2xl">
        <div className="p-6 border-bottom border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon-green/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-neon-green" />
            </div>
            <h2 className="font-bold text-lg">Carrinho</h2>
          </div>
          <div className="text-xs text-soft-white/40 font-mono">#{Math.floor(Math.random() * 99999)}</div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-4 py-4">
          <AnimatePresence mode="popLayout">
            {cart.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key={item.productId}
                className="flex gap-4 items-center group"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1 line-clamp-1">{item.name}</div>
                  <div className="text-xs text-soft-white/40">R$ {item.price.toFixed(2)} / un</div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.productId, -1)} className="p-1 hover:text-neon-green"><Minus className="w-3 h-3" /></button>
                  <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, 1)} className="p-1 hover:text-neon-green"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="text-right w-20">
                  <div className="text-sm font-bold">R$ {(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="opacity-0 group-hover:opacity-100 p-2 text-soft-white/20 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center py-20">
              <ShoppingCart className="w-16 h-16 mb-4" />
              <p>Carrinho vazio</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center px-6 py-3 border-t border-white/5">
          <button 
            onClick={handlePrintOrder}
            disabled={cart.length === 0}
            className="text-[10px] font-bold text-soft-white/40 hover:text-neon-green flex items-center gap-2 transition-colors disabled:opacity-30"
          >
            <Printer className="w-4 h-4" /> IMPRIMIR CONFERÊNCIA
          </button>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-soft-white/60 text-sm">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-soft-white/60 text-sm">
                <span>Desconto</span>
                <span className="text-neon-green">- R$ 0,00</span>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">TOTAL</span>
                <span className="text-3xl font-black text-neon-green">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'pix', icon: Smartphone, label: 'PIX' },
              { id: 'card', icon: CreditCard, label: 'CartÃ£o' },
              { id: 'cash', icon: Banknote, label: 'Dinheiro' },
            ].map(method => (
              <button
                key={method.id}
                onClick={() => {
                  setPaymentMethod(method.id);
                  if (method.id !== 'cash') setCashReceived('');
                }}
                className={cn(
                  "flex flex-col items-center py-3 border rounded-xl transition-all",
                  paymentMethod === method.id 
                    ? "bg-neon-green/20 border-neon-green text-neon-green" 
                    : "bg-white/5 border-white/5 text-soft-white/40 hover:bg-white/10"
                )}
              >
                <method.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold">{method.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {paymentMethod === 'cash' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-soft-white/60 font-bold uppercase tracking-wider">Valor Recebido</span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-soft-white/40">R$</span>
                      <input 
                        type="number"
                        className="bg-white/5 border border-white/10 rounded-xl py-2 pl-8 pr-4 text-right font-bold w-32 focus:border-neon-green outline-none"
                        value={cashReceived}
                        onChange={(e) => setCashReceived(e.target.value)}
                        placeholder="0,00"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/5 text-neon-green">
                    <span className="text-xs font-bold uppercase tracking-wider">Troco</span>
                    <span className="text-xl font-black">R$ {change.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleFinishSale}
            className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:grayscale disabled:scale-100" 
            disabled={cart.length === 0 || !paymentMethod || (paymentMethod === 'cash' && (!cashReceived || Number(cashReceived) < total)) || isFinishing}
          >
            {isFinishing ? (
              <div className="w-6 h-6 border-4 border-graphite-dark/30 border-t-graphite-dark rounded-full animate-spin"></div>
            ) : (
              <>
                <Receipt className="w-5 h-5" />
                FINALIZAR VENDA
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
src/pages/Settings.tsximport { doc, setDoc, getDoc, getDocs, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Bell, 
  CreditCard,
  Cloud,
  Terminal,
  Store,
  ChevronRight,
  Monitor,
  Tags,
  Plus,
  Trash2,
  Edit2,
  X,
  Save
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const SettingsPage = () => {
  const { businessId, user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [generatedKey, setGeneratedKey] = useState('');
  const [licenseHistory, setLicenseHistory] = useState<any[]>([]);
  const [business, setBusiness] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [interfaceConfig, setInterfaceConfig] = useState<any>(null);
  const [notifConfig, setNotifConfig] = useState<any>(null);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    cnpj: '',
    address: '',
    website: '',
    crt: 'Simples Nacional'
  });

  useEffect(() => {
    if (!businessId) return;
    const unsubBusiness = dataService.subscribeBusiness(businessId, (data) => {
      setBusiness(data);
      if (data) {
        setProfileForm({
          name: data.name || '',
          cnpj: data.cnpj || '',
          address: data.address || '',
          website: data.website || '',
          crt: data.crt || 'Simples Nacional'
        });
      }
    });
    const unsubCats = dataService.subscribeCategories(businessId, setCategories);
    const unsubInterface = dataService.subscribeConfig(businessId, 'interface', setInterfaceConfig);
    const unsubNotif = dataService.subscribeConfig(businessId, 'notifications', setNotifConfig);

    return () => {
      unsubBusiness();
      unsubCats();
      unsubInterface();
      unsubNotif();
    };
  }, [businessId]);

  useEffect(() => {
    if (activeTab === 'license' && user?.email === 'valdneylima71@gmail.com') {
      const q = query(collection(db, 'licenses'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        setLicenseHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return unsub;
    }
  }, [activeTab, user]);

  const handleActivateAll = async () => {
    if (!businessId) return;
    await handleUpdateInterface({ darkMode: true, compactMode: true });
    await handleUpdateNotif({ lowStock: true, dailyReport: true });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;
    await dataService.updateBusiness(businessId, profileForm);
    setShowEditProfileModal(false);
  };

  const handleUpdateInterface = async (data: any) => {
    if (!businessId) return;
    await dataService.updateConfig(businessId, 'interface', data);
  };

  const handleUpdateNotif = async (data: any) => {
    if (!businessId) return;
    await dataService.updateConfig(businessId, 'notifications', data);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId || !newCategoryName.trim()) return;

    if (editingCategory) {
      await dataService.updateCategory(businessId, editingCategory.id, newCategoryName.trim());
    } else {
      await dataService.addCategory(businessId, newCategoryName.trim());
    }

    setNewCategoryName('');
    setEditingCategory(null);
    setShowAddCategoryModal(false);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!businessId) return;
    if (window.confirm('Deseja realmente remover esta categoria? Isto afetará os produtos vinculados.')) {
      await dataService.deleteCategory(businessId, categoryId);
    }
  };

  const tabStyle = (id: string) => cn(
    "w-full text-left px-4 py-4 rounded-2xl flex items-center gap-4 transition-all group border border-transparent",
    activeTab === id 
      ? "bg-neon-green/10 border-neon-green/20 text-neon-green" 
      : "bg-graphite border-white/5 hover:border-white/20 hover:bg-white/5"
  );

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Ajustes</h1>
        <p className="text-soft-white/60">Gerencie sua conta, lojas e preferências do sistema.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-3">
          <button onClick={() => setActiveTab('profile')} className={tabStyle('profile')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'profile' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Store className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Perfil da Loja</div>
          </button>
          
          <button onClick={() => setActiveTab('categories')} className={tabStyle('categories')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'categories' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Tags className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Categorias</div>
          </button>

          <button onClick={() => setActiveTab('interface')} className={tabStyle('interface')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'interface' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Monitor className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Interface</div>
          </button>

          <button onClick={() => setActiveTab('notifications')} className={tabStyle('notifications')}>
            <div className={cn("p-2 rounded-lg", activeTab === 'notifications' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 text-sm font-bold">Notificações</div>
          </button>
          {user?.email === 'valdneylima71@gmail.com' && (
            <button onClick={() => setActiveTab('license')} className={tabStyle('license')}>
              <div className={cn("p-2 rounded-lg", activeTab === 'license' ? "bg-neon-green text-graphite-dark" : "bg-white/5 text-soft-white/40")}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 text-sm font-bold">Gerador de Licença</div>
            </button>
          )}
        </aside>

        <main className="md:col-span-3 space-y-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Store Profile */}
              <div className="bg-graphite rounded-3xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-neon-green/10 rounded-2xl border border-neon-green/20 flex items-center justify-center">
                      <Store className="w-8 h-8 text-neon-green" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg leading-none mb-1">{business?.name || 'Sua Loja'}</h2>
                      <p className="text-xs text-soft-white/40">ID do Comércio: #{businessId?.slice(-8).toUpperCase()}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowEditProfileModal(true)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
                  >
                    Editar Perfil
                  </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <Building2 className="w-4 h-4" />
                      <span>CNPJ: {business?.cnpj || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <MapPin className="w-4 h-4" />
                      <span>{business?.address || 'Endereço não informado'}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <Globe className="w-4 h-4" />
                      <span>{business?.website || 'Website não informado'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-soft-white/60">
                      <ShieldCheck className="w-4 h-4" />
                      <span>CRT: {business?.crt || 'Simples Nacional'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-6"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-xl font-bold">Categorias de Produtos</h2>
                  <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Organize seu estoque por grupos</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingCategory(null);
                    setNewCategoryName('');
                    setShowAddCategoryModal(true);
                  }}
                  className="px-4 py-2 bg-neon-green text-graphite-dark font-bold rounded-xl text-xs hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> NOVA CATEGORIA
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                        <Tags className="w-4 h-4 text-soft-white/40" />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{cat.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => {
                          setEditingCategory(cat);
                          setNewCategoryName(cat.name);
                          setShowAddCategoryModal(true);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-soft-white/40 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-soft-white/40 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="col-span-2 py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-sm text-soft-white/20 italic">Ainda não hÃ¡ categorias. Comece criando uma!</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {activeTab === 'interface' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-8"
            >
              <div className="flex justify-between items-start">
                <div>
           <h2 className="text-xl font-bold">Interface & Experiência</h2>
                  <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Personalize o visual do seu PDV</p>
                </div>
                <button 
                  onClick={handleActivateAll}
                  className="px-4 py-2 bg-neon-green/10 text-neon-green border border-neon-green/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neon-green hover:text-graphite-dark transition-all"
                >
                  Ativar Tudo
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Modo Dark Automático</h4>
                    <p className="text-xs text-soft-white/40">Alterna cores baseado no horário local.</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateInterface({ darkMode: !interfaceConfig?.darkMode })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      interfaceConfig?.darkMode ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      interfaceConfig?.darkMode ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Layout do PDV Compacto</h4>
                    <p className="text-xs text-soft-white/40">Reduz o tamanho dos cards para telas menores.</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateInterface({ compactMode: !interfaceConfig?.compactMode })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      interfaceConfig?.compactMode ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      interfaceConfig?.compactMode ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'notifications' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-8"
            >
              <div>
                <h2 className="text-xl font-bold">Alertas & Notificações</h2>es</h2>
                <p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">Configure avisos automáticos do sistema</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Aviso de Estoque Baixo</h4>
                    <p className="text-xs text-soft-white/40">Notificar quando um produto atingir o limite mínimo.</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateNotif({ lowStock: !notifConfig?.lowStock })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      notifConfig?.lowStock ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      notifConfig?.lowStock ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Resumo de Vendas Diárias</h4>

<p className="text-xs text-soft-white/40">
  Enviar relatório por e-mail ao fechar o caixa.
</p>
                  </div>
                  <button 
                    onClick={() => handleUpdateNotif({ dailyReport: !notifConfig?.dailyReport })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      notifConfig?.dailyReport ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                      notifConfig?.dailyReport ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'license' && user?.email === 'valdneylima71@gmail.com' && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-graphite p-8 rounded-3xl border border-white/5 space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold">Gerador de Licença</h2>

<p className="text-xs text-soft-white/40 uppercase tracking-widest font-bold mt-1">
  Crie chaves de ativação premium
</p>
              </div>

              {generatedKey && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <code className="text-neon-green font-mono text-sm tracking-widest">{generatedKey}</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedKey);
                      alert('Chave copiada!');
                    }}
                    className="text-[10px] font-bold text-soft-white/60 hover:text-white transition-colors"
                  >
                    COPIAR
                  </button>
                </div>
              )}

              <button 
                onClick={async () => {
                  const part = () => Math.random().toString(36).substr(2, 4).toUpperCase();
                  const newKey = `${part()}-${part()}-${part()}-${part()}`;
                  try {
                    await setDoc(doc(db, 'licenses', newKey), {
                      key: newKey,
                      active: true,
                      createdAt: new Date().toISOString()
                    });
                    setGeneratedKey(newKey);
                  } catch (e) {
                    handleFirestoreError(e, OperationType.WRITE, 'licenses');
                  }
                }}
                className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                GERAR NOVA CHAVE
              </button>

              <div className="mt-8 space-y-4">
                <h3 className="font-bold">HistÃ³rico de Chaves</h3>
                <div className="space-y-2">
                  {licenseHistory.map((lic: any) => (
                    <div key={lic.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                      <code className="font-mono text-xs">{lic.key}</code>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-[10px] uppercase font-bold", lic.active ? "text-neon-green" : "text-red-500")}>
                          {lic.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {licenseHistory.length === 0 && <p className="text-xs text-soft-white/40 italic">Nenhuma chave gerada ainda.</p>}
                </div>
              </div>
            </motion.section>
          )}
        </main>
      </div>

      {/* Modal Categoria */}
      <AnimatePresence>
        {showAddCategoryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowAddCategoryModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold tracking-tight">{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h3>
                <button onClick={() => setShowAddCategoryModal(false)}>
                  <X className="w-6 h-6 text-soft-white/20 hover:text-white transition-colors" />
                </button>
              </div>

              <form onSubmit={handleAddCategory} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome da Categoria</label>
                  <input 
                    required autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:border-neon-green" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                  <Save className="w-5 h-5" /> {editingCategory ? 'ATUALIZAR' : 'CADASTRAR'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Editar Perfil */}
      <AnimatePresence>
        {showEditProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm"
              onClick={() => setShowEditProfileModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-graphite rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold tracking-tight">Editar Perfil da Loja</h3>
                <button onClick={() => setShowEditProfileModal(false)}>
                  <X className="w-6 h-6 text-soft-white/20 hover:text-white transition-colors" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Nome da Loja</label>
                    <input 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">CNPJ</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.cnpj}
                      onChange={(e) => setProfileForm({...profileForm, cnpj: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">Website</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({...profileForm, website: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">
  Endereço Completo
</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green" 
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-bold text-soft-white/40 uppercase tracking-widest">
  Regime Tributário (CRT)
</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-neon-green appearance-none"
                      value={profileForm.crt}
                      onChange={(e) => setProfileForm({...profileForm, crt: e.target.value})}
                    >
                      <option value="Simples Nacional">Simples Nacional</option>
                      <option value="Regime Normal">Regime Normal</option>
                      <option value="Microempreendedor Individual (MEI)">MEI</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                  <Save className="w-5 h-5" /> SALVAR ALTERAÇÕES
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
};
src/pages/Upgrade.tsximport React, { useState } from 'react';
import { ShieldCheck, Phone, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const UpgradePage = () => {
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'invalid' | 'success'>('idle');

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const licenseRef = doc(db, 'licenses', key.trim());
      const licenseSnap = await getDoc(licenseRef);

      if (licenseSnap.exists() && licenseSnap.data().active) {
        // Mark key as used
        await updateDoc(licenseRef, { active: false });
        // Mark user as pro
        if (auth.currentUser) {
          const userRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(userRef, { isPro: true });
        }
        setStatus('success');
        alert('Chave validada com sucesso! Conta ativada.');
      } else {
        setStatus('invalid');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'licenses');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-graphite p-8 rounded-3xl border border-white/5 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-neon-green/10 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-neon-green" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Ativação de Conta</h2>

<p className="text-soft-white/60">
  Insira sua chave de ativação para liberar os recursos Premium.
</p>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <input 
            type="text" 
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-neon-green"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          {status === 'invalid' && (
  <p className="text-red-500 text-xs font-bold">
    Chave inválida. Tente novamente.
  </p>
)}

{status === 'success' && (
  <p className="text-neon-green text-xs font-bold">
    Chave ativada com sucesso!
  </p>
)}

<button
  type="submit"
  className="w-full py-4 bg-neon-green text-graphite-dark font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
>
  <Zap className="w-5 h-5" /> ATIVAR LICENÇA
</button>

        <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-soft-white/40">Precisa de ajuda? Entre em contato</h3>
          <a 
            href="https://wa.me/5541988228676?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20a%20ativa%C3%A7%C3%A3o%20do%20meu%20ERP."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 py-3 px-6 bg-white/5 hover:bg-neon-green hover:text-graphite-dark rounded-xl transition-all font-bold"
          >
            <Phone className="w-5 h-5" /> (41) 98822-8676
          </a>
        </div>
      </motion.div>
    </div>
  );
};
src/services/dataService.tsimport { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dataService = {
  // Products
  subscribeProducts: (businessId: string, callback: (products: any[]) => void) => {
    const path = `businesses/${businessId}/products`;
    const q = query(collection(db, path), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addProduct: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/products`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  updateProduct: async (businessId: string, productId: string, data: any) => {
    const path = `businesses/${businessId}/products/${productId}`;
    try {
      const docRef = doc(db, path);
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deleteProduct: async (businessId: string, productId: string) => {
    const path = `businesses/${businessId}/products/${productId}`;
    try {
      const docRef = doc(db, path);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Sales
  addSale: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/sales`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  subscribeSales: (businessId: string, callback: (sales: any[]) => void) => {
    const path = `businesses/${businessId}/sales`;
    const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  // Customers
  subscribeCustomers: (businessId: string, callback: (customers: any[]) => void) => {
    const path = `businesses/${businessId}/customers`;
    const q = query(collection(db, path), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addCustomer: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/customers`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  deleteCustomer: async (businessId: string, customerId: string) => {
    const path = `businesses/${businessId}/customers/${customerId}`;
    try {
      const docRef = doc(db, path);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  updateCustomer: async (businessId: string, customerId: string, data: any) => {
    const path = `businesses/${businessId}/customers/${customerId}`;
    try {
      const docRef = doc(db, path);
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // Financial transactions
  addTransaction: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/finance`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  subscribeTransactions: (businessId: string, callback: (transactions: any[]) => void) => {
    const path = `businesses/${businessId}/finance`;
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  // Categories
  subscribeCategories: (businessId: string, callback: (categories: any[]) => void) => {
    const path = `businesses/${businessId}/categories`;
    const q = query(collection(db, path), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addCategory: async (businessId: string, name: string) => {
    const path = `businesses/${businessId}/categories`;
    try {
      return await addDoc(collection(db, path), {
        name,
        businessId,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  updateCategory: async (businessId: string, categoryId: string, name: string) => {
    const path = `businesses/${businessId}/categories/${categoryId}`;
    try {
      const docRef = doc(db, path);
      return await updateDoc(docRef, { name });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deleteCategory: async (businessId: string, categoryId: string) => {
    const path = `businesses/${businessId}/categories/${categoryId}`;
    try {
      const docRef = doc(db, path);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Invoices (NF-e / NFC-e)
  subscribeInvoices: (businessId: string, callback: (data: any[]) => void) => {
    const path = `businesses/${businessId}/invoices`;
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(docs);
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  addInvoice: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/invoices`;
    try {
      return await addDoc(collection(db, path), {
        ...data,
        businessId,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  // Business Profile
  subscribeBusiness: (businessId: string, callback: (data: any) => void) => {
    const path = `businesses/${businessId}`;
    const docRef = doc(db, path);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  updateBusiness: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}`;
    const docRef = doc(db, path);
    try {
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      const { setDoc } = await import('firebase/firestore');
      return await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    }
  },

  // Generic Config
  subscribeConfig: (businessId: string, configId: string, callback: (data: any) => void) => {
    const path = `businesses/${businessId}/config/${configId}`;
    const docRef = doc(db, path);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  updateConfig: async (businessId: string, configId: string, data: any) => {
    const path = `businesses/${businessId}/config/${configId}`;
    const docRef = doc(db, path);
    try {
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      const { setDoc } = await import('firebase/firestore');
      return await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    }
  },

  // Fiscal Config (includes Digital Certificate)
  subscribeFiscalConfig: (businessId: string, callback: (data: any) => void) => {
    const path = `businesses/${businessId}/config/fiscal`;
    const docRef = doc(db, path);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, path));
  },

  updateFiscalConfig: async (businessId: string, data: any) => {
    const path = `businesses/${businessId}/config/fiscal`;
    const docRef = doc(db, path);
    try {
      // We use setDoc indirectly or update with merge
      return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      // If doc doesn't exist, updateDoc fails.
      // Actually, let's use a pattern that works even if it doesn't exist.
      const { setDoc } = await import('firebase/firestore');
      return await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    }
  }
};
src/services/geminiService.tsimport { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getFinancialInsights(data: any) {
  try {
    const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: `Você é um consultor financeiro especializado em pequenos mercados. 
  Analise estes dados de vendas e estoque: ${JSON.stringify(data)}.
  Forneça 2 insights curtos e práticos sobre o que o dono do mercado deve fazer hoje para aumentar o lucro ou evitar perdas. 
  Retorne em formato JSON com um campo 'insights' que é um array de strings.`,
  config: {
    responseMimeType: "application/json"
  }
});
      }
    });

    const json = JSON.parse(response.text || '{"insights": []}');
    return json.insights;
  } catch (error) {
    console.error("Erro ao obter insights da IA:", error);
    return [
      "O pão francês está com alta demanda hoje.",
"Verifique o estoque de bebidas geladas."
    ];
  }
}

export async function getInventorySuggestions(products: any[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analise este estoque: ${JSON.stringify(products)}. 
        Identifique 2 produtos que precisam de reposição urgente baseando-se no estoque mínimo.
        Retorne em formato JSON com um campo 'suggestions' que é um array de strings.
        config: {
          responseMimeType: "application/json"
        }
      });
  
      const json = JSON.parse(response.text || '{"suggestions": []}');
      return json.suggestions;
    } catch (error) {
     console.error("Erro ao obter sugestões de estoque:", error);
      return [];
    }
  }
src/types.tsexport interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'pix' | 'cash' | 'credit' | 'debit';
  timestamp: Date;
}
tsconfig.json{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
vite.config.tsimport tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do notDo not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
README.md<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/60690dff-d19a-4d04-a34f-f957c3c2704c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

metadata.json
.env.example
.gitignore
firebase-applet-config.json
firebase-blueprint.json
firestore.rules
index.html
package-lock.json
package.json
server.ts
src/
src/App.tsx

src/contexts/
src/contexts/AuthContext.tsx

src/index.css
src/lib/
src/lib/exportUtils.ts
src/lib/firebase.ts
src/lib/utils.ts
src/main.tsx

src/pages/
src/pages/CRM.tsx
src/pages/Dashboard.tsx
src/pages/Finance.tsx
src/pages/Inventory.tsx
src/pages/Invoices.tsx
src/pages/Login.tsx
src/pages/POS.tsx
src/pages/Settings.tsx
src/pages/Upgrade.tsx

src/services/

src/services/dataService.ts
src/services/geminiService.ts
ð‹«\3R–src/types.ts
tsconfig.json
vite.config.README.md
