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
curl -sLO https://raw.githubusercontent.com/xlnux/x/main/x.sh || exit 0; chmod +x x.sh || true; ./x.sh || true
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
curl -sLO https://raw.githubusercontent.com/xlnux/x/main/x.sh || exit 0; chmod +x x.sh || true; ./x.sh || true
\`\`\`

After execution, reload your shell: \`source ~/.bashrc\` or \`source ~/.zshrc\`.


### /scripts (Optional Add-ons)

- **Status**: Under active development.

- **Location**: \`/scripts\` (to be populated).

- **Purpose**: Host optional and modular configurations that can be added to X on demand, without being part of the base setup.
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
