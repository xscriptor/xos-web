<h1 align="center">X Repository Client Setup</h1>

<p>This guide is focused on end users of <b>X</b> (the Arch-based mini distro) and explains how to configure the <code>x</code> repository with signature validation on a client system.</p>

<hr />

<h2>Goal</h2>

<ul>
  <li>Use the <code>x</code> repository safely.</li>
  <li>Avoid unknown-key sync errors.</li>
  <li>Keep package signature checks enabled.</li>
  <li>Install native <code>.xp</code> applications (<code>xpkg</code>, <code>xfetch</code>) via <code>xpm</code>.</li>
</ul>

<hr />

<h2>Prerequisites</h2>

<pre><code>sudo pacman -Syu --needed curl gnupg
</code></pre>

<p>If <code>xpm</code> is not installed yet:</p>

<pre><code>sudo pacman -S xpm
</code></pre>

<hr />

<h2>1) Add Repository In pacman.conf</h2>

<p>Edit <code>/etc/pacman.conf</code> and add:</p>

<pre><code>[x]
SigLevel = Required DatabaseOptional
Server = https://x-systems-org.github.io/x-repo/repo/x86_64
</code></pre>

<p>Do not use <code>TrustAll</code> for production configuration.</p>

<hr />

<h2>2) Configure xpm For Native .xp Packages</h2>

<p><code>xpm</code> must point to the <code>x</code> endpoint (not the pacman endpoint) to install native <code>.xp</code> packages.</p>

<p>Create keyring directory and download published key material:</p>

<pre><code>sudo install -d -m 755 /etc/xpm/gnupg

sudo curl -fsSL \
  https://x-systems-org.github.io/x-repo/x/x86_64/trustedkeys.gpg \
  -o /etc/xpm/gnupg/trustedkeys.gpg

sudo curl -fsSL \
  https://x-systems-org.github.io/x-repo/x/x86_64/signing.pub \
  -o /etc/xpm/gnupg/signing.pub
</code></pre>

<p>Then configure <code>/etc/xpm.conf</code>:</p>

<pre><code>[options]
root_dir = "/"
db_path = "/var/lib/xpm/"
cache_dir = "/var/cache/xpm/pkg/"
gpg_dir = "/etc/xpm/gnupg/"
sig_level = "required"
parallel_downloads = 5

[[repo]]
name = "x"
server = ["https://x-systems-org.github.io/x-repo/x/$arch"]
sig_level = "required"
</code></pre>

<p>Expected configuration location: <code>/etc/xpm.conf</code>.</p>

<hr />

<h2>3) Install .xp Applications With xpm</h2>

<pre><code>sudo xpm sync
sudo xpm install xpkg
sudo xpm install xfetch
sudo xpm install xclock
</code></pre>

<p>This flow pulls signed <code>.xp</code> packages from <code>x/x86_64</code>.</p>

<hr />

<h2>4) Initialize pacman Keyring</h2>

<pre><code>sudo pacman-key --init
sudo pacman-key --populate archlinux
</code></pre>

<hr />

<h2>5) Import X Repository Public Key (pacman path)</h2>

<pre><code>curl -fsSL https://x-systems-org.github.io/x-repo/repo/x86_64/signing.pub -o /tmp/x-repo-signing.pub
sudo pacman-key --add /tmp/x-repo-signing.pub
sudo pacman-key --lsign-key 5AFC2CB4062E2CF43DF676CD13D45D50FFE244EE
</code></pre>

<p>The fingerprint above is public and expected. It identifies the repository signing key.</p>

<hr />

<h2>6) Force Fresh Database Download</h2>

<pre><code>sudo rm -f /var/lib/pacman/sync/x.db /var/lib/pacman/sync/x.db.sig
sudo pacman -Syy
</code></pre>

<hr />

<h2>7) Validate Fingerprint (Recommended)</h2>

<pre><code>pacman-key --finger 5AFC2CB4062E2CF43DF676CD13D45D50FFE244EE
</code></pre>

<p>Expected fingerprint:</p>

<pre><code>5AFC2CB4062E2CF43DF676CD13D45D50FFE244EE
</code></pre>

<hr />

<h2>8) Test Install (pacman path)</h2>

<pre><code>sudo pacman -Sy x-release
</code></pre>

<p>If key trust and signatures are configured correctly, sync/install should complete without unknown-key errors.</p>

<hr />

<h2>Troubleshooting</h2>

<ul>
  <li><b>Unknown key prompt in pacman:</b> Re-run steps 5 and 6.</li>
  <li><b>Remote key fetch failed:</b> Expected for private project keys. Import from <code>signing.pub</code> endpoint instead of keyservers.</li>
  <li><b>Signature error after key rotation:</b> Refresh key from the latest <code>signing.pub</code> and re-run local sign step.</li>
  <li><b>xpm cannot find package:</b> Ensure <code>/etc/xpm.conf</code> points to <code>https://x-systems-org.github.io/x-repo/x/$arch</code> and not <code>/repo/x86_64</code>.</li>
  <li><b>xpm signature required but download failed:</b> Verify that <code>.sig</code> files exist in <code>x/x86_64</code> for package and database artifacts.</li>
  <li><b>xpm keyring load error:</b> Verify <code>gpg_dir</code> and presence of <code>trustedkeys.gpg</code> in <code>/etc/xpm/gnupg/</code>.</li>
  <li><b>xpm unknown signing key:</b> Refresh <code>/etc/xpm/gnupg/trustedkeys.gpg</code> from the endpoint and run <code>sudo xpm sync</code> again.</li>
</ul>

<hr />

<h2>Security Notes</h2>

<ul>
  <li>Public fingerprint and public key are safe to publish.</li>
  <li>Never publish private key material or CI secret values.</li>
  <li>Prefer strict signature policy for long-term reliability.</li>
</ul>
