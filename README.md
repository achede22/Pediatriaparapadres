# Pediatría para Padres

Una aplicación web diseñada para orientar a padres y cuidadores en el cuidado de la salud infantil.

## Características

- **Chequeo de Síntomas**: Guía interactiva para identificar posibles causas de malestar.
- **Calculadora de Lavado Nasal**: Herramienta para preparar la solución salina exacta según el peso del niño.
- **Información para Padres**: Consejos sobre cuidado, alimentación, vacunación y desarrollo.
- **Emergencias**: Guías rápidas de primeros auxilios y números de emergencia.

## Desarrollo Local

Para probar la aplicación en tu computadora local:

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Esto abrirá la aplicación en tu navegador (generalmente en `http://localhost:3000` o similar).

3.  **Construir para producción**:
    ```bash
    npm run build
    ```

## Despliegue

Esta aplicación está configurada para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

Cada vez que se hace un `push` a la rama `main`, el flujo de trabajo en `.github/workflows/deploy.yml` se encargará de construir y publicar la aplicación.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.