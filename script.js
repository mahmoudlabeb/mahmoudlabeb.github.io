document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Update Year in Footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-xl', 'shadow-slate-200/40', 'h-16');
            navbar.classList.remove('h-20');
        } else {
            navbar.classList.remove('shadow-xl', 'shadow-slate-200/40', 'h-16');
            navbar.classList.add('h-20');
        }
    });

    // 3. Professional Scroll Reveal Animations
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Chat Widget Logic
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    chatToggle.addEventListener('click', () => {
        chatBox.classList.toggle('hidden');
        chatBox.classList.toggle('flex');
        if (!chatBox.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    const addMessage = (text, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`;
        
        const icon = isUser ? 'fa-user' : 'fa-robot';
        const bgColor = isUser ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600';
        const roundedClass = isUser ? 'rounded-tr-none' : 'rounded-tl-none';

        messageDiv.innerHTML = `
            <div class="w-8 h-8 ${isUser ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'} rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fa-solid ${icon} text-xs"></i>
            </div>
            <div class="${bgColor} p-4 rounded-2xl ${roundedClass} text-sm shadow-sm max-w-[80%]">
                ${text}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChat = () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, true);
            chatInput.value = '';
            
            // Simulated AI Response
            setTimeout(() => {
                let response = "That's interesting! I'll make sure Mahmoud sees your message. Would you like to know more about his projects or skills?";
                if (text.toLowerCase().includes('project')) {
                    response = "Mahmoud has worked on several impressive projects, including a Laravel Web App, a Data Mining Dashboard, and a Bus Booking System. Which one would you like to hear more about?";
                } else if (text.toLowerCase().includes('skill') || text.toLowerCase().includes('tech')) {
                    response = "Mahmoud is proficient in Node.js, PHP/Laravel, Python, and Java. He also has strong expertise in MongoDB and Data Mining.";
                } else if (text.toLowerCase().includes('contact') || text.toLowerCase().includes('hire')) {
                    response = "You can reach Mahmoud directly at mahmoudlabeeb41@gmail.com or call him at +20 1098936550. He's currently open to new opportunities!";
                }
                addMessage(response);
            }, 1000);
        }
    };

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    // 5. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.hidden.md\\:flex');
    
    mobileMenuBtn.addEventListener('click', () => {
        // Simple toggle for demo purposes
        alert('Mobile menu clicked! In a real deployment, this would open a sleek side drawer.');
    });

    // 6. Smooth Scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
