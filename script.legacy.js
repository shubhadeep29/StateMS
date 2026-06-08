// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {



    // ==========================================
    // 2. PRESCRIPTION UPLOAD & ORDER SYSTEM
    // ==========================================
    const dropzone = document.getElementById('prescriptionDropzone');
    const fileInput = document.getElementById('prescriptionFileInput');
    const browseBtn = document.getElementById('browseBtn');
    const filePreviewContainer = document.getElementById('filePreviewContainer');
    const fileNameElement = document.getElementById('fileName');
    const fileSizeElement = document.getElementById('fileSize');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const whatsappCheckoutContainer = document.getElementById('whatsappCheckoutContainer');
    const patientNameInput = document.getElementById('patientName');
    const deliveryAddressTextarea = document.getElementById('deliveryAddress');
    const sendWhatsAppOrderBtn = document.getElementById('sendWhatsAppOrderBtn');
    const fileIcon = document.getElementById('fileIcon');

    let uploadedFile = null;

    // Trigger file browser on click
    if (dropzone && fileInput) {
        dropzone.addEventListener('click', (e) => {
            if (e.target !== browseBtn && e.target.closest('#browseBtn') === null && e.target.closest('.remove-file-btn') === null) {
                fileInput.click();
            }
        });
        
        if (browseBtn) {
            browseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput.click();
            });
        }
    }

    // File change handler
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }

    // Drag-and-drop event listeners
    if (dropzone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove('dragover');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        }, false);
    }

    // Format file sizes
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Handle selected file details
    function handleFileSelect(file) {
        uploadedFile = file;
        fileNameElement.textContent = file.name;
        fileSizeElement.textContent = formatBytes(file.size);
        
        // Show correct icon based on type
        if (file.type.includes('pdf')) {
            fileIcon.className = 'fa-regular fa-file-pdf';
            fileIcon.style.color = '#ef4444';
        } else {
            fileIcon.className = 'fa-regular fa-image';
            fileIcon.style.color = 'var(--primary)';
        }

        // Toggle UI panels
        dropzone.style.display = 'none';
        filePreviewContainer.style.display = 'block';
        whatsappCheckoutContainer.style.display = 'block';
        
        // Pre-focus patient name input
        patientNameInput.focus();
        
        updateWhatsAppLink();
    }

    // Reset file selection
    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', () => {
            uploadedFile = null;
            fileInput.value = '';
            dropzone.style.display = 'block';
            filePreviewContainer.style.display = 'none';
            whatsappCheckoutContainer.style.display = 'none';
            patientNameInput.value = '';
            deliveryAddressTextarea.value = '';
        });
    }

    // Update WhatsApp link based on input text fields
    function updateWhatsAppLink() {
        const patientName = patientNameInput.value.trim() || 'Not specified';
        const address = deliveryAddressTextarea.value.trim() || 'Pickup from Store';
        const fileName = uploadedFile ? uploadedFile.name : 'Prescription';
        
        const message = `Hello M/S State Medicine Shop, I would like to order medicines by uploading a prescription.\n\n*Order Details*:\n- *Patient Name:* ${patientName}\n- *Delivery Address:* ${address}\n- *Prescription File Attached:* ${fileName}\n\n(I am attaching the prescription file to this chat next for your review and billing verification.)`;
        
        sendWhatsAppOrderBtn.href = `https://wa.me/9107501482099?text=${encodeURIComponent(message)}`;
    }

    if (patientNameInput) {
        patientNameInput.addEventListener('input', updateWhatsAppLink);
    }
    if (deliveryAddressTextarea) {
        deliveryAddressTextarea.addEventListener('input', updateWhatsAppLink);
    }

    // ==========================================
    // 3. DOCTOR CONSULTATION SCHEDULER
    // ==========================================
    const doctorsDatabase = [
        {
            name: "Dr. Deepak Kumar",
            qualification: "MBBS, MS (General Surgery)",
            specialty: "General Surgery",
            schedule: "Monday & Tuesday, 4:00 PM onwards",
            fee: "₹300",
            category: "surgery"
        },
        {
            name: "Dr. Debdutta Baral",
            qualification: "MBBS, DGO, MD (Kolkata)",
            specialty: "Gynecology & Obstetrics",
            schedule: "Wednesday & Saturday, 5:30 PM",
            fee: "₹400",
            category: "gynae"
        },
        {
            name: "Dr. Kingshuk Das",
            qualification: "MBBS, MD (General Medicine)",
            specialty: "General Medicine",
            schedule: "Mon, Thu & Fri, 11:00 AM",
            fee: "₹300",
            category: "medicine"
        },
        {
            name: "Dr. S. P. Bhadra",
            qualification: "MBBS, DCH (Child Specialist)",
            specialty: "Pediatrics & Child Care",
            schedule: "Thursday & Sunday, 12:00 PM",
            fee: "₹350",
            category: "pediatrics"
        },
        {
            name: "Dr. A. Sengupta",
            qualification: "MBBS, MS (Orthopedics)",
            specialty: "Orthopedics / Bone & Joint",
            schedule: "Tuesday & Saturday, 2:00 PM",
            fee: "₹400",
            category: "surgery"
        }
    ];

    const doctorGrid = document.getElementById('doctorGrid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Render doctor cards
    function renderDoctors(category) {
        if (!doctorGrid) return;
        doctorGrid.innerHTML = '';
        
        const filtered = category === 'all' 
            ? doctorsDatabase 
            : doctorsDatabase.filter(doc => doc.category === category);
            
        filtered.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'doctor-card glass-card';
            
            // Format WhatsApp appointment inquiry message
            const bookingMsg = encodeURIComponent(`Hello M/S State Medicine Shop, I would like to book a clinic consultation slot for Dr. ${doc.name} (${doc.specialty}). Please inform me about the next available timing.`);
            const whatsappLink = `https://wa.me/9107501482099?text=${bookingMsg}`;

            card.innerHTML = `
                <div>
                    <div class="doc-info-header">
                        <div class="doc-avatar-large">
                            <i class="fa-solid fa-user-doctor"></i>
                        </div>
                        <div class="doc-meta">
                            <h3>${doc.name}</h3>
                            <span class="doc-qual">${doc.qualification}</span>
                        </div>
                    </div>
                    <div class="doc-details-list">
                        <div class="doc-detail-item">
                            <i class="fa-solid fa-stethoscope"></i>
                            <span>Specialty: <strong>${doc.specialty}</strong></span>
                        </div>
                        <div class="doc-detail-item">
                            <i class="fa-regular fa-calendar-check"></i>
                            <span>Timings: <strong>${doc.schedule}</strong></span>
                        </div>
                        <div class="doc-detail-item">
                            <i class="fa-solid fa-receipt"></i>
                            <span>Consultation Fee: <strong>${doc.fee}</strong></span>
                        </div>
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.75rem; margin-top:0.5rem;">
                    <span class="clinic-visit-badge"><i class="fa-regular fa-circle-check"></i> Active Schedule</span>
                    <a href="${whatsappLink}" target="_blank" class="btn btn-primary btn-sm" style="width:100%;">
                        <i class="fa-brands fa-whatsapp"></i> Book Appointment
                    </a>
                </div>
            `;
            doctorGrid.appendChild(card);
        });
    }

    // Initialize doctor schedule
    renderDoctors('all');

    // Tab buttons selector click listeners
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from other buttons
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            
            // Add active to current
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            
            const category = btn.getAttribute('data-category');
            renderDoctors(category);
        });
    });

    // ==========================================
    // 4. FAQ ACCORDION LOGIC
    // ==========================================
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = header.classList.contains('active');
            
            // Close all other FAQs first
            faqHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle active class on current FAQ
            if (!isOpen) {
                header.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                header.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                body.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 5. INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ==========================================
    // Intersection Observer fallback for scroll-driven animations
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once animated in
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    } else {
        // Native CSS view-timeline is supported, add fallback helper styles so elements are visible
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => {
            el.classList.remove('reveal-on-scroll'); // Remove fallback observer classes to let CSS view() handle it
            el.style.animation = "reveal-up auto cubic-bezier(0.16, 1, 0.3, 1) both";
            el.style.animationTimeline = "view()";
            el.style.animationRange = "entry 10% entry 60%";
        });
    }

    // Native CSS Scroll-driven header fallback for Safari <= 18 / Firefox
    if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
        const header = document.querySelector('.header');
        const headerContent = document.querySelector('.header-content');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                headerContent.style.height = '64px';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                header.style.borderBottom = '1px solid var(--border-color)';
                header.style.boxShadow = 'var(--shadow-sm)';
            } else {
                headerContent.style.height = '84px';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                header.style.borderBottom = '1px solid var(--border-color)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // ==========================================
    // 6. MOBILE NAVIGATION MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNavigation');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            
            // Toggle hamburger icon to X close mark
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                document.body.style.overflow = 'hidden'; // Lock scrolling when menu is open
            } else {
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth Scrolling for anchor links with offset adjustment for shrinking header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu if active
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                document.body.style.overflow = '';
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 64; // Height of shrunk header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
