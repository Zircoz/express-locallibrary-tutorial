const elemBegin = document.getElementById('btnBegin');
const elemSuccess = document.getElementById('success');
const elemError = document.getElementById('error');
var emailField = document.querySelector("#emailAssert");
const { startAssertion, supportsWebauthn } = SimpleWebAuthnBrowser;

if(!supportsWebauthn) {
  elemBegin.style.display = 'none';
  emailField.style.display = 'none';
  elemError.innerText = 'It seems this browser doesn\'t support WebAuthn...';
}

elemBegin.addEventListener('click', async () => {
  elemSuccess.innerHTML = '';
  elemError.innerHTML = '';
  // GET assertion options from the endpoint that calls
  // @simplewebauthn/server -> generateAssertionOptions()
  var formData = new FormData();
  var emailAssert = emailField.value;
  formData.append('email', emailAssert);

  const resp = await fetch('/generate-assertion-options', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  });
  if(resp==='') {
    elemError.innerText = "Email not Registered";
    throw error;
  }
  let asseResp;
  try {
    // Pass the options to the authenticator and wait for a response
    asseResp = await startAssertion(await resp.json());
  } catch (error) {
    // Some basic error handling
    elemError.innerText = error;
    throw error;
  }

  const verificationResp = await fetch('/verify-assertion', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(asseResp),
  });

  const verificationJSON = await verificationResp.json();

  if (verificationJSON && verificationJSON.verified) {
      elemSuccess.innerHTML = 'Success! Please wait you are being redirected';
      setTimeout(function(){
            window.location.href = '/';
          }, 3000);
    } else {
      elemError.innerHTML = 'Oh no, something went wrong! Response:' + JSON.stringify(verificationJSON);
    }
});
