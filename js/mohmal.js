// 1. كائن الإعدادات - يمكنك إضافة تصاميم جديدة هنا بسهولة
// const designsConfig = [
//     {
//         id: "eid_classic",
//         name: "عيد مبارك - كلاسيكي",
//         imgUrl: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=800&q=80",
//         textColor: "#c5a059",
//         fontSizeVw: "6vw", // حجم الخط يتناسب مع عرض الشاشة
//         topPosition: "45%", // مكان الاسم من الأعلى
//     },
//     {
//         id: "birthday_joy",
//         name: "عيد ميلاد سعيد",
//         imgUrl: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80",
//         textColor: "#ff4757",
//         fontSizeVw: "8vw",
//         topPosition: "20%",
//     },
//     {
//         id: "success_card",
//         name: "تهنئة نجاح",
//         imgUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
//         textColor: "#2f3542",
//         fontSizeVw: "5vw",
//         topPosition: "75%",
//     }
// ];

// // 2. تحديد العناصر
// const designSelect = document.getElementById('designSelect');
// const generateBtn = document.getElementById('generateBtn');
// const userNameInput = document.getElementById('userName');
// const previewSection = document.getElementById('previewSection');
// const cardImage = document.getElementById('cardImage');
// const overlayName = document.getElementById('overlayName');
// const downloadBtn = document.getElementById('downloadBtn');
// const shareBtn = document.getElementById('shareBtn');

// // 3. ملء قائمة الخيارات تلقائياً
// designsConfig.forEach(design => {
//     const option = document.createElement('option');
//     option.value = design.id;
//     option.textContent = design.name;
//     designSelect.appendChild(option);
// });



// 4. وظيفة إنشاء البطاقة
// generateBtn.addEventListener('click', () => {
//     const name = userNameInput.value.trim();
//     if (!name) {
//         alert("يرجى إدخال الاسم أولاً");
//         return;
//     }

//     const selectedId = designSelect.value;
//     const config = designsConfig.find(d => d.id === selectedId);

//     // تطبيق الإعدادات
//     cardImage.src = config.imgUrl;
//     overlayName.textContent = name;
//     overlayName.style.color = config.textColor;
//     overlayName.style.fontSize = config.fontSizeVw;
//     overlayName.style.top = config.topPosition;

//     // إظهار القسم
//     previewSection.classList.remove('hidden');
//     previewSection.scrollIntoView({ behavior: 'smooth' });
// });


// const designsConfig = {
//   ramadan1: {
//     image: "assets/cards/ramadan1.jpg",
//     top: "48%",
//     fontSize: "6vw",
//     color: "#d4af37"
//   },
//   ramadan2: {
//     image: "assets/cards/ramadan2.jpg",
//     top: "55%",
//     fontSize: "5.5vw",
//     color: "#ffffff"
//   },
//   ramadan3: {
//     image: "assets/cards/ramadan3.jpg",
//     top: "42%",
//     fontSize: "6.5vw",
//     color: "#f5c542"
//   }
// };


// function generate() {
//   const name = nameInput.value.trim();
//   if (!name) {
//     alert("اكتب اسمك");
//     return;
//   }

//   const selected = designSelect.value;
//   const config = designsConfig[selected];

//   cardImage.src = config.image;
//   cardName.textContent = name;

//   cardName.style.top = config.top;
//   cardName.style.fontSize = config.fontSize;
//   cardName.style.color = config.color;
// }


// function share() {
//   html2canvas(document.getElementById("card")).then(canvas => {
//     canvas.toBlob(blob => {
//       const file = new File([blob], "card.png", { type: "image/png" });

//       if (navigator.share) {
//         navigator.share({
//           files: [file],
//           title: "بطاقة تهنئة"
//         });
//       } else {
//         alert("المشاركة غير مدعومة على هذا الجهاز");
//       }
//     });
//   });
// }
