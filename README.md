# DistroYaAdmin
DistroYaAdmin

- UC1: Revisar y Aprobar Perfiles de Proveedores
- UC2: Configurar Planes de Suscripción: Costo y Duración
- UC3: Asignar / Renovar Suscripción a Proveedores
- UC4: Enviar Avisos Push Masivos o Dirigidos

# Caso de Usos

```mermaid
flowchart TD
    %% Definición de Estilos
    classDef actor fill:#1e293b,stroke:#0f172a,color:#ffffff,font-weight:bold,rx:8,ry:8
    classDef adminUC fill:#eff6ff,stroke:#3b82f6,color:#1e3a8a,rx:6,ry:6
    classDef provUC fill:#f0fdf4,stroke:#22c55e,color:#14532d,rx:6,ry:6
    classDef cliUC fill:#faf5ff,stroke:#a855f7,color:#581c87,rx:6,ry:6

    subgraph Actores_Global ["ARQUITECTURA DE CASOS DE USO POR ACTOR"]
        direction LR

        %% ==========================================
        %% 1. ADMINISTRADOR
        subgraph Col_Admin ["🛡️ ADMINISTRADOR"]
            direction TB
            Admin(["👤 Administrador"]):::actor
            
            UC1["<b>UC1</b><br/>Revisar y Aprobar<br/>Perfiles de Proveedores"]:::adminUC
            UC2["<b>UC2</b><br/>Configurar Planes:<br/>Costo y Duración"]:::adminUC
            UC3["<b>UC3</b><br/>Asignar / Renovar<br/>Suscripciones"]:::adminUC
            UC4["<b>UC4</b><br/>Enviar Avisos Push<br/>Masivos o Dirigidos"]:::adminUC

            Admin --> UC1
            Admin --> UC2
            Admin --> UC3
            Admin --> UC4
        end
     
    end
```
