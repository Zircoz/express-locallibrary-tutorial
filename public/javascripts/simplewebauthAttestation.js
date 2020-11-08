//import SimpleWebAuthnBrowser from '@simplewebauthn/browser';
const { startAttestation, supportsWebauthn } = SimpleWebAuthnBrowser;
// <button>
const elemBegin = document.getElementById('btnBegin');
// <span>/<p>/etc...
const elemSuccess = document.getElementById('success');
// <span>/<p>/etc...
const elemError = document.getElementById('error');

if (!supportsWebauthn()) {
  elemBegin.style.display = 'none';
  elemError.innerText = 'It seems this browser doesn\'t support WebAuthn...';
  }

// Start attestation when the user clicks a button
elemBegin.addEventListener('click', async (e) => {
  e.preventDefault();
  // Reset success/error messages
  elemSuccess.innerHTML = '';
  elemError.innerHTML = '';

  // GET attestation options from the endpoint that calls
  // @simplewebauthn/server -> generateAttestationOptions()
  const resp = await fetch('/generate-attestation-options');

  let attResp;
  try {
    // Pass the options to the authenticator and wait for a response
    attResp = await startAttestation(await resp.json());
  } catch (error) {
    // Some basic error handling
    if (error.name === 'InvalidStateError') {
      elemError.innerText = 'Error: Authenticator was probably already registered by user';
    } else {
      elemError.innerText = error;
    }

    throw error;
  }
  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyAttestationResponse()
  const verificationResp = await fetch('/verify-attestation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attResp),
  });
  const verificationJSON = await verificationResp.json();
  // Show UI appropriate for the `verified` status
  if (verificationJSON && verificationJSON.verified) {
    elemSuccess.innerHTML = 'Success!';
  } else {
    elemError.innerHTML = 'Oh no, something went wrong!';
  }
});
