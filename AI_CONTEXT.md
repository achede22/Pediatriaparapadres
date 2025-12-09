# Project Context: Pediatría para Padres

## Identity
- **Type**: Web Application (PWA/Capacitor ready)
- **Stack**: React 18, Vite, TypeScript
- **Styling**: TailwindCSS, clsx, tailwind-merge
- **UI Libs**: Radix UI (primitives), Lucide React (icons), Framer Motion (animations)
- **Routing**: React Router DOM v6+

## Architecture
### Directory Structure (`src/`)
- **`components/`**: Reusable UI components (buttons, cards, inputs) and feature-specific blocks.
- **`pages/`**: Top-level route components.
- **`styles/`**: Global styles and theme configurations.
- **`data/`**: Placeholder for externalized data (currently unused).

### Routing Map (`App.tsx`)
| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `ParentHome` | Main landing page/dashboard. |
| `/symptoms` | `SymptomChecker` | Interactive symptom assessment tool. |
| `/nasal-calc` | `NasalWashCalc` | Utility for calculating nasal wash dosages. |
| `/parent-info` | `ParentInfo` | Educational content repository. |
| `/emergency-parent` | `ParentEmergency` | Quick access to emergency protocols. |

### Legacy/Inactive Components
- `src/pages/Emergency.tsx`: Medical professional emergency view (not routed).
- `src/pages/NonEmergency.tsx`: Medical professional consultation view (not routed).

## Data Strategy
- **Current**: Static data hardcoded within component files (e.g., symptom lists, dosage tables).
- **Future**: Migration to `src/data` JSON/TS constants recommended.

## Key Configurations
- **Base URL**: `/Pediatriaparapadres/` (configured in `vite.config.ts` and `main.tsx`).
- **Build Output**: `build/` directory.
