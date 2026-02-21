
const cardSelects = document.querySelectorAll(".card-select");
let selectedImage = null;

// عناصر DOM المفقودة - تعريفها هنا لاستخدامها لاحقاً
const userNameInput = document.getElementById('userName');
const userNumberInput = document.getElementById('userNumber');
const generateBtn = document.getElementById('generateBtn');
const previewSection = document.getElementById('previewSection');
const cardImage = document.getElementById('cardImage');
const overlayName = document.getElementById('overlayName');
const overlayNumber = document.getElementById('overlayNumber');
const userAddressInput = document.getElementById('userAddress');
const addressError = document.getElementById('addressError');
const overlayAddress = document.getElementById('overlayAddress');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const nameError = document.getElementById('nameError');
const designError = document.getElementById('designError');
const numberError = document.getElementById('numberError');
// addressError defined above

// اختيار تصميم واحد فقط
cardSelects.forEach(card => {
  card.addEventListener("click", () => {

    // إزالة التحديد من الجميع
    cardSelects.forEach(c => c.classList.remove("selected"));

    // تحديد الحالي
    card.classList.add("selected");

    // حفظ الصورة المختارة
    selectedImage = card.dataset.img;
        // apply per-card overlay positions (if provided)
        applyOverlayPositions(card);
        // إزالة رسالة خطأ اختيار التصميم إن وُجدت
        if (designError) designError.classList.add('hidden');
        cardSelects.forEach(c => c.classList.remove('input-error'));
  });
});

// apply overlay positions using data attributes from the selected card
function applyOverlayPositions(card) {
    if (!card) return;
    // read dataset values (expected like "6%" or "12%")
    const nBottom = card.dataset.nameBottom;
    const numBottom = card.dataset.numberBottom;
    const addrBottom = card.dataset.addressBottom;
    const nLeft = card.dataset.nameLeft;
    const numLeft = card.dataset.numberLeft;
    const addrLeft = card.dataset.addressLeft;

    if (overlayName) {
        // allow replacing classes (like overlay-large, overlay-top-left)
        if (card.dataset.nameClass) {
            overlayName.className = 'name-overlay ' + card.dataset.nameClass;
        } else {
            overlayName.className = 'name-overlay';
        }

        if (nBottom) overlayName.style.bottom = nBottom;
        else overlayName.style.removeProperty('bottom');
        if (nLeft) overlayName.style.left = nLeft;
        else overlayName.style.left = '50%';
        // keep centering transform unless left explicitly set to non-center
        if (!nLeft) overlayName.style.transform = 'translateX(-50%)';
    }

    if (overlayNumber) {
        if (card.dataset.numberClass) {
            overlayNumber.className = 'number-overlay ' + card.dataset.numberClass;
        } else {
            overlayNumber.className = 'number-overlay';
        }

        if (numBottom) overlayNumber.style.bottom = numBottom;
        else overlayNumber.style.removeProperty('bottom');
        if (numLeft) overlayNumber.style.left = numLeft;
        else overlayNumber.style.left = '50%';
        if (!numLeft) overlayNumber.style.transform = 'translateX(-50%)';
    }

    if (overlayAddress) {
        if (card.dataset.addressClass) {
            overlayAddress.className = 'address-overlay ' + card.dataset.addressClass;
        } else {
            overlayAddress.className = 'address-overlay';
        }

        if (addrBottom) overlayAddress.style.bottom = addrBottom;
        else overlayAddress.style.removeProperty('bottom');
        if (addrLeft) overlayAddress.style.left = addrLeft;
        else overlayAddress.style.left = '50%';
        if (!addrLeft) overlayAddress.style.transform = 'translateX(-50%)';
    }
}

