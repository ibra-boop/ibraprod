import React, { useState } from 'react';
import { Camera, Gift, Star, ArrowRight, Check, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContestPage() {
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    phone: '',
    email: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تحقق من البيانات
    if (!formData.childName || !formData.parentName || !formData.phone) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (!selectedFile) {
      setError('الرجاء اختيار صورة الطفل');
      return;
    }

    setLoading(true);

    try {
      // إنشاء FormData للصور
      const form = new FormData();
      form.append('childName', formData.childName);
      form.append('parentName', formData.parentName);
      form.append('phone', formData.phone);
      form.append('email', formData.email || 'بدون بريد');
      form.append('message', `صورة طفل من المسابقة - الطفل: ${formData.childName}`);
      form.append('file', selectedFile);

      // إرسال البيانات إلى Formspree
      const response = await fetch('https://formspree.io/f/xaqpbrd', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ childName: '', parentName: '', phone: '', email: '' });
        setSelectedFile(null);
        
        // إخفاء الرسالة بعد 5 ثواني
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError('حدث خطأ - حاول مرة أخرى');
      }
    } catch (err) {
      setError('خطأ في الاتصال - تأكد من الاتصال بالإنترنت');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-6 py-2 bg-pink-100 rounded-full">
            <p className="text-pink-600 font-semibold text-sm">🎬 إبرا للإنتاج الفني</p>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 leading-tight">
            مسابقة أجمل صورة
          </h1>
          
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"></div>
          
          <p className="text-2xl md:text-3xl text-purple-700 font-bold mb-2">
            👶 صورة طفل 📸
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اعلان عن مسابقة مميزة للتقاط أجمل لحظات براءة الأطفال بطريقة احترافية وخلاقة
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Left Side - Prize Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-pink-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-8 h-8 text-pink-600" />
                <h2 className="text-2xl font-black text-gray-900">الجائزة الأولى</h2>
              </div>
              
              <div className="space-y-4 mb-6 border-l-4 border-pink-500 pl-4">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium mb-2">🎥 جلسة تصوير احترافية</p>
                  <p className="text-3xl font-black text-pink-600">مجانية بالكامل</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium mb-2">🎁 تخفيض خاص</p>
                  <p className="text-3xl font-black text-blue-600">20% على كل المناسبات</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-sm text-yellow-900 font-semibold flex items-start gap-2">
                  <span className="text-lg">⚡</span>
                  <span>قيمة الجائزة تتجاوز 50,000 دج - خصم قابل للتحويل لأي فرد من الأسرة</span>
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                { icon: '✅', text: 'جلسة تصوير احترافية في الاستوديو أو الطبيعة' },
                { icon: '✅', text: 'تحرير احترافي وسريع للصور' },
                { icon: '✅', text: 'نسخة رقمية كاملة + نسخ مطبوعة' },
                { icon: '✅', text: 'شهادة مشاركة رسمية' }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-gray-700 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Entry Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200 sticky top-8">
              <h3 className="text-2xl font-black mb-6 text-gray-900">
                شارك الآن 🎯
              </h3>

              {submitted && (
                <div className="mb-6 bg-green-100 border-2 border-green-500 text-green-700 p-4 rounded-xl flex gap-3 items-start animate-pulse">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black">✅ تم إرسال طلبك بنجاح!</p>
                    <p className="text-sm">سنتواصل معك خلال 24 ساعة على الرقم المعطى</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-100 border-2 border-red-500 text-red-700 p-4 rounded-xl flex gap-3 items-start">
                  <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black">❌ خطأ</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم الطفل *</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder="مثال: ليان"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم ولي الأمر *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="الاسم الكامل"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="07 XX XX XX XX"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني (اختياري)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="بريدك@مثال.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-all font-medium"
                  />
                </div>

                <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center hover:bg-pink-50 transition-all cursor-pointer">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <Camera className="w-8 h-8 mx-auto text-pink-500" />
                      <p className="font-bold text-gray-700">اختر صورة الطفل</p>
                      <p className="text-xs text-gray-500">JPG, PNG حتى 10 MB</p>
                      {selectedFile && <p className="text-pink-600 text-sm font-semibold">✓ {selectedFile.name}</p>}
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:shadow-lg'} text-white font-black py-4 rounded-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-lg`}
              >
                {loading ? (
                  <>⏳ جاري الإرسال...</>
                ) : (
                  <>
                    شارك الآن
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                سيتم التواصل معك خلال 24 ساعة
              </p>
            </form>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-800 text-white rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-black mb-6">📋 شروط المسابقة</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'الفئة المستهدفة', desc: 'أطفال من سن يوم حتى 12 سنة' },
              { title: 'موعد الإغلاق', desc: 'آخر تقديم: نهاية الشهر الجاري' },
              { title: 'الفائز', desc: 'سيتم الإعلان عن النتيجة علناً على وسائل التواصل' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h4 className="font-black text-lg mb-2">{item.title}</h4>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200">
          <h3 className="text-2xl font-black mb-4 text-gray-900">📞 للتواصل والاستفسارات</h3>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <a href="tel:0779000833" className="bg-blue-100 text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-blue-200 transition-all">
              📱 0779000833
            </a>
            <a href="tel:0558948485" className="bg-green-100 text-green-700 font-bold py-3 px-6 rounded-lg hover:bg-green-200 transition-all">
              📱 0558948485
            </a>
            <a href="tel:0696967093" className="bg-purple-100 text-purple-700 font-bold py-3 px-6 rounded-lg hover:bg-purple-200 transition-all">
              📱 0696967093
            </a>
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <p>🌐 <strong>Facebook:</strong> الاعلامي ابراهيم زمولي / Ibra production</p>
            <p>📷 <strong>Instagram:</strong> @ibra_production</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}