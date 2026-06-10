import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
  bn: {
    nav: {
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      services: "সেবাসমূহ",
      order: "অনলাইন অর্ডার",
      doctors: "ডাক্তারের তালিকা",
      faq: "প্রশ্নোত্তর",
      contact: "যোগাযোগ",
      call: "কল করুন"
    },
    hero: {
      badge: "কালিয়াগঞ্জের বিশ্বস্ত স্থানীয় স্বাস্থ্যসেবা অংশীদার",
      title1: "আপনার স্বাস্থ্য,",
      title2: "আমাদের প্রধান লক্ষ্য",
      desc: "এম/এস স্টেট মেডিসিন শপ কালিয়াগঞ্জ ও তার আশেপাশের অঞ্চলের জন্য খাঁটি প্রেসক্রিপশন ওষুধ, শিশু পরিচর্যা সামগ্রী এবং বিশেষজ্ঞ ডাক্তারের পরামর্শ প্রদান করে।",
      pillAddress: "এনএস রোড (কালিয়াগঞ্জ টকিজ বিল্ডিং)",
      pillTime: "প্রতিদিন খোলা: সকাল ৮টা - রাত ১০টা",
      pillDelivery: "হোম ডেলিভারি উপলব্ধ",
      btnOrder: "অনলাইনে অর্ডার করুন",
      btnCall: "ফার্মেসিতে কল করুন",
      btnWhatsapp: "হোয়াটসঅ্যাপ অর্ডার",
      trustGenuine: "১০০% খাঁটি ওষুধ",
      trustPharmacist: "প্রশিক্ষিত ফার্মাসিস্ট",
      trustPayments: "ইউপিআই ও অনলাইন পেমেন্ট",
      trustDoctors: "চেম্বারে ডাক্তার"
    },
    about: {
      eyebrow: "পরিচিতি",
      title1: "স্টেট মেডিসিন",
      title2: "শপ সম্পর্কে",
      lead: "কালিয়াগঞ্জ ও উত্তর দিনাজপুর এলাকায় অত্যন্ত নির্ভরযোগ্য ও সঠিক পরামর্শের সাথে স্বাস্থ্যসেবা প্রদান করছি।",
      p1: "আমরা একটি নিবেদিত স্থানীয় রিটেল ফার্মেসি যা আপনার পরিবারের সকল স্বাস্থ্যগত চাহিদার জন্য একক গন্তব্য হিসেবে কাজ করে। প্রেসক্রিপশন ওষুধ, দীর্ঘস্থায়ী রোগ (ডায়াবেটিস, রক্তচাপ, হার্ট কেয়ার) থেকে শুরু করে সাধারণ স্বাস্থ্য সামগ্রী এবং শিশু পরিচর্যা পণ্য-আমরা বিশ্বস্ত প্রস্তুতকারকদের থেকে সমস্ত প্রয়োজনীয় আইটেম স্টক করি।",
      p2: "এছাড়াও আমাদের এখানে রয়েছে বিশেষজ্ঞ ডাক্তারদের চেম্বার (OPD), যাতে স্থানীয় জনসাধারণকে উন্নত চিকিৎসার পরামর্শের জন্য দূরে যেতে না হয়।",
      gallery: {
        storeFront: "দোকানের সামনে",
        counter: "মেডিসিন কাউন্টার",
        inventory: "ওষুধের স্টক",
        waiting: "অপেক্ষার জায়গা",
        chamber: "ডাক্তারের চেম্বার"
      },
      badges: {
        storeFront: "আমাদের দোকান",
        counter: "মেডিসিন কাউন্টার",
        inventory: "১০০% খাঁটি ওষুধের স্টক",
        waiting: "ওপিডি অপেক্ষা করার রুম",
        chamber: "ডাক্তার পরামর্শ কক্ষ"
      },
      stats: {
        years: "৫+ বছর",
        yearsSub: "কালিয়াগঞ্জে বিশ্বস্ত সেবা",
        authentic: "১০০%",
        authenticSub: "খাঁটি ও তাজা ওষুধ",
        patients: "১০,০০০+",
        patientsSub: "সুস্থ ও সন্তুষ্ট রোগী"
      }
    },
    services: {
      eyebrow: "আমাদের সেবাসমূহ",
      title1: "স্বাস্থ্যসেবা ও",
      title2: "ফার্মেসি সুবিধাসমূহ",
      desc: "আমরা কালিয়াগঞ্জে আপনার পুরো পরিবারের স্বাস্থ্য সুরক্ষায় নির্ভরযোগ্য ফার্মেসি পরিষেবা এবং বিশেষজ্ঞ ডাক্তারদের ওপিডি পরামর্শ প্রদান করি।",
      card1: {
        title: "রিটেল ফার্মেসি স্টোর",
        i1: "প্রেসক্রিপশন ওষুধ: শতভাগ খাঁটি ও প্রয়োজনীয় দীর্ঘস্থায়ী রোগ ও সাধারণ অসুখের ওষুধ।",
        i2: "ওটিসি সামগ্রী: প্রতিদিনের সর্দি, কাশি, গ্যাস ও ব্যথানাশক সাধারণ ওষুধ।",
        i3: "বেবি কেয়ার সামগ্রী: ফর্মুলা, বেবি ফুড, ডায়াপার এবং অন্যান্য শিশু স্বাস্থ্য সামগ্রী।",
        i4: "ভিটামিন ও পুষ্টি সামগ্রী: মাল্টিভিটামিন, প্রোটিন পাউডার এবং টনিক।"
      },
      card2: {
        title: "ভিজিটিং ডক্টর ওপিডি (OPD)",
        i1: "বিশেষজ্ঞ পরামর্শ: অভিজ্ঞ এমডি ফিজিশিয়ান ও সার্জনদের সরাসরি চেম্বারে পরামর্শ।",
        i2: "সহজ বুকিং: সরাসরি কল বা হোয়াটসঅ্যাপের মাধ্যমে ভিজিটিং স্লট প্রি-বুক করার সুবিধা।",
        i3: "স্বাস্থ্য পরীক্ষা: রক্তচাপ ও ব্লাড সুগার পরীক্ষা করার তাৎক্ষণিক ব্যবস্থা।",
        i4: "প্রেসক্রিপশন রেকর্ড: নিয়মিত ফলো-আপের জন্য প্রেসক্রিপশন রেকর্ড রাখার ব্যবস্থা।"
      },
      card3: {
        title: "অনুষঙ্গিক সুবিধাসমূহ",
        i1: "হোম ডেলিভারি: কালিয়াগঞ্জ শহরের মধ্যে দ্রুত ও নিরাপদ হোম ডেলিভারি।",
        i2: "২৪-ঘন্টায় সংগ্রহ: জরুরি ওষুধ আমাদের স্টকে না থাকলে ২৪ ঘন্টার মধ্যে এনে দেওয়ার ব্যবস্থা।",
        i3: "হোয়াটসঅ্যাপে অর্ডার: খুব সহজে প্রেসক্রিপশন বা প্রয়োজনীয় ওষুধের তালিকা লিখে অর্ডার করার সুবিধা।",
        i4: "খাঁটি ওষুধের নিশ্চয়তা: লাইসেন্সপ্রাপ্ত ডিস্ট্রিবিউটর থেকে সরাসরি সংগৃহীত ১০০% আসল ব্যাচ।"
      }
    },
    order: {
      eyebrow: "অনলাইন প্রেসক্রিপশন আপলোড",
      title1: "অনলাইনে আসল ওষুধ",
      title2: "অর্ডার করুন",
      subtitle: "আপনার প্রেসক্রিপশনের ছবি বা পিডিএফ ফাইল আপলোড করুন অথবা ওষুধের তালিকাটি লিখুন। আমাদের টিম যাচাই করে আপনার ডেলিভারি বা পিকআপের জন্য প্রস্তুত করবে।",
      dragText: "এখানে আপনার প্রেসক্রিপশন ফাইল ড্র্যাগ করুন অথবা ব্রাউজ করতে ক্লিক করুন",
      fileNote: "শুধুমাত্র JPG, PNG এবং PDF ফর্ম্যাট সমর্থন করে (সর্বোচ্চ ১০ এমবি)",
      fileName: "ফাইলের নাম",
      fileSize: "সাইজ",
      removeBtn: "ফাইলটি মুছুন",
      fieldLabelName: "রোগীর নাম",
      fieldNamePlaceholder: "রোগীর সম্পূর্ণ নাম লিখুন",
      fieldLabelAddress: "ডেলিভারি ঠিকানা (কালিয়াগঞ্জ)",
      fieldAddressPlaceholder: "হোম ডেলিভারির জন্য সম্পূর্ণ ঠিকানা লিখুন",
      btnSubmit: "হোয়াটসঅ্যাপের মাধ্যমে অর্ডার পাঠান",
      stepTitle: "সহজ ৩-ধাপের হোয়াটসঅ্যাপ অর্ডার",
      stepDesc: "স্টেট মেডিসিন শপ থেকে ওষুধ অর্ডার করা এখন আরও সহজ। সরাসরি আপনার অর্ডার পাঠাতে এই ধাপগুলো অনুসরণ করুন:",
      step1: "আপনার প্রেসক্রিপশন ফাইলটি সিলেক্ট করুন বা ড্র্যাগ করে এখানে আনুন।",
      step2: "রোগীর নাম এবং হোম ডেলিভারি ঠিকানা নিশ্চিত করুন।",
      step3: "হোয়াটসঅ্যাপে অর্ডার পাঠাতে 'অর্ডার পাঠান' বোতামে ক্লিক করুন এবং ফাইলটি সেন্ড করুন।",
      infoVerify: "ডেলিভারির আগে সমস্ত অর্ডার একজন লাইসেন্সপ্রাপ্ত ফার্মাসিস্ট দ্বারা সতর্কতার সাথে যাচাই করা হয়।",
      whatsappInfo: "হোয়াটসঅ্যাপে মেসেজ পাঠানোর পর ফাইলটি চ্যাটে সংযুক্ত করতে ভুলবেন না!",
      consentLabel: "আমি ব্যবহার বিধি এবং গোপনীয়তা নীতি মেনে চলছি এবং ওষুধ অর্ডারের জন্য প্রেসক্রিপশন ও তথ্যের ব্যবহারে সম্মতি জানাচ্ছি।",
      termsLink: "ব্যবহার বিধি",
      privacyLink: "গোপনীয়তা নীতি",
      whatsappManualAlert: "গুরুত্বপূর্ণ: ব্রাউজার সিকিউরিটির কারণে, আপনার প্রেসক্রিপশন ফাইলটি স্বয়ংক্রিয়ভাবে হোয়াটসঅ্যাপে যাবে না। নিচের বোতামে ক্লিক করার পর যখন হোয়াটসঅ্যাপ চ্যাট ওপেন হবে, তখন ফাইলটি নিজের ফোন বা কম্পিউটার থেকে ম্যানুয়ালি চ্যাটের সাথে সংযুক্ত (Attach) করে পাঠাতে হবে।",
      disclaimerText: "দাবিত্যাগ (Disclaimer): এই ওয়েবসাইটটি কেবল অর্ডার সংক্রান্ত অনুসন্ধানের সুবিধা দেয়। সকল অর্ডার ডেলিভারি বা সংগ্রহের পূর্বে আমাদের রেজিস্টার্ড ফার্মাসিস্ট দ্বারা প্রেসক্রিপশনটি শারীরিকভাবে যাচাই করা হবে। আমরা কোনো বেআইনি বা প্রেসক্রিপশন ছাড়া নিষিদ্ধ ওষুধ বিক্রি করি না।",
      validation: {
        noFile: "অনুগ্রহ করে প্রথমে প্রেসক্রিপশন ফাইল আপলোড করুন!",
        invalidType: "অসমর্থিত ফাইল ফর্ম্যাট। অনুগ্রহ করে কেবল ইমেজ ফাইল (JPG, PNG) বা PDF আপলোড করুন।",
        tooLarge: "ফাইলটি খুব বড়। সর্বোচ্চ সাইজ ১০ এমবি।"
      }
    },
    doctors: {
      eyebrow: "ডাক্তারদের ওপিডি তালিকা",
      title1: "আমাদের ভিজিটিং",
      title2: "ডাক্তারদের শিডিউল",
      subtitle: "কালিয়াগঞ্জের বাইরে না গিয়েই স্বনামধন্য হাসপাতালের অভিজ্ঞ বিশেষজ্ঞদের পরামর্শ নিন। আপনার প্রয়োজনীয় বিভাগটি নির্বাচন করে সময়সূচী দেখুন।",
      categories: {
        all: "সব ডাক্তার",
        medicine: "সাধারণ মেডিসিন",
        gynae: "স্ত্রীরোগ ও প্রসূতি",
        dermatology: "চর্ম ও চর্মরোগ"
      },
      labelFee: "পরামর্শ ফি",
      feeVal: "কাউন্টারে যোগাযোগ করুন",
      btnBook: "হোয়াটসঅ্যাপে স্লট বুক করুন",
      badgeActive: "সক্রিয় শিডিউল"
    },
    faq: {
      eyebrow: "জিজ্ঞাসাবাদ",
      title1: "সাধারণ",
      title2: "জিজ্ঞাসিত প্রশ্নাবলী",
      subtitle: "ওষুধ অর্ডার, ডাক্তারদের অ্যাপয়েন্টমেন্ট বুকিং, হোম ডেলিভারি এবং পেমেন্ট সংক্রান্ত জরুরি প্রশ্নগুলোর দ্রুত উত্তর এখানে পান।",
      q1: "আমি কীভাবে অনলাইনে ওষুধ অর্ডার করব?",
      a1: "অনলাইন অর্ডার সেকশনে আপনার প্রেসক্রিপশন (ছবি বা পিডিএফ) আপলোড করুন অথবা নাম ও ঠিকানা সহ আইটেমের তালিকা লিখুন। তারপর 'হোয়াটসঅ্যাপের মাধ্যমে অর্ডার পাঠান' বোতামে ক্লিক করুন। এটি আমাদের অফিসিয়াল নম্বরে একটি ড্রাফট মেসেজ তৈরি করবে এবং আপনি সেটি পাঠালে আমাদের ফার্মাসিস্ট আপনার সাথে যোগাযোগ করবেন।",
      q2: "হোম ডেলিভারি কি কালিয়াগঞ্জের সর্বত্র উপলব্ধ এবং এটি কি ফ্রি?",
      a2: "হ্যাঁ, আমরা কালিয়াগঞ্জ শহরের মধ্যে হোম ডেলিভারি পরিষেবা প্রদান করি। আমাদের ডেলিভারি চার্জ সাধারণত অর্ডার ভ্যালু ও দূরত্বের ওপর নির্ভর করে। তবে কালিয়াগঞ্জ রেলগেট বা টকিজ বিল্ডিংয়ের কাছাকাছি এলাকায় বেশিরভাগ অর্ডারে ফ্রি ডেলিভারি দেওয়া হয়।",
      q3: "আমরা কি জরুরি বা অপ্রতুল ওষুধ অর্ডার করতে পারি?",
      a3: "অবশ্যই। কোনো বিশেষ ওষুধ আমাদের স্টকে না থাকলে, আমরা সাধারণত ২৪ ঘন্টার মধ্যে তা সরাসরি লাইসেন্সপ্রাপ্ত ডিস্ট্রিবিউটর বা কোম্পানি থেকে সংগ্রহ করে দিই। আপনি হোয়াটসঅ্যাপে আমাদের সাথে যোগাযোগ করে আপনার চাহিদা জানাতে পারেন।",
      q4: "ডাক্তার দেখানোর বুকিং কীভাবে করা যাবে?",
      a4: "আপনি ডক্টরস সেকশনে সংশ্লিষ্ট ডাক্তারের কার্ডের নিচে থাকা 'হোয়াটসঅ্যাপে স্লট বুক করুন' বোতামে ক্লিক করে আমাদের সাথে যোগাযোগ করতে পারেন। অথবা সরাসরি আমাদের ফোন নম্বর +91 81455 55232 / +91 75014 82099 নম্বরে কল করে স্লট বুক করতে পারেন।",
      q5: "পেমেন্টের কী কী মাধ্যম গ্রহণযোগ্য?",
      a5: "আমরা নগদ অর্থ (Cash on Delivery), UPI (PhonePe, Google Pay, Paytm, Amazon Pay), এবং সরাসরি কিউআর কোড স্ক্যান করে অনলাইন পেমেন্ট গ্রহণ করি।"
    },
    contact: {
      eyebrow: "যোগাযোগ করুন",
      title1: "ওষুধ দোকানের",
      title2: "ঠিকানা ও লোকেশন",
      subtitle: "সরাসরি দোকানে আসতে পারেন অথবা আমাদের ফোনে যোগাযোগ করতে পারেন। কালিয়াগঞ্জ শহরের প্রাণকেন্দ্রে আমরা অবস্থিত।",
      addressTitle: "দোকানের ঠিকানা",
      addressVal: "এনএস রোড (কালিয়াগঞ্জ টকিজ বিল্ডিং), কালিয়াগঞ্জ, উত্তর দিনাজপুর, পশ্চিমবঙ্গ - ৭৩৩১২৯",
      phoneTitle: "সরাসরি ফোন নম্বর",
      phoneDesc: "ওষুধ অর্ডার বা ডাক্তারের চেম্বারের বুকিংয়ের জন্য কল করুন:",
      hoursTitle: "দোকান খোলা থাকার সময়",
      hoursSubtitle: "সপ্তাহে ৭ দিন খোলা",
      hoursCounter: "ফার্মেসি কাউন্টার: সকাল ৮:০০ - রাত ১০:০০",
      hoursClinic: "ডাক্তার চেম্বার: ডাক্তারের শিডিউল অনুযায়ী",
      mapsBtn: "গুগল ম্যাপে দেখুন"
    },
    footer: {
      desc: "কালিয়াগঞ্জের প্রাণকেন্দ্রে অবস্থিত আপনার বিশ্বস্ত স্বাস্থ্যসেবা অংশীদার। আমরা আসল প্রেসক্রিপশন ওষুধ সরবরাহ করি এবং বিশেষজ্ঞ ওপিডি ক্লিনিক পরিচালনা করি।",
      links: "গুরুত্বপূর্ণ লিঙ্ক",
      contact: "যোগাযোগ",
      termsPrivacy: "ব্যবহার বিধি ও গোপনীয়তা নীতি",
      copyright: "© ২০২৬ এম/এস স্টেট মেডিসিন শপ। সর্বস্বত্ব সংরক্ষিত।"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      order: "Order Online",
      doctors: "Doctor Schedule",
      faq: "FAQ",
      contact: "Contact",
      call: "Call"
    },
    hero: {
      badge: "Trusted Local Healthcare Partner in Kaliyaganj",
      title1: "Your Health,",
      title2: "Our Primary Mission",
      desc: "State Medicine Shop provides genuine prescription drugs, baby care essentials, and specialized doctor consultations for Kaliyaganj and surrounding communities.",
      pillAddress: "NS Road (Talkies Building)",
      pillTime: "Open Daily: 8 AM – 10 PM",
      pillDelivery: "Home Delivery Available",
      btnOrder: "Order Online",
      btnCall: "Call Pharmacy",
      btnWhatsapp: "WhatsApp Order",
      trustGenuine: "100% Genuine Medicines",
      trustPharmacist: "Trained Pharmacists",
      trustPayments: "UPI & Online Payments",
      trustDoctors: "In-Clinic Doctors"
    },
    about: {
      eyebrow: "Find Us",
      title1: "About",
      title2: "State Medicine Shop",
      lead: "Serving Kaliyaganj, Uttar Dinajpur, and surrounding areas with pharmacy excellence and reliable healthcare advice.",
      p1: "We are a dedicated local retail pharmacy that acts as a single-point destination for all your family's health requirements. From prescription drugs, chronic disease management (diabetes, blood pressure, cardiac care), to general wellness supplements and child care products, we stock all essential items from verified manufacturers.",
      p2: "We also feature an attached outpatient clinic hosting top visiting specialist doctors to ensure the local community does not have to travel long distances for expert medical opinions.",
      gallery: {
        storeFront: "Store Front",
        counter: "Dispensing Counter",
        inventory: "Medicine Inventory",
        waiting: "Waiting Area",
        chamber: "Doctor Chamber"
      },
      badges: {
        storeFront: "Actual Store Front",
        counter: "Shop Service Counter",
        inventory: "100% Genuine Stocks",
        waiting: "OPD Waiting Lounge",
        chamber: "Doctor Consultation Chamber"
      },
      stats: {
        years: "5+ Years",
        yearsSub: "Serving Kaliyaganj",
        authentic: "100%",
        authenticSub: "Authentic Stock",
        patients: "10k+",
        patientsSub: "Satisfied Patients"
      }
    },
    services: {
      eyebrow: "Our Services",
      title1: "Healthcare Offerings &",
      title2: "Services",
      desc: "We offer comprehensive pharmacy services combined with visiting specialist OPD consultations to support your family's health.",
      card1: {
        title: "Retail Pharmacy Store",
        i1: "Prescription Meds: Authentic chronic & acute medications.",
        i2: "OTC Products: Everyday pain, cold, and digestion remedies.",
        i3: "Baby Care Essentials: Formula, baby food, diapers, and health products.",
        i4: "Wellness & Vitamins: Multivitamins, protein powders, & tonics."
      },
      card2: {
        title: "Visiting Doctors OPD",
        i1: "Specialist Visits: Consultations with visiting MD physicians & surgeons.",
        i2: "Appointment Booking: Pre-book visiting slots via call or WhatsApp.",
        i3: "Health Screening: In-store blood pressure and blood sugar checks.",
        i4: "Medical Records: Systematic prescription logging for follow-ups."
      },
      card3: {
        title: "Value Added Services",
        i1: "Home Delivery: Direct home delivery within Kaliyaganj town.",
        i2: "24-Hour Procurement: Non-stock medicines sourced within 24 hours.",
        i3: "WhatsApp Ordering: Send prescriptions and order items via chat.",
        i4: "Genuine Drug Guarantee: 100% authentic batches from licensed suppliers."
      }
    },
    order: {
      eyebrow: "Prescription Upload",
      title1: "Order Genuine Medicines",
      title2: "Online",
      subtitle: "Upload your prescription or list the items you need. Our team will verify and prepare your order for home delivery or store pick-up.",
      dragText: "Drag & drop your prescription file here, or click to browse",
      fileNote: "Supports JPG, PNG, and PDF formats (Max 10MB)",
      fileName: "File Name",
      fileSize: "Size",
      removeBtn: "Remove file",
      fieldLabelName: "Patient Name",
      fieldNamePlaceholder: "Enter patient's full name",
      fieldLabelAddress: "Delivery Address (Kaliyaganj)",
      fieldAddressPlaceholder: "Enter full delivery address for home dispatch",
      btnSubmit: "Order via WhatsApp",
      stepTitle: "Simple 3-Step WhatsApp Order",
      stepDesc: "Ordering medications from State Medicine Shop has never been easier. Follow these steps to submit your order directly to our counter:",
      step1: "Select or drag in your prescription image.",
      step2: "Confirm your patient name and home address details.",
      step3: "Click 'Order via WhatsApp' to open WhatsApp and attach the prescription image.",
      infoVerify: "All orders are hand-verified by a licensed pharmacist before dispensing.",
      whatsappInfo: "Remember to attach the prescription image in WhatsApp after sending!",
      consentLabel: "I agree to the Terms of Service & Privacy Policy, and consent to share my prescription and details for ordering.",
      termsLink: "Terms of Service",
      privacyLink: "Privacy Policy",
      whatsappManualAlert: "IMPORTANT: Due to browser security restrictions, your prescription file cannot be automatically attached. After clicking the button below to open WhatsApp, please manually attach/send the file from your device to complete your order!",
      disclaimerText: "Disclaimer: This website only facilitates order inquiries. All prescription orders are subject to physical verification by our registered pharmacist before dispensing. We do not dispense illegal or restricted substances without prescription validation.",
      validation: {
        noFile: "Please upload a prescription file first!",
        invalidType: "Unsupported file format. Please upload images (JPG, PNG) or PDFs only.",
        tooLarge: "File is too large. Maximum size is 10MB."
      }
    },
    doctors: {
      eyebrow: "OPD Roster",
      title1: "Visiting Doctors",
      title2: "Schedule",
      subtitle: "Consult with expert clinicians from top regional hospitals without leaving Kaliyaganj. Select a specialty to view visiting schedules.",
      categories: {
        all: "All Specialties",
        medicine: "General Medicine",
        gynae: "Gynecology",
        dermatology: "Dermatology"
      },
      labelFee: "Consultation Fee",
      feeVal: "Contact Counter",
      btnBook: "Book Slot on WhatsApp",
      badgeActive: "Active Schedule"
    },
    faq: {
      eyebrow: "Got Questions?",
      title1: "Frequently",
      title2: "Asked Questions",
      subtitle: "Find quick answers regarding prescriptions, visiting doctor appointments, home delivery, and payment methods.",
      q1: "How do I order medicines online?",
      a1: "Upload your prescription (image or PDF) in the 'Order Online' section, or type your list along with your name and address. Click 'Order via WhatsApp'. This opens a pre-filled WhatsApp message on our pharmacy chat number, and our pharmacist will contact you shortly to confirm and process it.",
      q2: "Is home delivery available everywhere in Kaliyaganj, and is it free?",
      a2: "Yes, we offer home delivery services within Kaliyaganj town. Small delivery fees may apply depending on distance and order volume, but deliveries to locations near the railway gate or talkies building are mostly free of charge.",
      q3: "Can we order rare or non-stocked medicines?",
      a3: "Absolutely. If a medicine is not currently in stock, we will procure it directly from licensed pharmaceutical distributors within 24 hours. You can send us your requirements over WhatsApp to initiate the procurement.",
      q4: "How do I book a visiting doctor's appointment?",
      a4: "You can book by clicking 'Book Slot on WhatsApp' under the doctor's profile card in the schedule section, or by calling our direct helpline numbers (+91 81455 55232 / +91 75014 82099) directly.",
      q5: "What payment methods do you accept?",
      a5: "We accept Cash on Delivery (COD), mobile UPI (PhonePe, GPay, Paytm, BHIM), and direct in-store QR code payments."
    },
    contact: {
      eyebrow: "Find Us",
      title1: "Pharmacy Location",
      title2: "& Contact Details",
      subtitle: "Visit us in person or reach out directly for instant pharmacy support. We are located near the commercial center of Kaliyaganj.",
      addressTitle: "Store Address",
      addressVal: "NS Road (Kaliyaganj Talkies Building), Kaliyaganj, Uttar Dinajpur, West Bengal - 733129",
      phoneTitle: "Direct Phone Contact",
      phoneDesc: "Call the pharmacy desk directly for orders or appointment bookings:",
      hoursTitle: "Store Operating Hours",
      hoursSubtitle: "Open 7 Days a week",
      hoursCounter: "Pharmacy counter: 8:00 AM – 10:00 PM",
      hoursClinic: "Clinic visits: Dependent on doctor schedules",
      mapsBtn: "View on Google Maps"
    },
    footer: {
      desc: "Your trusted healthcare partner located in the center of Kaliyaganj. We provide genuine prescription medicines and run a specialist doctor OPD clinic.",
      links: "Quick Links",
      contact: "Contact Details",
      termsPrivacy: "Terms & Privacy Policy",
      copyright: "© 2026 M/S State Medicine Shop. All rights reserved."
    }
  }
}

