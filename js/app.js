
const cardSelects = document.querySelectorAll(".card-select");
let selectedImage = null;

// اختيار تصميم واحد فقط
cardSelects.forEach(card => {
  card.addEventListener("click", () => {

    // إزالة التحديد من الجميع
    cardSelects.forEach(c => c.classList.remove("selected"));

    // تحديد الحالي
    card.classList.add("selected");

    // حفظ الصورة المختارة
    selectedImage = card.dataset.img;
  });
});

generateBtn.addEventListener('click', () => {
  const name = userNameInput.value.trim();

  if (!name) {
      alert("يرجى إدخال الاسم");
      return;
  }

  if (!selectedImage) {
      alert("اختر تصميم أولاً");
      return;
  }

  // عرض البطاقة
  cardImage.src = selectedImage;
  overlayName.textContent = name;

  previewSection.classList.remove('hidden');
  previewSection.scrollIntoView({ behavior: 'smooth' });
});


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