generateBtn.addEventListener('click', () => {
  const name = userNameInput.value.trim();
    const number = userNumberInput ? userNumberInput.value.trim() : '';
    const address = userAddressInput ? userAddressInput.value.trim() : '';

  if (!name) {
            // عرض رسالة خطأ بجانب الحقل وتنسيق الحقل
            if (nameError) {
                nameError.classList.remove('hidden');
            }
            userNameInput.classList.add('input-error');
            userNameInput.focus();
            return;
  }

    // تحقق من الأحرف: السماح بالحروف من أي لغة، المسافات، الشرطة والأبوستروف
    const namePattern = /^[\p{L}\s'\-]+$/u;
    if (!namePattern.test(name) || name.length < 2) {
        if (nameError) {
            nameError.textContent = 'الاسم يجب أن يحتوي حروفًا ومسافات فقط (لا أرقام أو رموز)';
            nameError.classList.remove('hidden');
        }
        userNameInput.classList.add('input-error');
        userNameInput.focus();
        return;
    }

    // validate number (required)
    const numberPattern = /^[+()\d\s-]{7,20}$/;
    if (!number) {
        if (numberError) numberError.classList.remove('hidden');
        if (userNumberInput) userNumberInput.classList.add('input-error');
        if (userNumberInput) userNumberInput.focus();
        return;
    }
    if (!numberPattern.test(number)) {
        if (numberError) {
            numberError.textContent = 'الرجاء إدخال رقم هاتف صالح (أرقام فقط أو +)';
            numberError.classList.remove('hidden');
        }
        if (userNumberInput) userNumberInput.classList.add('input-error');
        if (userNumberInput) userNumberInput.focus();
        return;
    }

    // validate address (required, simple length and disallow angle brackets)
    const addrPattern = /^[^<>]{3,80}$/;
    if (!address) {
        if (addressError) addressError.classList.remove('hidden');
        if (userAddressInput) userAddressInput.classList.add('input-error');
        if (userAddressInput) userAddressInput.focus();
        return;
    }
    if (!addrPattern.test(address)) {
        if (addressError) {
            addressError.textContent = 'الرجاء إدخال عنوان صالح (3-80 حرف)';
            addressError.classList.remove('hidden');
        }
        if (userAddressInput) userAddressInput.classList.add('input-error');
        if (userAddressInput) userAddressInput.focus();
        return;
    }

  if (!selectedImage) {
            // عرض رسالة خطأ عند عدم اختيار تصميم وتظليل البطاقات
            if (designError) {
                designError.classList.remove('hidden');
            }
            cardSelects.forEach(c => c.classList.add('input-error'));
            // تمرير العرض إلى مجموعة البطاقات
            const sg = document.querySelector('.selected-group');
            if (sg) sg.scrollIntoView({ behavior: 'smooth' });
            return;
  }
    // apply positions from the selected card (ensure overlays placed before showing)
    const selectedCardElem = document.querySelector('.card-select.selected');
    if (selectedCardElem) applyOverlayPositions(selectedCardElem);

    // عرض البطاقة
    cardImage.src = selectedImage;
    overlayName.textContent = name;
    if (overlayNumber) overlayNumber.textContent = number;
    if (overlayAddress) overlayAddress.textContent = address;

    // reorder overlays inside capture area: name then number then address
    reorderOverlays();

    previewSection.classList.remove('hidden');
    previewSection.scrollIntoView({ behavior: 'smooth' });
});

// helper to ensure overlays are appended in correct sequence
function reorderOverlays() {
    const captureArea = document.getElementById('captureArea');
    if (!captureArea) return;
    // append moves element to end if already present
    if (overlayName) captureArea.appendChild(overlayName);
    if (overlayNumber) captureArea.appendChild(overlayNumber);
    if (overlayAddress) captureArea.appendChild(overlayAddress);
}


// إزالة رسالة الخطأ عند الكتابة
if (userNameInput) {
    userNameInput.addEventListener('input', () => {
        const val = userNameInput.value.trim();
        if (!val) {
            if (nameError) {
                nameError.textContent = 'يرجى إدخال الاسم';
                nameError.classList.add('hidden');
            }
            userNameInput.classList.remove('input-error');
            return;
        }

        // live-check characters; don't show error while typing unless explicit invalid char
        const namePattern = /^[\p{L}\s'\-]+$/u;
        if (!namePattern.test(val)) {
            if (nameError) {
                nameError.textContent = 'مسموح الحروف والمسافات فقط';
                nameError.classList.remove('hidden');
            }
            userNameInput.classList.add('input-error');
        } else {
            if (nameError) {
                nameError.textContent = 'يرجى إدخال الاسم';
                nameError.classList.add('hidden');
            }
            userNameInput.classList.remove('input-error');
        }
    });

    // تحقق عند فقدان التركيز
    userNameInput.addEventListener('blur', () => {
        const val = userNameInput.value.trim();
        if (!val) return;
        const namePattern = /^[\p{L}\s'\-]+$/u;
        if (!namePattern.test(val) || val.length < 2) {
            if (nameError) {
                nameError.textContent = 'الاسم غير صالح - استخدم حروفًا فقط';
                nameError.classList.remove('hidden');
            }
            userNameInput.classList.add('input-error');
        }
    });
}


// 5. وظيفة التحميل كصورة (html2canvas)
downloadBtn.addEventListener('click', () => {
    const captureArea = document.getElementById('captureArea');
    
    html2canvas(captureArea, { useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = `greeting-card-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
});

// 6. وظيفة المشاركة (Web Share API)
shareBtn.addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'بطاقة تهنئة من أجلك',
                text: `أرسل لك ${userNameInput.value} بطاقة تهنئة!`,
                url: window.location.href
            });
        } catch (err) {
            console.log("خطأ في المشاركة:", err);
        }
    } else {
        alert("خاصية المشاركة غير مدعومة في هذا المتصفح، يمكنك تحميل الصورة وإرسالها يدوياً.");
    }
});

// live validation for number field
if (userNumberInput) {
    userNumberInput.addEventListener('input', () => {
        const val = userNumberInput.value.trim();
        if (!val) {
            if (numberError) {
                numberError.textContent = 'يرجى إدخال رقم صالح';
                numberError.classList.add('hidden');
            }
            userNumberInput.classList.remove('input-error');
            return;
        }

        const validFull = /^[+()\d\s-]{7,20}$/.test(val);
        if (!validFull) {
            if (numberError) {
                numberError.textContent = 'الرقم غير صالح';
                numberError.classList.remove('hidden');
            }
            userNumberInput.classList.add('input-error');
        } else {
            if (numberError) {
                numberError.classList.add('hidden');
            }
            userNumberInput.classList.remove('input-error');
        }
    });

    userNumberInput.addEventListener('blur', () => {
        const val = userNumberInput.value.trim();
        if (!val) return;
        const validFull = /^[+()\d\s-]{7,20}$/.test(val);
        if (!validFull) {
            if (numberError) {
                numberError.textContent = 'الرقم غير صالح - تحقق من الأرقام';
                numberError.classList.remove('hidden');
            }
            userNumberInput.classList.add('input-error');
        }
    });
}

// live validation for address field
if (userAddressInput) {
    userAddressInput.addEventListener('input', () => {
        const val = userAddressInput.value.trim();
        if (!val) {
            if (addressError) {
                addressError.textContent = 'يرجى إدخال عنوان صالح';
                addressError.classList.add('hidden');
            }
            userAddressInput.classList.remove('input-error');
            return;
        }

        const valid = /^[^<>]{3,80}$/.test(val);
        if (!valid) {
            if (addressError) {
                addressError.textContent = 'العنوان قصير جدًا أو يحتوي محارف غير مسموح بها';
                addressError.classList.remove('hidden');
            }
            userAddressInput.classList.add('input-error');
        } else {
            if (addressError) addressError.classList.add('hidden');
            userAddressInput.classList.remove('input-error');
        }
    });

    userAddressInput.addEventListener('blur', () => {
        const val = userAddressInput.value.trim();
        if (!val) return;
        const valid = /^[^<>]{3,80}$/.test(val);
        if (!valid) {
            if (addressError) {
                addressError.textContent = 'العنوان غير صالح - تأكد من الطول والمحارف';
                addressError.classList.remove('hidden');
            }
            userAddressInput.classList.add('input-error');
        }
    });
}


