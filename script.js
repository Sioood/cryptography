const toggle = document.getElementById('toggle'),
  key = document.getElementById('key'),
  decryptedText = document.getElementById('decrypted-text'),
  encryptedText = document.getElementById('encrypted-text'),
  error = document.getElementById('error'),
  run = document.getElementById('run');

run.addEventListener('click', (event) => {
  event.preventDefault();
});

toggle.addEventListener('click', () => {
  // console.log(toggle.checked);
  if (toggle.checked) {
    run.innerText = 'Decrypt';
  } else {
    run.innerText = 'Encrypt';
  }
});

run.addEventListener('click', () => {
  // return num > 2 ? console.log(true) : console.log(false);
  if (!key.value) {
    error.innerText = '⚠️ Need a key value';
  } else if (!decryptedText.value && !encryptedText.value) {
    error.innerText = '⚠️ Need text value';
  } else if (!toggle.checked) {
    error.innerHTML = '&nbsp';
    encrypt();
  } else if (toggle.checked) {
    error.innerHTML = '&nbsp';
    decrypt();
  }
});

function encrypt() {
  let keyArr = key.value.split('');
  let decryptedTextArr = decryptedText.value.split('');
  let i = 0;
  let j = 0;

  let arr = [];

  let encrypt = [];

  while (decryptedTextArr.length >= i) {
    if (decryptedTextArr.length == i) {
      break;
    }

    const step = keyArr[j].charCodeAt(0) - 96;
    arr.push(decryptedTextArr[i].charCodeAt(0) - 96 + step);
    i++;
    if (keyArr.length - 1 == j) {
      j = 0;
    } else {
      j++;
    }
  }

  arr.forEach((el) => {
    encrypt.push(String.fromCharCode(el + 96));
  });

  encryptedText.value = encrypt.join('');
}

function decrypt() {
  let keyArr = key.value.split('');
  let encryptedTextArr = encryptedText.value.split('');
  let i = 0;
  let j = 0;

  let arr = [];

  let decrypt = [];

  while (encryptedTextArr.length >= i) {
    if (encryptedTextArr.length == i) {
      break;
    }

    const step = keyArr[j].charCodeAt(0) - 96;
    arr.push(encryptedTextArr[i].charCodeAt(0) - 96 - step);
    i++;
    if (keyArr.length - 1 == j) {
      j = 0;
    } else {
      j++;
    }
  }

  arr.forEach((el) => {
    decrypt.push(String.fromCharCode(el + 96));
  });

  decryptedText.value = decrypt.join('');
}
