# Guía de Pruebas

Este documento explica cómo ejecutar las pruebas en el proyecto y proporciona información sobre la cobertura de código.

## Tipos de Pruebas

El proyecto incluye dos tipos principales de pruebas:

1. **Pruebas Unitarias**: Prueban componentes individuales de forma aislada.
2. **Pruebas de Integración**: Prueban la interacción entre componentes y endpoints de la API.

## Comandos de Prueba

### Instalar Dependencias

Asegúrate de tener todas las dependencias de desarrollo instaladas:

```bash
npm install
```

### Ejecutar Todas las Pruebas

```bash
npm test
```

### Ejecutar Solo Pruebas Unitarias

```bash
npm run test:unit
```

### Ejecutar Solo Pruebas de Integración

```bash
npm run test:integration
```

### Ejecutar Pruebas con Cobertura

```bash
npm run test:coverage
```

### Ver Informe de Cobertura

Después de ejecutar las pruebas con cobertura, puedes ver el informe en:

```bash
# Abrir el informe de cobertura en el navegador
start coverage/lcov-report/index.html
```

## Estructura de las Pruebas

### Pruebas Unitarias

Las pruebas unitarias se encuentran en `src/__tests__/unit/` y cubren:

- Modelo de Usuario
- Servicio de Usuario
- Utilidades

### Pruebas de Integración

Las pruebas de integración se encuentran en `src/__tests__/integration/` y cubren:

- Endpoints de la API
- Rutas
- Controladores
- Manejo de errores

## Ejemplos de Pruebas

### Ejecutar una Prueba Específica

Para ejecutar una prueba específica por su nombre:

```bash
npm test -- -t 'debe crear un nuevo usuario'
```

### Depuración de Pruebas

Puedes depurar las pruebas usando `console.log()` o configurando puntos de interrupción en tu editor.

Para ejecutar las pruebas en modo de inspección:

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Cobertura de Código

El proyecto mantiene un umbral de cobertura del 80% para ramas y del 90% para declaraciones. Puedes ver el informe detallado en:

```
coverage/lcov-report/index.html
```

## Solución de Problemas

### Errores Comunes

1. **Puerto en uso**: Si el puerto 3000 está en uso, puedes cambiarlo en `index.js`
2. **Problemas con la base de datos**: La base de datos en memoria se reinicia con cada ejecución
3. **Fallos en las pruebas**: Verifica que no haya usuarios duplicados o datos inconsistentes

### Limpieza de Datos de Prueba

Para limpiar los datos entre pruebas, usa la función `limpiarDatosPrueba()` del archivo de utilidades de prueba.

## Buenas Prácticas

1. **Nombres descriptivos**: Usa nombres descriptivos para los tests
2. **Pruebas aisladas**: Cada prueba debe ser independiente de las demás
3. **Mocks y stubs**: Usa mocks para dependencias externas
4. **Cobertura**: Mantén una alta cobertura de código
# En Windows
explorer coverage\lcov-report\index.html

# En macOS
open coverage/lcov-report/index.html

# En Linux
xdg-open coverage/lcov-report/index.html
```

## Estructura de las Pruebas

```
__tests__/
├── integration/      # Pruebas de integración
│   └── *.test.js    # Archivos de prueba de integración
└── unit/            # Pruebas unitarias
    └── *.test.js    # Archivos de prueba unitaria
```

## Escribiendo Nuevas Pruebas

### Pruebas Unitarias

Las pruebas unitarias deben ubicarse en el directorio `__tests__/unit/`. Cada archivo de prueba debe seguir el patrón `[nombre].test.js`.

Ejemplo de una prueba unitaria:

```javascript
describe('MiComponente', () => {
  it('debe hacer algo correctamente', () => {
    // Configuración
    const input = 'entrada';
    
    // Ejecución
    const resultado = miFuncion(input);
    
    // Verificación
    expect(resultado).toBe('resultado esperado');
  });
});
```

### Pruebas de Integración

Las pruebas de integración deben ubicarse en el directorio `__tests__/integration/`.

Ejemplo de una prueba de integración:

```javascript
describe('API /usuarios', () => {
  it('debe crear un nuevo usuario', async () => {
    const nuevoUsuario = {
      nombre: 'Test User',
      email: 'test@example.com'
    };

    const response = await request(app)
      .post('/api/usuarios')
      .send(nuevoUsuario);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
```

## Depuración de Pruebas

Para depurar pruebas, puedes usar `console.log()` o configurar puntos de interrupción en tu editor.

### Depuración en VS Code

1. Abre el archivo de prueba
2. Establece puntos de interrupción
3. Ve a la pestaña "Run and Debug" (Ctrl+Shift+D)
4. Selecciona "Jest Current File" y presiona F5

## Buenas Prácticas

1. **Nombres descriptivos**: Usa nombres que describan claramente lo que hace la prueba.
2. **Una aserción por prueba**: Idealmente, cada prueba debe verificar una sola cosa.
3. **Pruebas independientes**: Cada prueba debe poder ejecutarse de forma aislada.
4. **Datos de prueba**: Usa datos de prueba realistas pero simples.
5. **Limpieza**: Asegúrate de limpiar cualquier dato de prueba después de cada prueba.

## Solución de Problemas Comunes

### Las pruebas son lentas

- Verifica que no estés realizando operaciones de red innecesarias
- Asegúrate de limpiar correctamente los datos entre pruebas

### Las pruebas fallan aleatoriamente

- Verifica que las pruebas sean independientes entre sí
- Asegúrate de que los datos de prueba sean consistentes
- Verifica condiciones de carrera

### Errores de tiempo de espera

- Aumenta el tiempo de espera si es necesario:
  ```javascript
  it('prueba lenta', async () => {
    // Código de prueba
  }, 10000); // 10 segundos de tiempo de espera
  ```

## Recursos Adicionales

- [Documentación de Jest](https://jestjs.io/)
- [Documentación de Supertest](https://github.com/visionmedia/supertest)
