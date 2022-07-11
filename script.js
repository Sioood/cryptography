const mode = document.getElementById('mode'),
  toggle = document.getElementById('toggle'),
  key = document.getElementById('key'),
  normalText = document.getElementById('normal-text'),
  encryptedText = document.getElementById('encrypted-text'),
  error = document.getElementById('error'),
  run = document.getElementById('run');

toggle.addEventListener('click', () => {
  // console.log(toggle.checked);
  if (toggle.checked) {
    mode.innerText = 'Decrypt';
  } else {
    mode.innerText = 'Encrypt';
  }
});

run.addEventListener('click', () => {
  // return num > 2 ? console.log(true) : console.log(false);
  if (!key.value) {
    error.innerText = 'need key';
  } else if (!normalText.value && !encryptedText.value) {
    error.innerText = 'need text';
  } else if (!toggle.checked) {
    encrypt();
  } else if (toggle.checked) {
    decrypt();
  }
});

function encrypt() {
  let keyArr = key.value.split('');
  let normalTextArr = normalText.value.split('');
  // console.log(keyArr);
  let i = 0;
  let j = 0;

  let arr = [];

  let encrypt = [];

  while (normalTextArr.length >= i) {
    if (normalTextArr.length == i) {
      break;
    }

    const step = keyArr[j].charCodeAt(0) - 96;
    arr.push(normalTextArr[i].charCodeAt(0) - 96 + step);
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
  // console.log(keyArr);
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

  normalText.value = decrypt.join('');
}

// String.fromCharCode(97 + n)
