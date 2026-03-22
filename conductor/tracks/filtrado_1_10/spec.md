# Specification: Pantalla de Filtros (filtrado_1_10)

## Overview
Implementar la pantalla de filtros para la búsqueda de propiedades utilizando componentes de shadcn/ui y Next.js. La pantalla debe ser un modal con secciones para Ubicación, Rango de Precio, Detalles de la Propiedad (Tipo, Habitaciones, Baños) y Amenidades.

## Requirements
- **Modal Container**: Utilizar `Dialog` de shadcn/ui.
- **Location**: `Input` con icono de ubicación.
- **Price Range**: `Slider` de shadcn/ui (rango doble) con campos de entrada numéricos para Min y Max.
- **Property Type**: `Select` de shadcn/ui.
- **Rooms/Baths**: Contadores con botones de +/-.
- **Amenities**: `ToggleGroup` o `Checkbox` con estilo de "chips" activos/inactivos.
- **Visuals**: Seguir el esquema de colores de la marca (verde primario `#006611`) y soporte para modo oscuro.
- **Icons**: Usar `Lucide-React`.

## shadcn/ui Components to use:
- `Dialog`
- `Input`
- `Slider`
- `Select`
- `Button`
- `Badge` (opcional para chips)
- `Label`
