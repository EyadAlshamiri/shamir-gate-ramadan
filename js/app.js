
const cardSelects = document.querySelectorAll(".card-select");
let selectedImage = null;

// عناصر DOM المفقودة - تعريفها هنا لاستخدامها لاحقاً
const userNameInput = document.getElementById('userName');
const generateBtn = document.getElementById('generateBtn');
const previewSection = document.getElementById('previewSection');
const cardImage = document.getElementById('cardImage');
const overlayName = document.getElementById('overlayName');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const nameError = document.getElementById('nameError');
const designError = document.getElementById('designError');

// اختيار تصميم واحد فقط
cardSelects.forEach(card => {
  card.addEventListener("click", () => {

    // إزالة التحديد من الجميع
    cardSelects.forEach(c => c.classList.remove("selected"));

    // تحديد الحالي
    card.classList.add("selected");

    // حفظ الصورة المختارة
    selectedImage = card.dataset.img;
        // إزالة رسالة خطأ اختيار التصميم إن وُجدت
        if (designError) designError.classList.add('hidden');
        cardSelects.forEach(c => c.classList.remove('input-error'));
  });
});

generateBtn.addEventListener('click', () => {
  const name = userNameInput.value.trim();

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

  // عرض البطاقة
  cardImage.src = selectedImage;
  overlayName.textContent = name;

  previewSection.classList.remove('hidden');
  previewSection.scrollIntoView({ behavior: 'smooth' });
});

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


