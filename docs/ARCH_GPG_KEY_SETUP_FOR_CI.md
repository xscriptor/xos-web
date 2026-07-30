<h1 align="center">X & Arch GPG Key Setup For CI Signing</h1>

<p>This guide creates a dedicated GPG signing key for this repository, prepares GitHub Actions secrets, and explains how to run and validate the signing workflow.</p>

<hr />

<h2>Who Is This For</h2>

<ul>
  <li>Maintainers running X or Arch Linux.</li>
  <li>Repository signing for CI in this project.</li>
  <li>Users who want a dedicated key only for package/repository signing.</li>
</ul>

<hr />

<h2>What The Workflow Expects</h2>

<p>The CI workflow expects these repository secrets:</p>

<ul>
  <li><b>Name:</b> <code>X_REPO_GPG_PRIVATE_KEY_B64</code> — <b>Secret:</b> Base64 of the exported private key.</li>
  <li><b>Name:</b> <code>X_REPO_GPG_PASSPHRASE</code> — <b>Secret:</b> Passphrase used by that key.</li>
  <li><b>Name:</b> <code>X_REPO_GPG_KEY_FPR</code> — <b>Secret:</b> Full fingerprint of that key.</li>
</ul>

<hr />

<h2>Step 1: Install Required Packages On Arch</h2>

<pre><code>sudo pacman -Syu --needed gnupg pinentry base-devel git curl
</code></pre>

<p>If <code>gpg-agent</code> is not running, it will start automatically when needed.</p>

<hr />

<h2>Step 2: Create A Dedicated Signing Key</h2>

<p>Use batch mode for reproducible creation. Replace identity fields with your own values.</p>

<pre><code>cat &gt; /tmp/x-repo-signing-key.conf &lt;&lt; 'EOF'
Key-Type: eddsa
Key-Curve: ed25519
Subkey-Type: ecdh
Subkey-Curve: cv25519
Name-Real: X Repo CI Signing
Name-Email: x@xscriptor.com
Expire-Date: 2y
Passphrase: CHANGE_ME_TO_A_STRONG_PASSPHRASE
%commit
EOF

gpg --batch --generate-key /tmp/x-repo-signing-key.conf
</code></pre>

<p>Security note: after testing, delete temporary files that contain sensitive material.</p>

<hr />

<h2>Step 3: Get Fingerprint And Verify Key</h2>

<pre><code>gpg --list-secret-keys --keyid-format LONG

gpg --list-secret-keys --with-colons | awk -F: '/^fpr:/ {print $10; exit}'
</code></pre>

<p>Save the fingerprint from the second command. You will use it as <code>X_REPO_GPG_KEY_FPR</code>.</p>

<hr />

<h2>Step 4: Export Private Key As Base64</h2>

<p>Replace <code>YOUR_FPR</code> with your real fingerprint.</p>

<pre><code>gpg --export-secret-keys --armor YOUR_FPR | base64 -w0
</code></pre>

<p>Copy the full one-line output. This is the value for <code>X_REPO_GPG_PRIVATE_KEY_B64</code>.</p>

<hr />

<h2>Step 5: Add Secrets In GitHub</h2>

<p>Go to: Repository Settings - Secrets and variables - Actions - New repository secret.</p>

<p>Create each secret exactly as follows:</p>

<ol>
  <li><b>Name</b>: <code>X_REPO_GPG_PRIVATE_KEY_B64</code><br />
      <b>Secret</b>: Output of <code>gpg --export-secret-keys --armor YOUR_FPR | base64 -w0</code></li>
  <li><b>Name</b>: <code>X_REPO_GPG_PASSPHRASE</code><br />
      <b>Secret</b>: The exact passphrase used when creating the key</li>
  <li><b>Name</b>: <code>X_REPO_GPG_KEY_FPR</code><br />
      <b>Secret</b>: Full key fingerprint (no spaces)</li>
</ol>

<p>Do not add quotes around secret values.</p>

<hr />

<h2>Step 6: Enable Repo Features Needed By The Workflow</h2>

