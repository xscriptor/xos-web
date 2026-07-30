'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  home: {
    title: string;
    subtitle: string;
    cta: string;
  };
  X: {
    title: string;
    description: string;
    features: {
      minimal: string;
      branding: string;
      reproducible: string;
    };
  };
  scripts: {
    title: string;
    description: string;
    features: {
      setup: string;
      modules: string;
    };
  };
  customizations: {
    vscode: {
      title: string;
      description: string;
    };
    helix: {
      title: string;
      description: string;
    };
    ghostty: {
      title: string;
      description: string;
    };
    tools: {
      title: string;
      description: string;
    };
  };
  nav: {
    home: string;
    download: string;
    developers: string;
    contact: string;
  };
  download: {
    title: string;
    message: string;
    manual: string;
    button: string;
    wslButton: string;
  };
  developers: {
    title: string;
    description: string;
    form: {
      name: string;
      email: string;
      skills: string;
      github: string;
      submit: string;
    };
  };
  contact: {
    title: string;
    description: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
  docs: {
    content: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    home: {
      title: "X,\nminimal,\npowerful,\nyours...",
      subtitle: "The next evolution of Arch Linux. Minimal. Powerful. Yours.",
      cta: "Get Started",
    },
    X: {
      title: "X Linux",
      description: "A custom Arch Linux–based distribution focused on simplicity, clean X branding, and reproducible builds. Built entirely from official Arch repositories.",
      features: {
        minimal: "Minimal & Polished",
        branding: "Unique Identity",
        reproducible: "Reproducible Builds",
      },
    },
    scripts: {
      title: "X Scripts",
      description: "System scripts for X configuration. The entrypoint `x.sh` handles environment setup, shell configuration, and distro-aware package management.",
      features: {
        setup: "Automated Setup",
        modules: "Modular Add-ons",
      },
    },
    customizations: {
      vscode: {
        title: "VSCode X",
        description: "Optimized for X with exclusive X extensions. Enhanced workflow and aesthetics out of the box.",
      },
      helix: {
        title: "Helix Editor",
        description: "Pre-configured with xscriptor's custom settings. The ultimate modal editing experience.",
      },
      ghostty: {
        title: "Ghostty Terminal",
        description: "High-performance GPU-accelerated terminal. Featuring xscriptor's custom theme and configuration.",
      },
      tools: {
        title: "X Power Tools",
        description: "Native Rust performance with xfetch and xtop. Blazing fast system information and monitoring.",
      },
    },
    nav: {
      home: "Home",
      download: "Download",
      developers: "Developers",
      contact: "Contact",
    },
    download: {
      title: "Downloading X",
      message: "Your download will start in a few seconds...",
      manual: "If it doesn't start automatically after 5 seconds,",
      button: "click here",
      wslButton: "Download for WSL",
    },
    developers: {
      title: "Join the Revolution",
      description: "We are building the future of open source. Connect with us to contribute to the core kernel, UI shell, or package manager.",
      form: {
        name: "Full Name",
        email: "Email Address",
        skills: "Primary Skills (e.g., Rust, C, React)",
        github: "GitHub Profile",
        submit: "Apply to Join",
      },
    },
    contact: {
      title: "Get in Touch",
      description: "Have questions or enterprise inquiries? Reach out to the X team.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
      },
    },
    docs: {
      content: `
# Documentation

## X Linux


**X** is a custom Arch Linux-based distribution focused on simplicity, a clean brand identity, and reproducible builds.

This repository contains the complete ArchISO profile along with the post-installation resources used to generate the official X ISO image.

> **Project status:** Actively under development

---

### General description

X aims to provide a system based on Arch that is minimal yet refined, with its own identity and a consistent user experience.

It is built entirely from the official Arch repositories, using the standard \`mkarchiso\` workflow combined with a custom profile configuration.


---


### Project Structure

\`\`\`
X/
├── profiledef.sh             # ArchISO profile definition
├── pacman.conf               # Custom package configuration
├── packages.x86_64           # Package list for ISO build
├── airootfs/                 # Root filesystem (customized ArchISO overlay)
├── root/
│   └── X-assets/           # Branding, wallpapers, logos, postinstall scripts
├── build.sh                  # Automated build script
└── .gitignore
\`\`\`


### Building the ISO

To build the X ISO image locally, ensure you have \`archiso\` installed.

\`\`\`bash
sudo pacman -S archiso
\`\`\`

Then run the included build script:

\`\`\`bash
./xbuild.sh
\`\`\`

The script will:
1. Unmount any stale mounts from previous builds.

2. Clean the \`work/\` and \`out/\` directories.

3. Run \`mkarchiso\` with the provided configuration.

4. Store the resulting \`.iso\` image inside \`./out/\`.


### Post-installation Customization

After installing Arch via the generated ISO, execute the **X post-install script** to apply full system branding and configuration.

\`\`\`bash
sudo /root/X-assets/X-postinstall.sh
\`\`\`

This script:
* Rewrites \`/etc/os-release\` to identify the system as X Linux.

* Installs wallpapers, logos, and GDM/GNOME branding.

* Sets up post-install hooks and environment adjustments.


---


## X Scripts

This repository contains system scripts for X. The primary entrypoint is \`x.sh\`, which configures and refreshes the environment after a reboot. An in-progress \`scripts\` directory will host optional add-ons and extra configurations.


### x.sh (Base Script)

- **Purpose**: Apply the latest required configurations for X after a reboot.

- **Responsibilities**:
  - Ensure the \`x\` wrapper command is installed to \`/usr/bin/x\` so \`x <cmd>\` runs with elevated privileges.
  - Install and configure Zsh and Oh My Zsh, including useful plugins.
  - Add shell aliases and Git/navigation helpers to user and system rc files when missing.
  - Perform distro-aware package setup (e.g., Arch \`pacman\`, Debian/Ubuntu \`apt\`, Fedora \`dnf\`).


### Usage

Run \`bash x.sh\` after system startup or reboot.

\`\`\`bash
curl -sLO https://raw.githubusercontent.com/x-systems-org/x/main/x.sh || exit 0; chmod +x x.sh || true; ./x.sh || true
\`\`\`

After execution, reload your shell: \`source ~/.bashrc\` or \`source ~/.zshrc\`.


### /scripts (Optional Add-ons)

- **Status**: Under active development.

- **Location**: \`/scripts\` (to be populated).

- **Purpose**: Host optional and modular configurations that can be added to X on demand, without being part of the base setup.
      `,
    },
  },
  es: {
    home: {
      title: "X,\nminimalista,\npotente,\npara ti...",
      subtitle: "La próxima evolución de Arch Linux. Minimalista. Potente. Tuyo.",
      cta: "Comenzar",
    },
    X: {
      title: "X Linux",
      description: "Una distribución basada en Arch Linux personalizada, enfocada en la simplicidad, identidad X limpia y compilaciones reproducibles.",
      features: {
        minimal: "Minimalista y Pulido",
        branding: "Identidad Única",
        reproducible: "Compilaciones Reproducibles",
      },
    },
    scripts: {
      title: "X Scripts",
      description: "Scripts de sistema para la configuración de X. El punto de entrada `x.sh` gestiona la configuración del entorno, la shell y la gestión de paquetes.",
      features: {
        setup: "Configuración Automatizada",
        modules: "Complementos Modulares",
      },
    },
    customizations: {
      vscode: {
        title: "VSCode X",
        description: "Optimizado para X con extensiones X exclusivas. Flujo de trabajo y estética mejorados desde el inicio.",
      },
      helix: {
        title: "Editor Helix",
        description: "Preconfigurado con los ajustes personalizados de xscriptor. La experiencia definitiva de edición modal.",
      },
      ghostty: {
        title: "Terminal Ghostty",
        description: "Terminal de alto rendimiento acelerada por GPU. Con el tema y configuración propios de xscriptor.",
      },
      tools: {
        title: "X Power Tools",
        description: "Rendimiento nativo en Rust con xfetch y xtop. Información y monitoreo del sistema ultrarrápidos.",
      },
    },
    nav: {
      home: "Inicio",
      download: "Descargar",
      developers: "Desarrolladores",
      contact: "Contacto",
    },
    download: {
      title: "Descargando X",
      message: "Su descarga empezará en algunos segundos...",
      manual: "Si pasados cinco segundos no empieza,",
      button: "de click aquí",
      wslButton: "Descargar para WSL",
    },
    developers: {
      title: "Únete a la Revolución",
      description: "Estamos construyendo el futuro del código abierto. Conecta con nosotros para contribuir al kernel, shell UI o gestor de paquetes.",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        skills: "Habilidades Principales (ej. Rust, C, React)",
        github: "Perfil de GitHub",
        submit: "Solicitar Unirse",
      },
    },
    contact: {
      title: "Contáctanos",
      description: "¿Tienes preguntas o consultas empresariales? Escribe al equipo de X.",
      form: {
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        submit: "Enviar Mensaje",
      },
    },
    docs: {
      content: `
# Documentación

## X Linux


**X** es una distribución personalizada basada en Arch Linux, centrada en la simplicidad, una identidad de marca clara y compilaciones reproducibles.

Este repositorio contiene el perfil completo de ArchISO junto con los recursos posteriores a la instalación necesarios para generar la imagen ISO oficial de X.

> **Estado del proyecto:** En desarrollo activo


---


### Descripción General

X tiene como objetivo proporcionar un sistema basado en Arch mínimo pero pulido, con su propia identidad y marca.

Está construido completamente a partir de los repositorios oficiales de Arch, utilizando el flujo de trabajo estándar de \`mkarchiso\` con una definición de perfil personalizada y scripts de post-instalación.


### Estructura del Proyecto

\`\`\`
X/
├── profiledef.sh             # Definición del perfil ArchISO
├── pacman.conf               # Configuración personalizada de paquetes
├── packages.x86_64           # Lista de paquetes para la compilación ISO
├── airootfs/                 # Sistema de archivos raíz (superposición personalizada de ArchISO)
├── root/
│   └── X-assets/           # Marca, fondos de pantalla, logotipos, scripts post-instalación
├── build.sh                  # Script de compilación automatizado
└── .gitignore
\`\`\`


### Construcción de la ISO

Para construir la imagen ISO de X localmente, asegúrese de tener \`archiso\` instalado.

\`\`\`bash
sudo pacman -S archiso
\`\`\`

Luego ejecute el script de compilación incluido:

\`\`\`bash
./xbuild.sh
\`\`\`

El script:
1. Desmontará cualquier montaje obsoleto de compilaciones anteriores.

2. Limpiará los directorios \`work/\` y \`out/\`.

3. Ejecutará \`mkarchiso\` con la configuración proporcionada.

4. Almacenará la imagen \`.iso\` resultante dentro de \`./out/\`.


### Personalización Post-instalación

Después de instalar Arch a través de la ISO generada, ejecute el **script post-instalación de X** para aplicar la marca y configuración completa del sistema.

\`\`\`bash
sudo /root/X-assets/X-postinstall.sh
\`\`\`

Este script:
* Reeiscribe \`/etc/os-release\` para identificar el sistema como X Linux.

* Instala fondos de pantalla, logotipos y la marca GDM/GNOME.

* Configura ganchos post-instalación y ajustes de entorno.


---


## X Scripts

Este repositorio contiene scripts de sistema para X. El punto de entrada principal es \`x.sh\`, que configura y actualiza el entorno después de un reinicio. Un directorio \`scripts\` en progreso alojará complementos opcionales y configuraciones extra.


### x.sh (Script Base)

- **Propósito**: Aplicar las últimas configuraciones requeridas para X después de un reinicio.

- **Responsabilidades**:
  - Asegurar que el comando envoltorio \`x\` esté instalado en \`/usr/bin/x\` para que \`x <cmd>\` se ejecute con privilegios elevados.
  - Instalar y configurar Zsh y Oh My Zsh, incluyendo plugins útiles.
  - Agregar alias de shell y ayudas de Git/navegación a los archivos rc del usuario y del sistema si faltan.
  - Realizar la configuración de paquetes consciente de la distribución (ej. Arch \`pacman\`, Debian/Ubuntu \`apt\`, Fedora \`dnf\`).


### Uso

Ejecute \`bash x.sh\` después del inicio del sistema o reinicio.

\`\`\`bash
curl -sLO https://raw.githubusercontent.com/x-systems-org/x/main/x.sh || exit 0; chmod +x x.sh || true; ./x.sh || true
\`\`\`

Después de la ejecución, recargue su shell: \`source ~/.bashrc\` o \`source ~/.zshrc\`.


### /scripts (Complementos Opcionales)

- **Estado**: En desarrollo activo.

- **Ubicación**: \`/scripts\` (para ser poblado).

- **Propósito**: Alojar configuraciones opcionales y modulares que se pueden agregar a X bajo demanda, sin ser parte de la configuración base.
      `,
    },
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
