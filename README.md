<h1 align="center"> X Repo </h1>

<div align="center">
  <p><b>A minimalistic Linux Spin based on Arch</b></p>
  <p>
    <a href="https://xscriptor.io/x">Website</a> •
    <a href="https://xscriptor.io/x/docs">Documentation</a> •
    <a href="https://xscriptor.io/x/download">Download</a>
  </p>
</div>

<p align="center">
    <img alt="License" src="https://img.shields.io/badge/license-GPL--3.0-blue.svg">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/xlnux/x-repo/build.yml?branch=main&label=CI">
    <img alt="Website" src="https://img.shields.io/badge/website-xscriptor.io-8B5CF6">
</p>

<hr />

<h2 align="center"> Table of Contents </h2>
<p align="center">
  <a href="#about-this-repository">About this Repository</a> •
  <a href="#website">Website</a> •
  <a href="#system-packages">System Packages</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#related-documents">Related Documents</a> •
  <a href="#x">X</a>
</p>

<hr />

<h2 align="center" id="about-this-repository"> About this Repository </h2>

<p>This repository serves two main purposes for the X Linux ecosystem:</p>
<ol>
  <li><b>X Linux Website</b> — The official landing page and documentation portal built with Next.js.</li>
  <li><b>System Packages</b> — Core configuration, branding files, and tools for the X Linux filesystem.</li>
</ol>

<hr />

<h2 align="center" id="website"> Website </h2>

<p>The X Linux website is built with modern technologies to provide a fluid and visual experience:</p>
<ul>
  <li><b>Next.js 16</b> — React Framework with App Router.</li>
  <li><b>Tailwind CSS 4</b> — Utility-first styling.</li>
  <li><b>Framer Motion & Three.js</b> — Smooth animations and 3D graphics via React Three Fiber.</li>
</ul>

<h3 align="center"> Site Structure </h3>
<pre><code>app/
├── page.tsx          # Home page (Hero)
├── download/         # ISO Download page
├── docs/             # System Documentation
├── developers/       # Developer information
└── contact/          # Contact section</code></pre>

<hr />

<h2 align="center" id="system-packages"> System Packages </h2>

<p>The <code>packages/</code> directory contains the essential X Linux filesystem components:</p>

<h3 align="center"> x-release </h3>
<p>System identity and branding package. It includes:</p>
<ul>
  <li><b>Identity</b> — <code>os-release</code> templates and GRUB defaults.</li>
  <li><b>Assets</b> — Official distributor logo in <code>/usr/share/pixmaps/x.svg</code>.</li>
  <li><b>Tools</b> — <code>x-release-apply</code> to sync branding with the running system.</li>
</ul>

<h3 align="center"> Package Installation </h3>
<pre><code>cd packages/x-release
xpkg build
xpm install ./out/x-release-1.0-4-any.xp

#Apply system branding
sudo x-release-apply</code></pre>

<blockquote>
  <b>Note:</b> While <code>PKGBUILD</code> is kept for legacy Arch tooling, <code>XBUILD</code> is the native path for <code>xpkg</code> and <code>xpm</code>.
</blockquote>

<h3 align="center"> Create Package Repository </h3>
<p>The <code>build-repo.sh</code> script generates a pacman-compatible repository:</p>
<pre><code>cd packages
./build-repo.sh</code></pre>

<hr />

<h2 align="center" id="technologies"> Technologies </h2>

<table align="center">
  <thead>
    <tr>
      <th>Component</th>
      <th>Technology</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Website</b></td>
      <td>Next.js, React, TypeScript</td>
    </tr>
    <tr>
      <td><b>Styles & FX</b></td>
      <td>Tailwind CSS, Framer Motion, Three.js</td>
    </tr>
    <tr>
      <td><b>System</b></td>
      <td>Arch Linux, pacman</td>
    </tr>
    <tr>
      <td><b>Packaging</b></td>
      <td>xpkg, xpm, makepkg</td>
    </tr>
  </tbody>
</table>

<hr />

<h2 align="center" id="related-documents">Related Documents</h2>

<ul>
  <li><a href="./LICENSE">License</a></li>
  <li><a href="./CODE_OF_CONDUCT.md">Code of Conduct</a></li>
  <li><a href="./CONTRIBUTING.md">Contributions</a></li>
  <li><a href="./ROADMAP.md">Roadmap</a></li>
</ul>


<div align="center">
<h2 align="center" id="x">X</h2>

<a href="https://github.com/xlnux">XGitHub</a> &middot;
<a href="https://xscriptor.io">XWeb</a>
</div>