export function LanguageProvider({ children }) {
  // Try to load language from localStorage, default to 'bn' (Bengali priority)
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved === 'en' || saved === 'bn' ? saved : 'bn'
  })

  const [isChangingLanguage, setIsChangingLanguage] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [pendingLanguage, setPendingLanguage] = useState(null)

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const changeLanguageWithLoader = (newLang) => {
    if (newLang === language || isChangingLanguage) return

    setPendingLanguage(newLang)
    setIsChangingLanguage(true)
    setIsFadingOut(false)

    // 1. Wait for overlay to fade in (250ms)
    setTimeout(() => {
      // 2. Perform the language change
      setLanguage(newLang)

      // 3. Keep loader visible briefly so user notices it (450ms)
      setTimeout(() => {
        setIsFadingOut(true)

        // 4. Wait for fade out animation to finish (300ms) before unmounting
        setTimeout(() => {
          setIsChangingLanguage(false)
          setIsFadingOut(false)
          setPendingLanguage(null)
        }, 300)
      }, 450)
    }, 250)
  }

  const t = (key) => {
    const keys = key.split('.')
    let currentTrans = translations[language] || translations['bn']
    for (const k of keys) {
      if (currentTrans && currentTrans[k] !== undefined) {
        currentTrans = currentTrans[k]
      } else {
        // Fallback to English if Bengali key is missing
        let fallbackTrans = translations['en']
        for (const fk of keys) {
          if (fallbackTrans && fallbackTrans[fk] !== undefined) {
            fallbackTrans = fallbackTrans[fk]
          } else {
            return key
          }
        }
        return fallbackTrans
      }
    }
    return currentTrans
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguageWithLoader, t }}>
      {children}
      {isChangingLanguage && (
        <div className={`language-loader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="language-loader-container">
            <div className="language-spinner-ring">
              <i className="fa-solid fa-heart-pulse"></i>
            </div>
            <div className="language-loader-text">
              {pendingLanguage === 'bn' ? 'বাংলা করা হচ্ছে...' : 'Switching to English...'}
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