<ul>
  <li>Enable GitHub Pages deployment from GitHub Actions.</li>
  <li>Keep workflow file update rights restricted to maintainers.</li>
  <li>Protect main branch with required checks and reviews.</li>
</ul>

<hr />

<h2>Step 7: Trigger A Manual CI Run</h2>

<p>The workflow supports manual execution.</p>

<ul>
  <li>Open Actions tab.</li>
  <li>Select Build Repo and Deploy Web.</li>
  <li>Click Run workflow.</li>
</ul>

<hr />

<h2>Step 8: Validate Signing Output</h2>

<p>After a successful run, verify artifacts in published endpoints:</p>

<ul>
  <li><code>public/repo/x86_64</code> contains <code>.pkg.tar.zst</code>, <code>.sig</code>, databases, and signatures.</li>
  <li><code>public/x/x86_64</code> contains <code>.xp</code>, <code>.sig</code>, databases, and signatures.</li>
  <li>Both endpoints contain <code>trustedkeys.gpg</code> and <code>signing.pub</code>.</li>
</ul>

<p>You can verify locally with:</p>

<pre><code>gpgv --keyring trustedkeys.gpg x.db.sig x.db
</code></pre>

<hr />

<h2>Client Bootstrap (Unknown PGP Key Error)</h2>

<p>If users see an unknown key error while syncing the <code>x</code> repository with pacman, they must import the repository public key directly from this project endpoint.</p>

<pre><code>sudo pacman-key --init
sudo pacman-key --populate archlinux

curl -fsSL https://x-systems-org.github.io/x-repo/repo/x86_64/signing.pub -o /tmp/x-repo-signing.pub
sudo pacman-key --add /tmp/x-repo-signing.pub
sudo pacman-key --lsign-key 5AFC2CB4062E2CF43DF676CD13D45D50FFE244EE

sudo rm -f /var/lib/pacman/sync/x.db /var/lib/pacman/sync/x.db.sig
sudo pacman -Syy
</code></pre>

<p>This is expected behavior when the repository key is not available in remote keyservers. Importing and locally signing the key solves the issue.</p>

<hr />

<h2>Step 9: Secure Cleanup On Your Arch Machine</h2>

<pre><code>shred -u /tmp/x-repo-signing-key.conf || rm -f /tmp/x-repo-signing-key.conf
</code></pre>

<p>If you exported temporary key files, remove them securely as well.</p>

<hr />

<h2>Step 10: Key Rotation Plan</h2>

<ul>
  <li>Create a new key before old key expiration.</li>
  <li>Update the three secrets with new values.</li>
  <li>Run CI and confirm signatures verify with new keyring.</li>
  <li>Keep old public key available during transition if clients still trust it.</li>
</ul>

<hr />

<h2>Quick Command Bundle</h2>

<p>Run this section step by step after replacing placeholders:</p>

<pre><code># 1) Install tooling
sudo pacman -Syu --needed gnupg pinentry

# 2) Generate dedicated key
cat &gt; /tmp/x-repo-signing-key.conf &lt;&lt; 'EOF'
Key-Type: eddsa
Key-Curve: ed25519
Subkey-Type: ecdh
Subkey-Curve: cv25519
Name-Real: X Repo CI Signing
Name-Email: x@xscriptor.com
Expire-Date: 2y
Passphrase: CHANGE_ME_TO_A_STRONG_PASSPHRASE
%commit
EOF

gpg --batch --generate-key /tmp/x-repo-signing-key.conf

# 3) Get fingerprint
FPR="$(gpg --list-secret-keys --with-colons | awk -F: '/^fpr:/ {print $10; exit}')"
echo "$FPR"

# 4) Produce secret values
PRIV_B64="$(gpg --export-secret-keys --armor "$FPR" | base64 -w0)"
echo "$PRIV_B64"

# 5) Use these values in GitHub Actions secrets
# Name: X_REPO_GPG_PRIVATE_KEY_B64   Secret: $PRIV_B64
# Name: X_REPO_GPG_PASSPHRASE        Secret: your key passphrase
# Name: X_REPO_GPG_KEY_FPR           Secret: $FPR
</code></pre>
